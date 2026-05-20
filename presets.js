const filePresets = require('./presets/files.js')
const mediaPresets = require('./presets/media.js')
const slidesPresets = require('./presets/slides.js')

module.exports = function (self) {
	let presets = { ...filePresets, ...mediaPresets, ...slidesPresets }
	//let presets = { ...filePresets, ...mediaPresets }
	const structure = [{
		id: 'slides_section',
		name: 'Basics',
		// description: 'Slide show control and feedback',
		definitions: [
			{
				id: 'slides_control',
				type: 'simple',
				name: 'Slide control',
				text: '',
				presets: ['prev', 'next', 'prevSection', 'nextSection'],
			},
			{
				id: 'slideshow_control',
				type: 'simple',
				name: 'Slide show control',
				text: '',
				presets: ['startSlideshowFromStart', 'startSlideshowFromCurrent', 'stopSlideshow', 'pauseSlideshow', 'resumeSlideshow', 'white', 'black', 'laser', 'setWallpaper'],
			},
			{
				id: 'slides_feedback',
				type: 'simple',
				name: 'Slide show feedback',
				// description: 'Live slide show status reporting',
				presets: ['showState', 'presentationName', 'slideNumbers', 'buildNumbers', 'notes'],
			},
		],
	},
	{
		id: 'media_section',
		name: 'Media control',
		// optional description
		definitions: [
			{
				id: 'media_control',
				type: 'simple',
				name: 'Media control',
				text: '',
				presets: ['playpause', 'stopMedia', 'previousBookmark', 'nextBookmark', 'lastTenSeconds'],
			},
			{
				id: 'media_feedback',
				type: 'simple',
				name: 'Media feedback',
				text: '',
				presets: ['mediaState', 'mediaDuration', 'mediaPosition', 'mediaRemaining', 'mediaStartEndPoints'],
			},
		],
	},
	{
		id: 'file_section',
		name: 'File management',
		// optional description
		definitions: [
			{
				id: 'file_group_1',
				type: 'simple',
				name: 'File access configuration',
				description: 'When enabled, OSCPoint will scan a specific folder (the active folder) for .ppt and .pptx files.',
				presets: ['fileAccessEnabled', 'setActiveFolder', 'activeFolder'],
			},
			{
				id: 'file_selection_group',
				type: 'simple',
				name: 'File selection',
				description: 'Use these presets to navigate through the file list to select the file to open.',
				presets: ['plus1', 'plus10', 'minus1', 'minus10', 'selectedFileName', 'openFile'],
			},
		],
	},


	]
	self.setPresetDefinitions(structure, presets)
}
