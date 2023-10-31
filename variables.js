module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'presentationName', name: 'Presentation filename' },
		{ variableId: 'totalSlides', name: 'Total slides' },
		{ variableId: 'state', name: 'Presentation state' },
	])
}
