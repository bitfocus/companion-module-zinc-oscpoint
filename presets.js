const { Regex, combineRgb } = require('@companion-module/base')
const imgs = require('./imgs.js')

module.exports = function (self) {

	self.setPresetDefinitions({
		
		prev: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Previous slide`, 
			style: {
				text: `⮜`,
				size: '30',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(255, 0, 0),
			},
			steps: [{ down: [{ actionId: 'previous', },], up: [], },],
			feedbacks: [], 
		},
		next: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Next slide`, 
			style: {
				text: "⮞",
				size: '30',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 204, 0),
			},
			steps: [{ down: [{ actionId: 'next', },], up: [], },],
			feedbacks: [], 
		},
		startSlideshowFromStart: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Start slideshow from start`, 
			style: {
				text: `Start`,
				size: '14',
				alignment: "center:bottom",
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				png64: imgs.startSlideshowFromStart
			},
			steps: [{ down: [{ actionId: 'start_slideshow', options:{ startPosition: 'top'} },], up: [], },],
			feedbacks: [], 
		},
		startSlideshowFromCurrent: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Start slideshow from current slide`, 
			style: {
				text: `Current`,
				size: '14',
				alignment: "center:bottom",
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				png64: imgs.startSlideshowFromCurrent
			},
			steps: [{ down: [{ actionId: 'start_slideshow', options:{ startPosition: 'currentSlide'} },], up: [], },],
			feedbacks: [], 
		},
		stopSlideshow: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `End slideshow`, 
			style: {
				text: `End`,
				size: '14',
				alignment: "center:bottom",
				color: combineRgb(255, 0, 0),
				bgcolor: combineRgb(0, 0, 0),
				png64: imgs.endSlideshow
			},
			steps: [{ down: [{ actionId: 'end_slideshow', options:{ } },], up: [], },],
			feedbacks: [], 
		},
		white: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `White screen (toggle)`, 
			style: {
				text: `White`,
				size: '24',
				color: combineRgb(0,0,0),
				bgcolor: combineRgb(255,255,255),
			},
			steps: [{ down: [{ actionId: 'white_screen', options:{action: 'toggle'} },], up: [], },],
			feedbacks: [], 
		},
		black: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Black screen (toggle)`, 
			style: {
				text: `Black`,
				size: '24',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'black_screen', options:{action: 'toggle'} },], up: [], },],
			feedbacks: [], 
		},
		laser: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Laser pointer (toggle)`, 
			style: {
				text: `Laser pointer`,
				size: '14',
				alignment: "center:bottom",
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
				png64: imgs.laser
			},
			steps: [{ down: [{ actionId: 'laser', options:{action: 'toggle'} },], up: [], },],
			feedbacks: [], 
		},
		showState: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Show state`, 
			style: {
				text: "Show state:\n$(OSCPoint:state)",
				size: '14',
				color: combineRgb(0,0,0),
				bgcolor: combineRgb(0,200,0),
			},
			steps: [],
			feedbacks: [{
				feedbackId: 'showState',
				options: {
					state: 'slideshow',
				},
				style: {
					color: combineRgb(0,0,0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},], 
		},
		presentationName: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `File name`, 
			style: {
				text: "File:\n$(OSCPoint:presentationName)",
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [],
			feedbacks: [], 
		},
		slideNumbers: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Current/total slides`, 
			style: {
				text: "Slide\n$(OSCPoint:currentSlide)/$(OSCPoint:slideCount)",
				size: '18',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [],
			feedbacks: [], 
		},
		buildNumbers: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Current/total builds on slide`, 
			style: {
				text: "Build\n$(OSCPoint:buildPosition)/$(OSCPoint:buildCount)",
				size: '18',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [],
			feedbacks: [], 
		},
		notes: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Notes`, 
			style: {
				text: "Notes:\n$(OSCPoint:notesSnip)",
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [],
			feedbacks: [], 
		},
		playpause: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Play/pause`, 
			style: {
				text: `⏯`,
				size: '44',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'mediaTransport', options:{action: 'playpause'} },], up: [], },],
			feedbacks: [], 
		},
		stopMedia: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Stop`, 
			style: {
				text: `⏹`,
				size: '44',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'mediaTransport', options:{action: 'stop'} },], up: [], },],
			feedbacks: [], 
		},
		previousBookmark: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Previous bookmark`, 
			style: {
				text: `⏮`,
				size: '44',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'mediaBookmarks', options:{action: 'previous'} },], up: [], },],
			feedbacks: [], 
		},
		nextBookmark: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Next bookmark`, 
			style: {
				text: `⏭`,
				size: '44',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'mediaBookmarks', options:{action: 'next'} },], up: [], },],
			feedbacks: [], 
		},
		lastTenSeconds: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Last 10 seconds`, 
			style: {
				text: `Last 10s`,
				size: '18',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'mediaGotoTime', options:{type: 'end',posMs: "10000"} },], up: [], },],
			feedbacks: [], 
		},
		mediaState: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Media state`, 
			style: {
				text: `Media state:\n$(OSCPoint:mediaState)`,
				size: '14',
				color: combineRgb(0,0,0),
				bgcolor: combineRgb(0,200,0),
			},
			steps: [],
			feedbacks: [{
				feedbackId: 'mediaState',
				options: {
					state: 'playing',
				},
				style: {
					color: combineRgb(0,0,0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},], 
		},
		mediaPosition: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Playhead position`, 
			style: {
				text: `Position:\n$(OSCPoint:mediaPositionFormatted)`,
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [],
			feedbacks: [], 
		},
		mediaRemaining: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Time remaining`, 
			style: {
				text: `Remaining:\n$(OSCPoint:mediaRemainingFormatted)`,
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [],
			feedbacks: [], 
		},
	});
}
