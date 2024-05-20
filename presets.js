const filePresets = require('./presets/files.js')
const mediaPresets = require('./presets/media.js')
const slidesPresets = require('./presets/slides.js')

module.exports = function (self) {
	let presets = { ...filePresets, ...mediaPresets, ...slidesPresets }
	self.setPresetDefinitions(presets)
}
