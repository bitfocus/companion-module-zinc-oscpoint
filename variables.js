/* eslint-disable prettier/prettier */
module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'presentations', name: 'JSON array of all the presentations currently open' },
		{ variableId: 'presentationsFileNames', name: 'Array of filenames for currently open presentations' },
		{
			variableId: 'presentationsSelectedIndex',
			name: 'Index of the selected presentation in the presentations array',
		},
		{ variableId: 'presentationsCount', name: 'Total number of presentations open' },
		{ variableId: 'presentationsSelectedFilename', name: 'Filename of the selected presentation' },

		{ variableId: 'presentation', name: 'JSON object with active presentation data' },
		{ variableId: 'presentationName', name: 'Presentation filename' },
		{ variableId: 'slideCount', name: 'Total slide count' },
		{ variableId: 'slideCountVisible', name: 'Total slide count, excluding hidden slides' },
		{ variableId: 'state', name: 'Presentation state' },
		{ variableId: 'currentSlide', name: 'Current slide number' },
		{ variableId: 'slidesRemaining', name: 'Number of slides left in slide show, excluding hidden slides' },
		{ variableId: 'buildPosition', name: 'Current slide build position' },
		{ variableId: 'buildCount', name: 'Total number of builds on current slide' },
		{ variableId: 'buildsRemaining', name: 'Number of builds remaining on slide' },
		{ variableId: 'sectionIndex', name: 'Section index' },
		{ variableId: 'sectionName', name: 'Section name' },
		{ variableId: 'sectionSlideCount', name: 'Number of slides in current section' },
		{ variableId: 'sectionFirstSlide', name: 'Index of first slide in current section' },
		{ variableId: 'sectionSlidesRemaining', name: 'Number of slides left in section, excluding hidden slides' },
		{
			variableId: 'previousSectionFirstSlide',
			name: 'Index of first slide in previous section (or slide 1 if this is the first section)',
		},
		{
			variableId: 'previousSectionName',
			name: 'Name of previous section (or "Start of deck" if this is the first section)',
		},
		{
			variableId: 'nextSectionFirstSlide',
			name: 'Index of first slide in next section (or last slide in deck if this is the final section)',
		},
		{
			variableId: 'nextSectionName',
			name: 'Name of next section (or "End of deck" if this is the final section)',
		},
		{ variableId: 'notes', name: 'Current slide notes' },
		{ variableId: 'notesSnip', name: 'Current slide notes (snippet)' },
		{ variableId: 'mediaState', name: 'Media playback state' },
		{ variableId: 'mediaDuration', name: 'Media clip total duration in seconds' },
		{ variableId: 'mediaDurationTrimmed', name: 'Trimmed media clip duration in seconds - from start point to end point' },
		{ variableId: 'mediaDurationTrimmedFormatted', name: 'Trimmed media clip duration (formatted mm:ss)' },
		{ variableId: 'mediaDurationFormatted', name: 'Media clip duration (formatted mm:ss)' },
		{ variableId: 'mediaPosition', name: 'Current media playhead position in seconds' },
		{ variableId: 'mediaPositionFormatted', name: 'Current media playhead position (formatted mm:ss)' },
		{ variableId: 'mediaRemaining', name: 'Remaining media time in seconds' },
		{ variableId: 'mediaRemainingFormatted', name: 'Remaining media time (formatted mm:ss)' },
		{ variableId: 'mediaStartPoint', name: 'Media clip start point (ms)' },
		{ variableId: 'mediaEndPoint', name: 'Media clip end point (ms)' },
		{
			variableId: 'fileAccessEnabled',
			name: 'Do we have access to files on this machine? Must be set locally via OSCPoint tab in PowerPoint.',
		},
		{
			variableId: 'files',
			name: 'Array of JSON objects with data about the .ppt and .pptx files in the active folder',
		},
		{
			variableId: 'activeFolder',
			name: "The active folder on the remote machine, relative to the user's home directory.",
		},
		{
			variableId: 'activeFolderFullPath',
			name: 'The full path of active folder on the remote machine.',
		},
		{ variableId: 'activeFolderFileNames', name: 'Array of file names in active folder' },
		{ variableId: 'activeFolderFileName', name: 'Name of selected file in active folder' },
		{ variableId: 'activeFolderFileCount', name: 'Number of files in active folder' },
		{ variableId: 'activeFolderSelectedIndex', name: 'Index of selected file in active folder' },
	])
}
