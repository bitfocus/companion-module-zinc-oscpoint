const { combineRgb } = require('@companion-module/base')
const imgs = require('../imgs.js')

module.exports = {
	// slidesActionHeader: {
	//
	// 	name: 'Slide control',
	// 	type: 'text',
	// 	text: 'Move though slide show',
	// },
	prev: {
		type: 'simple',
		name: `Previous slide`,
		style: {
			text: `⮜`,
			size: '30',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [{ down: [{ actionId: 'previous' }], up: [] }],
		feedbacks: [],
	},
	next: {
		type: 'simple',
		name: `Next slide`,
		style: {
			text: '⮞',
			size: '30',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 204, 0),
		},
		steps: [{ down: [{ actionId: 'next' }], up: [] }],
		feedbacks: [],
	},
	prevSection: {
		type: 'simple',
		name: `Previous section`,
		style: {
			text: `⮜\nSection`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [{ down: [{ actionId: 'previousSection' }], up: [] }],
		feedbacks: [],
	},
	nextSection: {
		type: 'simple',
		name: `Next section`,
		style: {
			text: `⮞\nSection`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 204, 0),
		},
		steps: [{ down: [{ actionId: 'nextSection' }], up: [] }],
		feedbacks: [],
	},
	// slidesSlideshowHeader: {
	// 	name: 'Slide show controls',
	// 	type: 'text',
	// 	text: 'Start, stop and control slide shows',
	// },
	startSlideshowFromStart: {
		type: 'simple',
		name: `Start slide show from start`,
		style: {
			text: `Start`,
			size: '14',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: imgs.startSlideshowFromStart,
		},
		steps: [{ down: [{ actionId: 'start_slideshow', options: { startPosition: 'top' } }], up: [] }],
		feedbacks: [],
	},
	startSlideshowFromCurrent: {
		type: 'simple',
		name: `Start slide show from current slide`,
		style: {
			text: `Current`,
			size: '14',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: imgs.startSlideshowFromCurrent,
		},
		steps: [{ down: [{ actionId: 'start_slideshow', options: { startPosition: 'currentSlide' } }], up: [] }],
		feedbacks: [],
	},
	stopSlideshow: {
		type: 'simple',
		name: `End slide show`,
		style: {
			text: `End`,
			size: '14',
			alignment: 'center:bottom',
			color: combineRgb(255, 0, 0),
			bgcolor: combineRgb(0, 0, 0),
			png64: imgs.endSlideshow,
		},
		steps: [{ down: [{ actionId: 'end_slideshow', options: {} }], up: [] }],
		feedbacks: [],
	},
	white: {
		type: 'simple',
		name: `White screen (toggle)`,
		style: {
			text: `White`,
			size: '24',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(255, 255, 255),
		},
		steps: [{ down: [{ actionId: 'white_screen', options: { action: 'toggle' } }], up: [] }],
		feedbacks: [],
	},
	black: {
		type: 'simple',
		name: `Black screen (toggle)`,
		style: {
			text: `Black`,
			size: '24',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [{ down: [{ actionId: 'black_screen', options: { action: 'toggle' } }], up: [] }],
		feedbacks: [],
	},
	laser: {
		type: 'simple',
		name: `Laser pointer (toggle)`,
		style: {
			text: `Laser pointer`,
			size: '14',
			alignment: 'center:bottom',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: imgs.laser,
		},
		steps: [{ down: [{ actionId: 'laser', options: { action: 'toggle' } }], up: [] }],
		feedbacks: [],
	},
	pauseSlideshow: {
		type: 'simple',
		name: `Pause show`,
		style: {
			text: `Pause\nslide show`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(64, 0, 0),
		},
		steps: [{ down: [{ actionId: 'slideShowPauseResume', options: { action: 'pause' } }], up: [] }],
		feedbacks: [],
	},
	resumeSlideshow: {
		type: 'simple',
		name: `Resume show`,
		style: {
			text: `Resume\nslide show`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 52, 0),
		},
		steps: [{ down: [{ actionId: 'slideShowPauseResume', options: { action: 'resume' } }], up: [] }],
		feedbacks: [],
	},
	// slidesFeedback: {
	// 	name: 'Slide show feedback',
	// 	type: 'text',
	// 	text: 'Live slide show status reporting',
	// },
	showState: {
		type: 'simple',
		name: `Show state`,
		style: {
			text: 'Show state:\n$(OSCPoint:state)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'showState',
				options: {
					state: 'edit',
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(0, 200, 0),
				},
			},
		],
	},
	presentationName: {
		type: 'simple',
		name: `File name`,
		style: {
			text: 'File:\n$(OSCPoint:presentationName)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
	},
	slideNumbers: {
		type: 'simple',
		name: `Current/total slides`,
		style: {
			text: 'Slide\n$(OSCPoint:currentSlide)/$(OSCPoint:slideCount)',
			size: '18',
			alignment: 'center:top',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'slideProgressBars',
				options: {
					type: 'slide',
				},
			},
		],
	},
	buildNumbers: {
		type: 'simple',
		name: `Current/total builds on slide`,
		style: {
			text: 'Build\n$(OSCPoint:buildPosition)/$(OSCPoint:buildCount)',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			alignment: 'center:top',
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'slideProgressBars',
				options: {
					type: 'build',
				},
			},
		],
	},
	notes: {
		type: 'simple',
		name: `Notes`,
		style: {
			text: 'Notes:\n$(OSCPoint:notesSnip)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
	},
	// slidesMisc: {
	// 	name: 'Miscellaneous',
	// 	type: 'text',
	// 	text: ' ',
	// },
	setWallpaper: {
		type: 'simple',
		name: `Set wallpaper to current slide`,
		style: {
			text: 'Set wallpaper',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 128),
		},
		steps: [{ down: [{ actionId: 'setWallpaper', options: { width: '1920', height: '1080' } }], up: [] }],
		feedbacks: [],
	},
}
