const { Regex, combineRgb } = require('@companion-module/base')

module.exports = function (self) {

	self.setPresetDefinitions({
		next: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Next slide`, 
			style: {
				text: `Next`, // You can use variables from your module here
				size: '30',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 204, 0),
			},
			steps: [{ down: [{ actionId: 'next', },], up: [], },],
			feedbacks: [], 
		},
		prev: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Previous slide`, 
			style: {
				text: `Prev`, // You can use variables from your module here
				size: '30',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(255, 0, 0),
			},
			steps: [{ down: [{ actionId: 'previous', },], up: [], },],
			feedbacks: [], 
		},
		start: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Start slideshow`, 
			style: {
				text: `Start show`, // You can use variables from your module here
				size: '24',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{ down: [{ actionId: 'start_slideshow', options:{ startPosition: 'top'} },], up: [], },],
			feedbacks: [], 
		},
		stop: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `End slideshow`, 
			style: {
				text: `End show`, // You can use variables from your module here
				size: '24',
				color: combineRgb(255, 0, 0),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{ down: [{ actionId: 'end_slideshow', options:{ startPosition: 'top'} },], up: [], },],
			feedbacks: [], 
		},
		white: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `White screen (toggle)`, 
			style: {
				text: `White`, // You can use variables from your module here
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
				text: `Black`, // You can use variables from your module here
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
				text: `Laser pointer`, // You can use variables from your module here
				size: '18',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'laser', options:{action: 'toggle'} },], up: [], },],
			feedbacks: [], 
		},
		slideNumbers: {
			type: 'button', 
			category: 'Slideshow control and feedback', 
			name: `Current/total slides`, 
			style: {
				text: "Slide $(OSCPoint:currentSlide)/$(OSCPoint:slideCount)", // You can use variables from your module here
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
				text: "Build $(OSCPoint:buildPosition)/$(OSCPoint:buildCount)", // You can use variables from your module here
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
				text: "Notes: $(OSCPoint:notesSnip)", // You can use variables from your module here
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
				text: `⏯`, // You can use variables from your module here
				size: '44',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'mediaTransport', options:{action: 'playpause'} },], up: [], },],
			feedbacks: [], 
		},
		stop: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Stop`, 
			style: {
				text: `⏹`, // You can use variables from your module here
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
				text: `⏮`, // You can use variables from your module here
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
				text: `⏭`, // You can use variables from your module here
				size: '44',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [{ down: [{ actionId: 'mediaBookmarks', options:{action: 'next'} },], up: [], },],
			feedbacks: [], 
		},
		mediaState: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Media state`, 
			style: {
				text: `Media: $(OSCPoint:mediaState)`, // You can use variables from your module here
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [],
			feedbacks: [], 
		},
		mediaPosition: {
			type: 'button', 
			category: 'Media control and feedback', 
			name: `Playhead position`, 
			style: {
				text: `Position: $(OSCPoint:mediaPositionFormatted)`, // You can use variables from your module here
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
				text: `Remaining: $(OSCPoint:mediaRemainingFormatted)`, // You can use variables from your module here
				size: '14',
				color: combineRgb(255,255,255),
				bgcolor: combineRgb(0,0,0),
			},
			steps: [],
			feedbacks: [], 
		},
	});
}
