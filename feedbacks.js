const { combineRgb } = require('@companion-module/base')
const { graphics } = require('companion-module-utils')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		showState: {
			name: 'Show state feedback',
			type: 'boolean',
			label: 'Show state',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'state',
					type: 'dropdown',
					label: 'State',
					choices: [
						{ id: 'slideshow', label: 'Slide show' },
						{ id: 'edit', label: 'Edit' },
					],
					default: 'slideshow',
				},
			],
			callback: (feedback) => {
				if (self.getVariableValue('state') == feedback.options.state) {
					return true
				}
				return false
			},
		},
		mediaState: {
			name: 'Media state feedback',
			type: 'boolean',
			label: 'Media state',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'state',
					type: 'dropdown',
					label: 'State',
					choices: [
						{ id: 'playing', label: 'Playing' },
						{ id: 'paused', label: 'Paused' },
						{ id: 'stopped', label: 'Stopped' },
						{ id: 'notReady', label: 'Not ready' },
					],
					default: 'playing',
				},
			],
			callback: (feedback) => {
				if (self.getVariableValue('mediaState') == feedback.options.state) {
					return true
				}
				return false
			},
		},
		fileAccess: {
			name: 'File access feedback',
			type: 'boolean',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 0),
				color: combineRgb(0, 0, 0),
				text: 'File access: Enabled',
			},
			options: [
				{
					id: 'state',
					type: 'dropdown',
					label: 'File access state',
					choices: [
						{ id: 'enabled', label: 'Enabled' },
						{ id: 'disabled', label: 'Denied' },
					],
					default: 'enabled',
				},
			],
			callback: (feedback) => {
				if (self.getVariableValue('fileAccessEnabled') == true) {
					return feedback.options.state == 'enabled'
				}
				return feedback.options.state == 'disabled'
			},
		},
		// slidePreview: {
		// 	type: 'advanced',
		// 	name: 'Display slide preview',
		// 	options: [],
		// 	callback: async (feedback) => {
		// 		self.log('debug', `Parsing PNG and rendering to button`)
		// 		const png64 = self.getVariableValue('slidePreview')
		// 		const icon = await graphics.parseBase64(png64, { alpha: true })
		// 		const imageBuffer = graphics.icon({
		// 			width: feedback.image.width,
		// 			height: feedback.image.height,
		// 			offsetX: 0,
		// 			offsetY: 10,
		// 			type: 'custom',
		// 			custom: icon,
		// 			customWidth: 72,
		// 			customHeight: 40,
		// 		})
		// 		return { imageBuffer: imageBuffer }
		// 	},
		// },
		slideProgressBars: {
			type: 'advanced',
			name: 'Slide/build/playhead progress bar',
			description: 'Displays as a bar showing build progress through the current slide',
			options: [
				{
					id: 'type',
					type: 'dropdown',
					label: 'State',
					choices: [
						{ id: 'slide', label: 'Slide progress through presentation' },
						{ id: 'build', label: 'In-slide build progress' },
					],
					default: 'slide',
				},
			],
			callback: (feedback) => {
				let val = (self.getVariableValue('buildPosition') / self.getVariableValue('buildCount')) * 100
				if (feedback.options.type == 'slide') {
					val = (self.getVariableValue('currentSlide') / self.getVariableValue('slideCount')) * 100
				}
				const options = {
					width: feedback.image.width,
					height: feedback.image.height,
					colors: [
						{ size: 100, color: combineRgb(0, 200, 0), background: combineRgb(0, 200, 0), backgroundOpacity: 64 },
					],
					barLength: 62,
					barWidth: 6,
					value: val,
					type: 'horizontal',
					offsetX: 5,
					offsetY: 50,
					opacity: 255,
				}

				return {
					imageBuffer: graphics.bar(options),
				}
			},
		},
		mediaProgressBar: {
			type: 'advanced',
			name: 'Playhead progress bar',
			description: 'Displays as a bar showing progress through current media clip',
			options: [
				{
					id: 'type',
					type: 'dropdown',
					label: 'Type',
					choices: [
						{ id: 'countUp', label: 'Count up (bar fills from left)' },
						{ id: 'countDown', label: 'Count down (bar shrinks to right)' },
					],
					default: 'countUp',
				},
			],
			callback: (feedback) => {
				let posPercent = (self.getVariableValue('mediaPosition') / self.getVariableValue('mediaDuration')) * 100
				let remainingSeconds = self.getVariableValue('mediaDuration') - self.getVariableValue('mediaPosition')
				let colors
				let val
				switch (feedback.options.type) {
					case 'countUp':
						colors = [
							{ size: 100, color: combineRgb(0, 200, 0), background: combineRgb(0, 50, 0), backgroundOpacity: 255 },
						]
						val = posPercent
						break
					case 'countDown':
					default:
						colors = [
							{
								size: posPercent,
								color: combineRgb(0, 50, 0),
								background: combineRgb(0, 0, 0),
								backgroundOpacity: 255,
							},
							{
								size: 100 - posPercent,
								color: combineRgb(0, 200, 0),
								background: combineRgb(0, 200, 0),
								backgroundOpacity: 255,
							},
						]
						val = 100
						break
				}
				const options = {
					width: feedback.image.width,
					height: feedback.image.height,
					colors: colors,
					barLength: 62,
					barWidth: 6,
					value: val,
					type: 'horizontal',
					offsetX: 5,
					offsetY: 50,
					opacity: 255,
				}

				let bgcolor = combineRgb(0, 0, 0)
				if (remainingSeconds < 11 && remainingSeconds > 0) {
					bgcolor = combineRgb(255, 0, 0)
				}

				return {
					imageBuffer: graphics.bar(options),
					bgcolor: bgcolor,
				}
			},
		},
		folderProgressBars: {
			type: 'advanced',
			name: 'Folder position progress bar',
			description: 'Displays as a bar showing scroll position through folder',
			options: [],
			callback: (feedback) => {
				let dotHeight = 8
				let blankSpace = 100 - dotHeight

				let selectedPortion = self.getVariableValue('activeFolderSelectedIndex') - 1
				let totalPortion = self.getVariableValue('activeFolderFileCount') - 1

				self.log('debug', `Folder progress bar: ${selectedPortion} / ${totalPortion}`)

				let portion = selectedPortion / totalPortion
				self.log('debug', `Folder progress bar decimal: ${portion}`)

				let preDot = blankSpace * portion
				let postDot = blankSpace * (1-portion)
				self.log('debug', `pre/post height: ${preDot}/${postDot}`)

				const options = {
					width: feedback.image.width,
					height: feedback.image.height,
					colors: [
						{ size: postDot, color: combineRgb(0, 50, 0), background: combineRgb(0, 50, 0), backgroundOpacity: 255 },
						{
							size: dotHeight,
							color: combineRgb(255, 255, 0),
							background: combineRgb(255, 255, 0),
							backgroundOpacity: 255,
						},
						{ size: preDot, color: combineRgb(0, 50, 0), background: combineRgb(0, 50, 0), backgroundOpacity: 255 },
					],
					barLength: 62,
					barWidth: 6,
					value: 100,
					type: 'vertical',
					offsetX: 62,
					offsetY: 5,
					opacity: 255,
				}

				return {
					imageBuffer: graphics.bar(options),
				}
			},
		},
	})
}
