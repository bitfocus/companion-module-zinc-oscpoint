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
				id: 'slideNumber',
				default: "1",
				regex: Regex.SIGNED_NUMBER,
				useVariables: true,
			},],
			callback: async (event) => {
				let slideNumber = await self.parseVariablesInString(event.options.slideNumber);
				slideNumber = sanitiseSlideNumber(slideNumber, event);
				if (slideNumber) {
					sendOscMessage('/oscpoint/goto/slide', [{ type: 'i', value: slideNumber }]);
				}
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
				let sectionName = await self.parseVariablesInString(event.options.sectionName);
				sendOscMessage('/oscpoint/goto/section', [{ type: 's', value: sectionName }]);
			},
		},
		hide_slide: {
			name: 'Hide slide',
			options: [{
				type: 'textinput',
				label: 'Slide number',
				id: 'slideNumber',
				default: "1",
				regex: Regex.SIGNED_NUMBER,
				useVariables: true,
			},],
			callback: async (event) => {
				let slideNumber = await self.parseVariablesInString(event.options.slideNumber);
				slideNumber = sanitiseSlideNumber(slideNumber, event);
				if (slideNumber) {
					sendOscMessage('/oscpoint/slide/hide', [{ type: 'i', value: slideNumber }]);
				}
			},
		},
		unhide_slide: {
			name: 'Unhide slide',
			options: [{
				type: 'textinput',
				label: 'Slide number',
				id: 'slideNumber',
				default: "1",
				regex: Regex.SIGNED_NUMBER,
				useVariables: true,
			},],
			callback: async (event) => {
				let slideNumber = await self.parseVariablesInString(event.options.slideNumber);
				slideNumber = sanitiseSlideNumber(slideNumber, event);
				if (slideNumber) {
					sendOscMessage('/oscpoint/slide/unhide', [{ type: 'i', value: slideNumber }]);
				}
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
				isVisible: (options) => { return options.startPosition == 'section' },
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
						const sectionName = await self.parseVariablesInString(event.options.sectionName);
						sendOscMessage('/oscpoint/slideshow/start/section', [{ type: 's', value: sectionName }]);
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
				default: 'start'
			}, {
				type: 'textinput',
				label: 'Milliseconds',
				id: 'posMs',
				default: "1",
				regex: Regex.NUMBER,
				useVariables: true,
				isVisible: (options) => { return options.type != 'percent' }
			},
			{
				type: 'textinput',
				label: 'Percent',
				id: 'posPercent',
				default: "50",
				regex: Regex.FLOAT,
				useVariables: true,
				isVisible: (options) => { return options.type == 'percent' }
			}],
			callback: async (event) => {
				let posMs = "";
				let intPosMs = 0;

				if (event.options.type != 'percent') {
					posMs = await self.parseVariablesInString(event.options.posMs);
					console.log('posMs', posMs)
					intPosMs = parseInt(posMs);
					if (isNaN(intPosMs)) {
						self.log('error', `${event.controlId}: ${event.actionId} - invalid millisecond position "${posMs}"`);
						return;
					}
					if (intPosMs < 0) {
						self.log('warn', `${event.controlId}: ${event.actionId} - millisecond position must be >= 0, but received ${intPosMs}. Reset to 0.`);
						intPosMs = 0;
					}
					intPosMs += 0; // to handle -0 situation.
				}
				switch (event.options.type) {
					case 'start':
						sendOscMessage(`/oscpoint/media/goto/position/fromstart`, [{ type: 'i', value: intPosMs }]);
						break;
					case 'end':
						sendOscMessage(`/oscpoint/media/goto/position/beforeend`, [{ type: 'i', value: intPosMs }]);
						break;
					case 'forward':
						sendOscMessage(`/oscpoint/media/goto/position/forward`, [{ type: 'i', value: intPosMs }]);
						break;
					case 'back':
						sendOscMessage(`/oscpoint/media/goto/position/back`, [{ type: 'i', value: intPosMs }]);
						break;
					case 'percent':
						const posPercent = await self.parseVariablesInString(event.options.posPercent);
						let floatPosPercent = parseFloat(posPercent);
						if (isNaN(floatPosPercent)) {
							self.log('error', `${event.controlId}: ${event.actionId} - invalid percentage "${posPercent}"`);
							return;
						}
						if (floatPosPercent < 0 || floatPosPercent > 100) {
							self.log('warn', `${event.controlId}: ${event.actionId} | Percent position must be >=0 and <= 100, but received ${floatPosPercent}. Reset to 0.`);
							floatPosPercent = 0;
						}
						floatPosPercent += 0; // to handle -0 situation.
						sendOscMessage(`/oscpoint/media/goto/position/percent`, [{ type: 'f', value: floatPosPercent }]);
						break;
					default:
						self.log('error', `${event.controlId}: ${event.actionId} - invalid reference "${event.options.type}"`);
						break;
				}
			}
		},
		refreshData: {
			name: 'Refresh data',
			options: [],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/feedbacks/refresh`, []);
			},
		},
		enableActions: {
			name: 'Global enable/disable actions',
			options: [{
				id: 'action',
				type: 'dropdown',
				label: 'Action',
				choices: [
					{ id: 'enable', label: 'Enable actions' },
					{ id: 'disable', label: 'Disable actions' },
				],
				default: 'enable'
			},
			{
				type:"static-text",
				label:"WARNING! OSCPoint will only respond to the Enable Actions command - all others will  be ignored.",
				value:"",
				isVisible: (options) => { return options.action == 'disable' }
			}],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/actions/${event.options.action}`, []);
			},
		},
		enableFeebacks: {
			name: 'Global enable/disable feedbacks',
			options: [{
				id: 'action',
				type: 'dropdown',
				label: 'Action',
				choices: [
					{ id: 'enable', label: 'Enable feedbacks' },
					{ id: 'disable', label: 'Disable feedbacks' },
				],
				default: 'enable'
			}],
			callback: async (event) => {
				sendOscMessage(`/oscpoint/feedbacks/${event.options.action}`, []);
			},
		},
	});

	const sendOscMessage = (path, args) => {
		//self.log('debug', `Sending OSC ${path} ${args.length > 0 ? args[0].value : ''}`);
		console.log('debug', `Sending OSC ${path} ${args.length > 0 ? args[0].value : ''}`);
		self.oscSend(self.config.remotehost, self.config.remoteport, path, args)
	}

	const sanitiseSlideNumber = (slideNumber, event) => {
		const intSlideNumber = parseInt(slideNumber);
		if (isNaN(intSlideNumber)) {
			self.log('error', `${event.controlId}: ${event.actionId} - invalid slide number "${slideNumber}"`);
			return false;
		}
		if (intSlideNumber < 1) {
			self.log('warn', `${event.controlId}: ${event.actionId} - slide number ${intSlideNumber} is < 1, setting to 1`);
			return 1;
		}
		return intSlideNumber;
	};
}
