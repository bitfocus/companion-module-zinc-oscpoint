const { Regex } = require('@companion-module/base')

module.exports = function (self) {

	self.setActionDefinitions({
		next: {
			name: 'Next',
			options: [],
			callback: async (event) => {
				sendOscMessage('/oscpoint/next', []);
			},
		},
		previous: {
			name: 'Previous',
			options: [],
			callback: async (event) => {
				sendOscMessage('/oscpoint/previous', []);
			},
		},
		goto_slide_number: {
			name: 'Goto slide number',
			options: [{
				type: 'textinput',
				label: 'Slide number',
				id: 'int',
				default: 1,
				regex: Regex.SIGNED_NUMBER,
				useVariables: true,
			},],
			callback: async (event) => {
				sendOscMessage('/oscpoint/goto/slide', [{ type: 'i', value: event.options.int }]);
			},
		},
		goto_first_slide: {
			name: 'Goto first slide in deck',
			options: [],
			callback: async (event) => {
				sendOscMessage('/oscpoint/goto/slide/first', []);
			},
		},
		goto_last_slide: {
			name: 'Goto last slide in deck',
			options: [],
			callback: async (event) => {
				sendOscMessage('/oscpoint/goto/slide/last', []);
			},
		},
		goto_section: {
			name: 'Goto first slide in section',
			options: [{
				type: 'textinput',
				label: 'Section name (case sensitive)',
				id: 'sectionName',
				default: "Default Section",
				useVariables: true,
			},],
			callback: async (event) => {
				sendOscMessage('/oscpoint/goto/section', [{ type: 's', value: event.options.sectionName }]);
			},
		},
		hide_slide: {
			name: 'Hide slide',
			options: [{
				type: 'textinput',
				label: 'Slide number',
				id: 'int',
				default: 1,
				regex: Regex.SIGNED_NUMBER,
				useVariables: true,
			},],
			callback: async (event) => {
				sendOscMessage('/oscpoint/slide/hide', [{ type: 'i', value: event.options.int }]);
			},
		},
		unhide_slide: {
			name: 'Unhide slide',
			options: [{
				type: 'textinput',
				label: 'Slide number',
				id: 'int',
				default: 1,
				regex: Regex.SIGNED_NUMBER,
				useVariables: true,
			},],
			callback: async (event) => {
				sendOscMessage('/oscpoint/slide/unhide', [{ type: 'i', value: event.options.int }]);
			},
		},
		start_slideshow: {
			name: 'Start slideshow',
			options: [{
				id: 'startPosition',
				type: 'dropdown',
				label: 'Start from',
				choices: [
					{ id: 'top', label: 'Top' },
					{ id: 'currentSlide', label: 'Current slide' },
					{ id: 'section', label: 'Named section' },
				],
				default: 'top'
			},
			{
				type: 'textinput',
				label: 'Section name (case sensitive)',
				id: 'sectionName',
				default: "Default Section",
				useVariables: true,
			},],
			callback: async (event) => {
				switch (event.options.startPosition) {
					case 'top':
						sendOscMessage('/oscpoint/slideshow/start', []);
						break;
					case 'currentSlide':
						sendOscMessage('/oscpoint/slideshow/start/current', []);
						break;
					case 'section':
						sendOscMessage('/oscpoint/slideshow/start/section', [{ type: 's', value: event.options.sectionName }]);
						break;
				}
			},
		},
		end_slideshow: {
			name: 'End slideshow',
			options: [],
			callback: async (event) => {	
						sendOscMessage('/oscpoint/slideshow/end', []);
			},
		},
		black_screen: {
			name: 'Black screen',
			options: [{
				id: 'action',
				type: 'dropdown',
				label: 'Action',
				choices: [
					{ id: 'toggle', label: 'Toggle black' },
					{ id: 'on', label: 'Black on' },
					{ id: 'off', label: 'Black off' },
				],
				default: 'toggle'
			},],
			callback: async (event) => {
				switch (event.options.action) {
					case 'on':
						sendOscMessage('/oscpoint/slideshow/black', [{ type: 'i', value: 1 }]);
						break;
					case 'off':
						sendOscMessage('/oscpoint/slideshow/black', [{ type: 'i', value: 0 }]);
						break;
					case 'toggle':
						sendOscMessage('/oscpoint/slideshow/black', []);
						break;
				}
			},
		},
		white_screen: {
			name: 'White screen',
			options: [{
				id: 'action',
				type: 'dropdown',
				label: 'Action',
				choices: [
					{ id: 'toggle', label: 'Toggle white' },
					{ id: 'on', label: 'White on' },
					{ id: 'off', label: 'White off' },
				],
				default: 'toggle'
			},],
			callback: async (event) => {
				switch (event.options.action) {
					case 'on':
						sendOscMessage('/oscpoint/slideshow/white', [{ type: 'i', value: 1 }]);
						break;
					case 'off':
						sendOscMessage('/oscpoint/slideshow/white', [{ type: 'i', value: 0 }]);
						break;
					case 'toggle':
						sendOscMessage('/oscpoint/slideshow/white', []);
						break;
				}
			},
		},
		laser: {
			name: 'Laser pointer',
			options: [{
				id: 'action',
				type: 'dropdown',
				label: 'Action',
				choices: [
					{ id: 'toggle', label: 'Toggle laser pointer' },
					{ id: 'on', label: 'Laser pointer on' },
					{ id: 'off', label: 'Laser pointer off' },
				],
				default: 'toggle'
			},],
			callback: async (event) => {
				switch (event.options.action) {
					case 'on':
						sendOscMessage('/oscpoint/slideshow/laserpointer', [{ type: 'i', value: 1 }]);
						break;
					case 'off':
						sendOscMessage('/oscpoint/slideshow/laserpointer', [{ type: 'i', value: 0 }]);
						break;
					case 'toggle':
						sendOscMessage('/oscpoint/slideshow/laserpointer', []);
						break;
				}
			},
		},
		mediaTransport: {
			name: 'Media play/pause/stop',
			options: [{
				id: 'action',
				type: 'dropdown',
				label: 'Action',
				choices: [
					{ id: 'playpause', label: 'Play/pause toggle' },
					{ id: 'play', label: 'Play' },
					{ id: 'pause', label: 'Pause' },
					{ id: 'stop', label: 'Stop' },
				],
				default: 'playpause'
			},],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/media/${event.options.action}`, []);
			},
		},
		mediaBookmarks: {
			name: 'Media bookmarks',
			options: [{
				id: 'action',
				type: 'dropdown',
				label: 'Action',
				choices: [
					{ id: 'next', label: 'Next bookmark' },
					{ id: 'previous', label: 'Previous bookmark' },
				],
				default: 'next'
			},],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/media/goto/bookmark/${event.options.action}`, []);
			},
		},
		mediaGotoTime: {
			name: 'Move media playhead',
			options: [{
				type: 'textinput',
				label: 'Playhead position in seconds',
				id: 'float',
				default: 1,
				regex: Regex.SIGNED_FLOAT,
				useVariables: true,
			},
			{
				id: 'important-line',
				type: 'static-text',
				label: 'Use negative values to specify time from end of media e.g. -10 will seek to last 10 seconds of media.',
			}],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/media/goto/position`, [{ type: 'i', value: parseInt(event.options.float*1000) }]);
			},
		},
		refreshData: {
			name: 'Refresh data',
			options: [],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/feedbacks/refresh`, []);
			},
		},
	});

	const sendOscMessage = (path, args) => {
		console.log(`Sending OSC ${self.config.remotehost}:${self.config.remoteport} ${path}`)
		//console.log(`Sending Args ${JSON.stringify(args)}`)
		self.oscSend(self.config.remotehost, self.config.remoteport, path, args)
	}
}
