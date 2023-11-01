const { combineRgb } = require('@companion-module/base')

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
					default: 'slideshow'
				},
			],
			callback: (feedback) => {
				if (self.getVariableValue('state') == feedback.options.state) {
					return true
				} else {
					return false
				}
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
					default: 'playing'
				},
			],
			callback: (feedback) => {
				if (self.getVariableValue('mediaState') == feedback.options.state) {
					return true
				} else {
					return false
				}
			},
		},
	})
}
