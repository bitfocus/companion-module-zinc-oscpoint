// const { Regex } = require('@companion-module/base')

module.exports = function (self) {
	self.setActionDefinitions({
		next: {
			name: 'Next',
			options: [],
			callback: async (_event) => {
				sendOscMessage('/oscpoint/next', [])
			},
		},
		previous: {
			name: 'Previous',
			options: [],
			callback: async (_event) => {
				sendOscMessage('/oscpoint/previous', [])
			},
		},
		goto_slide_number: {
			name: 'Goto slide number',
			options: [
				{
					type: 'textinput',
					label: 'Slide number',
					id: 'slideNumber',
					default: '1',
					//regex: Regex.SIGNED_NUMBER,
					useVariables: true,
				},
			],
			callback: async (event) => {
				let slideNumber = await self.parseVariablesInString(event.options.slideNumber)
				slideNumber = sanitiseSlideNumber(slideNumber, event)
				if (slideNumber) {
					sendOscMessage('/oscpoint/goto/slide', [{ type: 'i', value: slideNumber }])
				}
			},
		},
		goto_first_slide: {
			name: 'Goto first slide in deck',
			options: [],
			callback: async (_event) => {
				sendOscMessage('/oscpoint/goto/slide/first', [])
			},
		},
		goto_last_slide: {
			name: 'Goto last slide in deck',
			options: [],
			callback: async (_event) => {
				sendOscMessage('/oscpoint/goto/slide/last', [])
			},
		},
		goto_section: {
			name: 'Goto first slide in section',
			options: [
				{
					type: 'textinput',
					label: 'Section name (case sensitive)',
					id: 'sectionName',
					default: 'Default Section',
					useVariables: true,
				},
			],
			callback: async (event) => {
				let sectionName = await self.parseVariablesInString(event.options.sectionName)
				sendOscMessage('/oscpoint/goto/section', [{ type: 's', value: sectionName }])
			},
		},
		hide_slide: {
			name: 'Hide slide',
			options: [
				{
					type: 'textinput',
					label: 'Slide number',
					id: 'slideNumber',
					default: '1',
					//: Regex.SIGNED_NUMBER,
					useVariables: true,
				},
			],
			callback: async (event) => {
				let slideNumber = await self.parseVariablesInString(event.options.slideNumber)
				slideNumber = sanitiseSlideNumber(slideNumber, event)
				if (slideNumber) {
					sendOscMessage('/oscpoint/slide/hide', [{ type: 'i', value: slideNumber }])
				}
			},
		},
		unhide_slide: {
			name: 'Unhide slide',
			options: [
				{
					type: 'textinput',
					label: 'Slide number',
					id: 'slideNumber',
					default: '1',
					//regex: Regex.SIGNED_NUMBER,
					useVariables: true,
				},
			],
			callback: async (event) => {
				let slideNumber = await self.parseVariablesInString(event.options.slideNumber)
				slideNumber = sanitiseSlideNumber(slideNumber, event)
				if (slideNumber) {
					sendOscMessage('/oscpoint/slide/unhide', [{ type: 'i', value: slideNumber }])
				}
			},
		},
		start_slideshow: {
			name: 'Start slide show',
			options: [
				{
					id: 'startPosition',
					type: 'dropdown',
					label: 'Start from',
					choices: [
						{ id: 'top', label: 'Top' },
						{ id: 'currentSlide', label: 'Current slide' },
						{ id: 'slideNumber', label: 'Slide number (add-in v2+ required)' },
						{ id: 'section', label: 'Named section' },
					],
					default: 'top',
				},
				{
					id: 'sectionName',
					type: 'textinput',
					label: 'Section name (case sensitive)',
					default: 'Default Section',
					isVisible: (options) => {
						return options.startPosition == 'section'
					},
					useVariables: true,
				},
				{
					id: 'slideNumber',
					type: 'textinput',
					label: 'Slide number',
					default: '1',
					isVisible: (options) => {
						return options.startPosition == 'slideNumber'
					},
					useVariables: true,
				},
			],
			callback: async (event) => {
				let slideNumber
				switch (event.options.startPosition) {
					case 'top':
						sendOscMessage('/oscpoint/slideshow/start', [])
						break
					case 'currentSlide':
						sendOscMessage('/oscpoint/slideshow/start/current', [])
						break
					case 'slideNumber':
						slideNumber = sanitiseSlideNumber(await self.parseVariablesInString(event.options.slideNumber), event)
						if (slideNumber) {
							sendOscMessage('/oscpoint/slideshow/start', [{ type: 'i', value: slideNumber }])
						}
						break
					case 'section': {
						const sectionName = await self.parseVariablesInString(event.options.sectionName)
						sendOscMessage('/oscpoint/slideshow/start/section', [{ type: 's', value: sectionName }])
						break
					}
				}
			},
		},
		end_slideshow: {
			name: 'End slide show',
			options: [],
			callback: async (_event) => {
				sendOscMessage('/oscpoint/slideshow/end', [])
			},
		},
		black_screen: {
			name: 'Black screen',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'toggle', label: 'Toggle black' },
						{ id: 'on', label: 'Black on' },
						{ id: 'off', label: 'Black off' },
					],
					default: 'toggle',
				},
			],
			callback: async (event) => {
				switch (event.options.action) {
					case 'on':
						sendOscMessage('/oscpoint/slideshow/black', [{ type: 'i', value: 1 }])
						break
					case 'off':
						sendOscMessage('/oscpoint/slideshow/black', [{ type: 'i', value: 0 }])
						break
					case 'toggle':
						sendOscMessage('/oscpoint/slideshow/black', [])
						break
				}
			},
		},
		white_screen: {
			name: 'White screen',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'toggle', label: 'Toggle white' },
						{ id: 'on', label: 'White on' },
						{ id: 'off', label: 'White off' },
					],
					default: 'toggle',
				},
			],
			callback: async (event) => {
				switch (event.options.action) {
					case 'on':
						sendOscMessage('/oscpoint/slideshow/white', [{ type: 'i', value: 1 }])
						break
					case 'off':
						sendOscMessage('/oscpoint/slideshow/white', [{ type: 'i', value: 0 }])
						break
					case 'toggle':
						sendOscMessage('/oscpoint/slideshow/white', [])
						break
				}
			},
		},
		laser: {
			name: 'Laser pointer',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'toggle', label: 'Toggle laser pointer' },
						{ id: 'on', label: 'Laser pointer on' },
						{ id: 'off', label: 'Laser pointer off' },
					],
					default: 'toggle',
				},
			],
			callback: async (event) => {
				switch (event.options.action) {
					case 'on':
						sendOscMessage('/oscpoint/slideshow/laserpointer', [{ type: 'i', value: 1 }])
						break
					case 'off':
						sendOscMessage('/oscpoint/slideshow/laserpointer', [{ type: 'i', value: 0 }])
						break
					case 'toggle':
						sendOscMessage('/oscpoint/slideshow/laserpointer', [])
						break
				}
			},
		},
		setWallpaper: {
			name: 'Set desktop wallpaper from current slide',
			options: [
				{
					type: 'textinput',
					label: 'Image export width (px)',
					id: 'width',
					default: '1920',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Image export height (px)',
					id: 'height',
					default: '1080',
					useVariables: true,
				},
			],
			callback: async (event) => {
				let width = await self.parseVariablesInString(event.options.width)
				let height = await self.parseVariablesInString(event.options.height)
				//check width is an integer
				width = parseInt(width)
				if (isNaN(width)) {
					width = 1920
				}
				width = Math.max(100, width)
				width = Math.min(10000, width)

				//check height is an integer
				height = parseInt(height)
				if (isNaN(height)) {
					height = 1080
				}
				height = Math.max(100, height)
				height = Math.min(10000, height)

				sendOscMessage('/oscpoint/slideshow/setwallpaper', [
					{ type: 'i', value: width },
					{ type: 'i', value: height },
				])
			},
		},
		mediaTransport: {
			name: 'Media play/pause/stop',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'playpause', label: 'Play/pause toggle' },
						{ id: 'play', label: 'Play' },
						{ id: 'pause', label: 'Pause' },
						{ id: 'stop', label: 'Stop' },
					],
					default: 'playpause',
				},
			],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/media/${event.options.action}`, [])
			},
		},
		mediaBookmarks: {
			name: 'Media bookmarks',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'next', label: 'Next bookmark' },
						{ id: 'previous', label: 'Previous bookmark' },
					],
					default: 'next',
				},
			],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/media/goto/bookmark/${event.options.action}`, [])
			},
		},
		mediaGotoTime: {
			name: 'Move media playhead',
			options: [
				{
					id: 'type',
					type: 'dropdown',
					label: 'Reference',
					choices: [
						{ id: 'start', label: 'From start of clip' },
						{ id: 'end', label: 'Before end of clip' },
						{ id: 'forward', label: 'Forward from current position' },
						{ id: 'back', label: 'Rewind from current position' },
						{ id: 'percent', label: '%age of way through clip' },
					],
					default: 'start',
				},
				{
					type: 'textinput',
					label: 'Milliseconds',
					id: 'posMs',
					default: '1',
					//regex: Regex.NUMBER,
					useVariables: true,
					isVisible: (options) => {
						return options.type != 'percent'
					},
				},
				{
					type: 'textinput',
					label: 'Percent',
					id: 'posPercent',
					default: '50',
					//regex: Regex.FLOAT,
					useVariables: true,
					isVisible: (options) => {
						return options.type == 'percent'
					},
				},
			],
			callback: async (event) => {
				let posMs = ''
				let intPosMs = 0

				if (event.options.type != 'percent') {
					posMs = await self.parseVariablesInString(event.options.posMs)
					console.log('posMs', posMs)
					intPosMs = parseInt(posMs)
					if (isNaN(intPosMs)) {
						self.log('error', `${event.controlId}: ${event.actionId} - invalid millisecond position "${posMs}"`)
						return
					}
					if (intPosMs < 0) {
						self.log(
							'warn',
							`${event.controlId}: ${event.actionId} - millisecond position must be >= 0, but received ${intPosMs}. Reset to 0.`
						)
						intPosMs = 0
					}
					intPosMs += 0 // to handle -0 situation.
				}
				switch (event.options.type) {
					case 'start':
						sendOscMessage(`/oscpoint/media/goto/position/fromstart`, [{ type: 'i', value: intPosMs }])
						break
					case 'end':
						sendOscMessage(`/oscpoint/media/goto/position/beforeend`, [{ type: 'i', value: intPosMs }])
						break
					case 'forward':
						sendOscMessage(`/oscpoint/media/goto/position/forward`, [{ type: 'i', value: intPosMs }])
						break
					case 'back':
						sendOscMessage(`/oscpoint/media/goto/position/back`, [{ type: 'i', value: intPosMs }])
						break
					case 'percent': {
						const posPercent = await self.parseVariablesInString(event.options.posPercent)
						let floatPosPercent = parseFloat(posPercent)
						if (isNaN(floatPosPercent)) {
							self.log('error', `${event.controlId}: ${event.actionId} - invalid percentage "${posPercent}"`)
							return
						}
						if (floatPosPercent < 0 || floatPosPercent > 100) {
							self.log(
								'warn',
								`${event.controlId}: ${event.actionId} | Percent position must be >=0 and <= 100, but received ${floatPosPercent}. Reset to 0.`
							)
							floatPosPercent = 0
						}
						floatPosPercent += 0 // to handle -0 situation.
						sendOscMessage(`/oscpoint/media/goto/position/percent`, [{ type: 'f', value: floatPosPercent }])
						break
					}
					default:
						self.log('error', `${event.controlId}: ${event.actionId} - invalid reference "${event.options.type}"`)
						break
				}
			},
		},
		refreshData: {
			name: 'Refresh data',
			options: [],
			callback: async (_event) => {
				sendOscMessage(`/oscpoint/feedbacks/refresh`, [])
			},
		},
		enableActions: {
			name: 'Global enable/disable actions',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'enable', label: 'Enable actions' },
						{ id: 'disable', label: 'Disable actions' },
					],
					default: 'enable',
				},
				{
					type: 'static-text',
					label: 'WARNING! OSCPoint will only respond to the Enable Actions command - all others will  be ignored.',
					value: '',
					isVisible: (options) => {
						return options.action == 'disable'
					},
				},
			],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/actions/${event.options.action}`, [])
			},
		},
		enableFeedbacks: {
			name: 'Global enable/disable feedbacks',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'enable', label: 'Enable feedbacks' },
						{ id: 'disable', label: 'Disable feedbacks' },
					],
					default: 'enable',
				},
			],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/feedbacks/${event.options.action}`, [])
			},
		},
		openFile: {
			name: 'Open/activate file',
			description: 'Open a .ppt or .pptx file from the active folder on the remote machine.',
			options: [
				{
					type: 'textinput',
					label: 'File name',
					id: 'fileName',
					default: 'my_presentation.pptx',
					useVariables: true,
				},
			],
			callback: async (event) => {
				const fileName = await self.parseVariablesInString(event.options.fileName)
				sendOscMessage(`/oscpoint/files/open`, [{ type: 's', value: fileName }])
			},
		},
		activatePresentation: {
			name: 'Switch active presentation',
			description: 'Switch between open presentations.',
			options: [
				{
					type: 'textinput',
					label: 'File name',
					id: 'fileName',
					default: 'my_presentation.pptx',
					useVariables: true,
				},
			],
			callback: async (event) => {
				const fileName = await self.parseVariablesInString(event.options.fileName)
				sendOscMessage(`/oscpoint/presentations/activate`, [{ type: 's', value: fileName }])
			},
		},
		closeFile: {
			name: 'Close presentation',
			description: 'Close an open presentation file. Specify file name, or leave blank to close active presentation.',
			options: [
				{
					type: 'textinput',
					label: 'File name',
					id: 'fileName',
					default: 'my_presentation.pptx',
					useVariables: true,
				},
				{
					id: 'unsavedAction',
					type: 'dropdown',
					label: 'If file contains unsaved changes:',
					choices: [
						{ id: 'abort', label: 'Abort close action' },
						{ id: 'save', label: 'Save changes, overwriting original file' },
						{ id: 'force', label: 'Discard changes & force close' },
					],
					default: 'abort',
				},
			],
			callback: async (event) => {
				let args = []
				let fileName = await self.parseVariablesInString(event.options.fileName)
				if (fileName.length > 0) {
					fileName = fileName.trim()
					args.push({ type: 's', value: fileName })
				}

				switch (event.options.unsavedAction) {
					case 'abort':
						sendOscMessage(`/oscpoint/files/close`, args)
						break
					case 'save':
						sendOscMessage(`/oscpoint/files/close/save`, args)
						break
					case 'force':
						sendOscMessage(`/oscpoint/files/close/force`, args)
						break
				}
			},
		},
		setActiveFolder: {
			name: 'Set active folder',
			description: "Relative to the user's home directory - example: Desktop\\myfolder\\oscpoint",
			options: [
				{
					type: 'textinput',
					label: 'Folder path',
					id: 'folder',
					default: 'Desktop\\myfolder\\oscpoint',
					useVariables: true,
				},
			],
			callback: async (event) => {
				const path = await self.parseVariablesInString(event.options.folder)
				sendOscMessage(`/oscpoint/files/setpath`, [{ type: 's', value: path }])
			},
		},
		refreshFileList: {
			name: 'Refresh file list',
			description: 'Refresh the list of .ppt and .pptx files in the active folder on the remote machine.',
			options: [],
			callback: async (_event) => {
				sendOscMessage(`/oscpoint/files/list`, [])
			},
		},
		changeFileIndex: {
			name: 'Change selected file',
			description: 'Move through list of files in active folder.',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'increment_1', label: 'Scroll up list 1' },
						{ id: 'increment_10', label: 'Scroll up list 10' },
						{ id: 'decrement_1', label: 'Scroll down list 1' },
						{ id: 'decrement_10', label: 'Scroll down list 10' },
					],
					default: 'increment_1',
				},
			],
			callback: async (event) => {
				switch (event.options.action) {
					case 'increment_1':
						self.fileIndex++
						if (self.fileIndex > self.fileCount - 1) {
							self.fileIndex = 0
						}
						break
					case 'increment_10':
						self.fileIndex = self.fileIndex + 10
						if (self.fileIndex > self.fileCount - 1) {
							self.fileIndex = self.fileCount - 1
						}
						break
					case 'decrement_1':
						self.fileIndex--
						if (self.fileIndex < 0) {
							self.fileIndex = self.fileCount - 1
						}
						break
					case 'decrement_10':
						self.fileIndex = self.fileIndex - 10
						if (self.fileIndex < 0) {
							self.fileIndex = 0
						}
						break
				}
				self.log('debug', `Changing file index to ${self.fileIndex}`)
				let filename = self.files[self.fileIndex].name
				self.log('debug', `Changing active folder filename to: ${filename}`)
				self.setVariableValues({ activeFolderFileName: filename, activeFolderSelectedIndex: self.fileIndex + 1 })
				self.checkFeedbacks('folderProgressBars')
			},
		},
		changePresentationIndex: {
			name: 'Move through list of open presentations',
			description: '',
			options: [
				{
					id: 'action',
					type: 'dropdown',
					label: 'Action',
					choices: [
						{ id: 'increment_1', label: 'Scroll up list 1' },
						{ id: 'increment_10', label: 'Scroll up list 10' },
						{ id: 'decrement_1', label: 'Scroll down list 1' },
						{ id: 'decrement_10', label: 'Scroll down list 10' },
					],
					default: 'increment',
				},
			],
			callback: async (event) => {
				switch (event.options.action) {
					case 'increment_1':
						self.presentationsIndex++
						if (self.presentationsIndex > self.presentationsCount - 1) {
							self.presentationsIndex = 0
						}
						break
					case 'increment_10':
						self.presentationsIndex + 10
						if (self.presentationsIndex > self.presentationsCount - 1) {
							self.presentationsIndex = 0
						}
						break
					case 'decrement_1':
						self.presentationsIndex--
						if (self.presentationsIndex < 0) {
							self.presentationsIndex = self.presentationsCount - 1
						}
						break
					case 'decrement_10':
						self.presentationsIndex = self.presentationsIndex - 10
						if (self.presentationsIndex < 0) {
							self.presentationsIndex = 0
						}
						break
				}
				self.log('debug', `Changing presentation index to ${self.presentationsIndex}`)
				let presentationName = self.presentations[self.presentationsIndex].name
				self.log('debug', `Changing selected presentation name to: ${presentationName}`)
				self.setVariableValues({
					presentationsSelectedFilename: presentationName,
					presentationsSelectedIndex: self.presentationsIndex + 1,
				})
			},
		},
	})

	const sendOscMessage = (path, args) => {
		//self.log('debug', `Sending OSC ${path} ${args.length > 0 ? args[0].value : ''}`);
		console.log(
			'info',
			`Sending OSC ${path} ${args.length > 0 ? args[0].value : ''}${args.length > 1 ? args[1].value : ''}`
		)
		self.oscSend(self.config.remotehost, self.config.remoteport, path, args)
	}

	const sanitiseSlideNumber = (slideNumber, event) => {
		const intSlideNumber = parseInt(slideNumber)
		if (isNaN(intSlideNumber)) {
			self.log('error', `${event.controlId}: ${event.actionId} - invalid slide number "${slideNumber}"`)
			return false
		}
		if (intSlideNumber < 1) {
			self.log('warn', `${event.controlId}: ${event.actionId} - slide number ${intSlideNumber} is < 1, setting to 1`)
			return 1
		}
		return intSlideNumber
	}
}
