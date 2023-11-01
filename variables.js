module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'presentationName', name: 'Presentation filename' },
		{ variableId: 'slideCount', name: 'Total slide count' },
		{ variableId: 'state', name: 'Presentation state' },
		{ variableId: 'currentSlide', name: 'Current slide number' },
		{ variableId: 'buildPosition', name: 'Current slide build position' },
		{ variableId: 'buildCount', name: 'Total number of builds on current slide' },
		{ variableId: 'buildsRemaining', name: 'Number of builds remaining on slide' },
		{ variableId: 'sectionIndex', name: 'Section index' },
		{ variableId: 'sectionName', name: 'Section name' },
		{ variableId: 'notes', name: 'Current slide notes' },
		{ variableId: 'notesSnip', name: 'Current slide notes (snippet)' },
		{ variableId: 'mediaState', name: 'Media playback state'},
		{ variableId: 'mediaDuration', name: 'Media clip duration in seconds'},
		{ variableId: 'mediaDurationFormatted', name: 'Media clip duration (formatted mm:ss)'},
		{ variableId: 'mediaPosition', name: 'Current media playhead position in seconds'},
		{ variableId: 'mediaPositionFormatted', name: 'Current media playhead position (formatted mm:ss)'},
		{ variableId: 'mediaRemaining', name: 'Remaining media time in seconds'},
		{ variableId: 'mediaRemainingFormatted', name: 'Remaining media time (formatted mm:ss)'},
	])
}
