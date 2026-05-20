const { combineRgb } = require('@companion-module/base')
const imgs = require('../imgs.js')

module.exports = {
	// mediaActionHeader: {
	//
	// 	name: 'Actions',
	// 	type: 'text',
	// 	text: 'Control media playback and bookmarks',
	// },
	playpause: {
		type: 'simple',
		name: `Play/pause`,
		style: {
			text: ` `,
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: imgs.playPause,
		},
		steps: [{ down: [{ actionId: 'mediaTransport', options: { action: 'playpause' } }], up: [] }],
		feedbacks: [],
	},
	stopMedia: {
		type: 'simple',
		name: `Stop`,
		style: {
			text: ` `,
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: imgs.stop,
		},
		steps: [{ down: [{ actionId: 'mediaTransport', options: { action: 'stop' } }], up: [] }],
		feedbacks: [],
	},
	previousBookmark: {
		type: 'simple',
		name: `Previous bookmark`,
		style: {
			text: ` `,
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: imgs.previousBookmark,
		},
		steps: [{ down: [{ actionId: 'mediaBookmarks', options: { action: 'previous' } }], up: [] }],
		feedbacks: [],
	},
	nextBookmark: {
		type: 'simple',
		name: `Next bookmark`,
		style: {
			text: ` `,
			size: '44',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			png64: imgs.nextBookmark,
		},
		steps: [{ down: [{ actionId: 'mediaBookmarks', options: { action: 'next' } }], up: [] }],
		feedbacks: [],
	},
	lastTenSeconds: {
		type: 'simple',
		name: `Last 10 seconds`,
		style: {
			text: `Last 10s`,
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [{ down: [{ actionId: 'mediaGotoTime', options: { type: 'end', posMs: '10000' } }], up: [] }],
		feedbacks: [],
	},
	// mediaFeedbackHeader: {
	//
	// 	name: 'Feedbacks',
	// 	type: 'text',
	// 	text: 'Show media state and progress',
	// },
	mediaState: {
		type: 'simple',
		name: `Media state`,
		style: {
			text: `Media:\n$(OSCPoint:mediaState)`,
			size: '14',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 200, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'mediaState',
				options: {
					state: 'playing',
				},
				style: {
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
		],
	},
	mediaDuration: {
		type: 'simple',
		name: `Media duration`,
		style: {
			text: `Duration:\n$(OSCPoint:mediaDurationTrimmedFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
	},
	mediaPosition: {
		type: 'simple',
		name: `Playhead position`,
		style: {
			text: `Position:\n$(OSCPoint:mediaPositionFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			alignment: 'center:top',
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'mediaProgressBar',
				options: {
					type: 'countUp',
				},
			},
		],
	},
	mediaRemaining: {
		type: 'simple',
		name: `Time remaining`,
		style: {
			text: `Remain:\n$(OSCPoint:mediaRemainingFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			alignment: 'center:top',
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'mediaProgressBar',
				options: {
					type: 'countDown',
				},
			},
		],
	},
	mediaStartEndPoints: {
		type: 'simple',
		name: `Start/end points`,
		style: {
			text: `In:\n$(OSCPoint:mediaStartPoint)ms\n Out:\n$(OSCPoint:mediaEndPoint)ms`,
			size: '12',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			alignment: 'center:top',
		},
		steps: [],
		feedbacks: [],
	},
}
