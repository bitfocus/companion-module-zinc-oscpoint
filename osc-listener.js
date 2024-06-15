const osc = require('osc')
const { InstanceStatus } = require('@companion-module/base')

const oscListener = {
	close: async function () {
		await this.udpPort.close()
	},
	mediaDuration: 0,
	mediaPosition: 0,
	mediaRemaining: 0,
	connect: async function (self) {
		this.udpPort = new osc.UDPPort({
			localAddress: '0.0.0.0',
			localPort: self.config.localport,
			metadata: true,
		})

		this.udpPort.open()

		this.udpPort.on('ready', () => {
			self.log('info', `Listening for OSCPoint messsages on port ${self.config.localport}`)
			self.updateStatus(InstanceStatus.Ok, 'Connected.')

			//send a refresh request to OSCPoint
			self.log('info', `Requesting feedback update using OSC /oscpoint/feedbacks/refresh`)
			self.oscSend(self.config.remotehost, self.config.remoteport, `/oscpoint/feedbacks/refresh`, [])
		})

		this.udpPort.on('message', (oscMsg) => {
			this.processData(oscMsg, self)
		})

		this.udpPort.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				self.log('error', 'Error: Selected port in use.' + err.message)
				self.updateStatus(InstanceStatus.ConnectionFailure, `Port ${self.config.localport} in use elsewhere.`)
			} else {
				self.log('error', 'UDP port error: ' + err.message)
				self.updateStatus(InstanceStatus.UnknownError, err.message)
			}
		})
	},

	processData: function (oscMsg, self) {
		self.log('debug', `OSC message received: ${oscMsg.address} ${oscMsg.args[0].value}`)
		const msgParts = oscMsg.address.split('/')
		if (msgParts[1] != 'oscpoint') return
		const feedbackId = oscMsg.address.substring(9)

		switch (feedbackId) {
			case `/v2/presentations`: {
				self.setVariableValues({ presentations: oscMsg.args[0].value })
				try {
					self.presentations = JSON.parse(oscMsg.args[0].value)
				} catch (e) {
					self.presentationsCount = 0
					self.presentationsIndex = 0
					self.presentations = []
					return self.log('error', `Error parsing presentations JSON: ${e}`)
				}

				self.presentationsCount = self.presentations.length
				if (self.presentationsCount == 0) {
					return self.setVariableValues({
						presentationsSelectedFilename: '',
						presentationsFileNames: JSON.stringify([]),
						presentationsSelectedIndex: 1,
					})
				}

				let names = []
				for (let i = 0; i < self.presentationsCount; i++) {
					names.push(self.presentations[i].name)
				}

				//pin index to within the bounds of the array
				self.presentationsIndex = Math.min(self.presentationsIndex, self.presentationsCount - 1)
				self.presentationsIndex = Math.max(self.presentationsIndex, 0)

				self.log('debug', `Getting presentation index ${self.presentationsIndex}`)
				self.setVariableValues({
					presentationsSelectedFilename: self.presentations[self.presentationsIndex].name,
					presentationsFileNames: JSON.stringify(names),
					presentationsCount: self.presentationsCount,
				})
				break
			}
			case `/v2/presentation`: {
				try {
					self.presentation = JSON.parse(oscMsg.args[0].value)
				} catch (e) {
					self.presentation = { sections: [] }
					return self.log('error', `Error parsing presentation JSON: ${e}`)
				}

				//make sure there's always a sections array
				if (!self.presentation.sections) {
					self.presentation.sections = []
				}
				this.setSectionVariables(self)
				self.setVariableValues({ presentation: oscMsg.args[0].value })
				break
			}
			case `/v2/files`: {
				self.setVariableValues({ files: oscMsg.args[0].value })
				try {
					self.files = JSON.parse(oscMsg.args[0].value)
				} catch (e) {
					self.fileCount = 0
					self.fileIndex = 0
					return self.log('error', `Error parsing files JSON: ${e}`)
				}
				self.fileCount = self.files.length

				if (self.fileCount == 0) {
					return self.setVariableValues({
						activeFolderFileName: '(no files in folder)',
						activeFolderSelectedIndex: 0,
						activeFolderFileCount: 0,
						activeFolderFileNames: JSON.stringify([]),
					})
				}

				let names = []
				for (let i = 0; i < self.fileCount; i++) {
					names.push(self.files[i].name)
				}

				//pin index to within the bounds of the array
				self.fileIndex = Math.min(self.fileIndex, self.fileCount - 1)
				self.fileIndex = Math.max(self.fileIndex, 0)

				self.log('debug', `Getting file index ${self.fileIndex}`)
				self.setVariableValues({
					activeFolderFileName: self.files[self.fileIndex].name,
					activeFolderSelectedIndex: self.fileIndex + 1,
					activeFolderFileCount: self.fileCount,
					activeFolderFileNames: JSON.stringify(names),
				})
				break
			}
			case `/v2/files/enabled`: {
				self.setVariableValues({ fileAccessEnabled: oscMsg.args[0].value })
				self.checkFeedbacks('fileAccess')
				break
			}
			case `/v2/files/activefolder`: {
				self.setVariableValues({ activeFolder: oscMsg.args[0].value })
				break
			}
			case `/v2/files/activefolder/fullpath`: {
				self.setVariableValues({ activeFolderFullPath: oscMsg.args[0].value })
				break
			}
			case `/presentation/name`: {
				let fileName = oscMsg.args[0].value == '' ? '(none)' : oscMsg.args[0].value
				self.setVariableValues({ presentationName: fileName })
				break
			}
			case `/presentation/slides/count`:
				self.setVariableValues({ slideCount: oscMsg.args[0].value })
				break
			case `/slideshow/state`:
				self.setVariableValues({ state: oscMsg.args[0].value })
				self.checkFeedbacks('showState')
				break
			case `/slideshow/currentslide`:
				self.setVariableValues({ currentSlide: oscMsg.args[0].value })
				break
			case `/slideshow/builds/position`:
				self.setVariableValues({ buildPosition: oscMsg.args[0].value })
				self.checkFeedbacks('slideProgressBars')
				break
			case `/slideshow/builds/count`:
				self.setVariableValues({ buildCount: oscMsg.args[0].value })
				break
			case `/slideshow/builds/remaining`:
				self.setVariableValues({ buildsRemaining: oscMsg.args[0].value })
				break
			case `/slideshow/section/index`:
				{
					let i = parseInt(oscMsg.args[0].value)
					//if nan, set to 0
					if (isNaN(i)) i = 0
					self.sectionIndex = i
					this.setSectionVariables(self)
				}
				break
			case `/slideshow/section/name`: {
				let sectionName = oscMsg.args[0].value == '' ? '(none)' : oscMsg.args[0].value
				self.setVariableValues({ sectionName: sectionName })
				break
			}
			case `/slideshow/notes`: {
				let ns = oscMsg.args[0].value == '' ? '(none)' : `${oscMsg.args[0].value.substr(0, 20)}...`
				let notes = oscMsg.args[0].value == '' ? '(none)' : oscMsg.args[0].value
				self.setVariableValues({
					notes: notes,
					notesSnip: ns,
				})
				break
			}
			case `/slideshow/media/state`:
				self.setVariableValues({ mediaState: oscMsg.args[0].value })
				self.checkFeedbacks('mediaState')
				break

			//these three always come together, and mainly in this order, so we can risk batching the variable updates.
			case `/slideshow/media/duration`:
				this.mediaDuration = oscMsg.args[0].value
				break
			case `/slideshow/media/position`:
				this.mediaPosition = oscMsg.args[0].value
				self.checkFeedbacks('mediaProgressBar')
				break
			case `/slideshow/media/remaining`:
				this.mediaRemaining = oscMsg.args[0].value
				self.setVariableValues({
					mediaDuration: Math.floor(this.mediaDuration / 1000),
					mediaDurationFormatted: this.convertToMmSs(this.mediaDuration),
					mediaPosition: Math.floor(this.mediaPosition / 1000),
					mediaPositionFormatted: this.convertToMmSs(this.mediaPosition),
					mediaRemaining: Math.floor(this.mediaRemaining / 1000),
					mediaRemainingFormatted: this.convertToMmSs(this.mediaRemaining),
				})
				break
			case `/slide/current/preview`:
				self.setVariableValues({ slidePreview: oscMsg.args[0].value })
				self.checkFeedbacks('slidePreview')
				break
			default:
				self.log('debug', `No action found for OSC ${oscMsg.address}`)
				break
		}
	},
	convertToMmSs(msValue) {
		let seconds = Math.floor(msValue / 1000)
		let mm = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0')
		let ss = Math.floor(seconds % 60)
			.toString()
			.padStart(2, '0')
		return `${mm}:${ss}`
	},
	setSectionVariables(self) {
		self.log('debug', `Setting section variables for section ${self.sectionIndex}`)
		//self.log('debug', JSON.stringify(self.presentation))

		//self.sectionIndex is 1-based
		if (self.sectionIndex < 1) {
			self.log('debug', `Section index is 0, setting defaults`)
			return this.setDefaultSectionVariables(self)
		}

		if (!self.presentation || self.presentation == '{}') {
			self.log('debug', `No presentation data, setting defaults`)
			return this.setDefaultSectionVariables(self)
		}

		if (self.presentation.sections.length < self.sectionIndex) {
			self.log('debug', `Section index out of range, setting defaults`)
			return this.setDefaultSectionVariables(self)
		}

		let section = self.presentation.sections[self.sectionIndex - 1]
		self.log(
			'debug',
			`Section ${self.sectionIndex} (${section.name}):  ${section.slideCount} slides, starting at slide ${section.firstSlide}`
		)
		self.setVariableValues({
			sectionName: section.name,
			sectionSlideCount: section.slideCount,
			sectionFirstSlide: section.firstSlide,
		})
	},
	setDefaultSectionVariables(self) {
		return self.setVariableValues({
			sectionName: '(none)',
			sectionSlideCount: 0,
			sectionFirstSlide: 0,
		})
	},
}

module.exports = oscListener
