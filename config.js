const { Regex } = require('@companion-module/base')

const configFields = [
	{
		id: 'important-line',
		type: 'static-text',
		label: 'OSCPoint provides an OSC API to control and monitor PowerPoint on Windows devices.',
		value: `There's a free PowerPoint add-in you'll need to download and install on your PowerPoint machines: <a href='https://oscpoint.com/donate' target="_blank">https://oscpoint.com/</a>`,
		width: 12,
	},

	{
		type: 'textinput',
		id: 'remotehost',
		label: 'Remote IP',
		width: 6,
		regex: Regex.IP,
		default: '127.0.0.1',
	},
	{
		type: 'textinput',
		id: 'remoteport',
		label: 'Remote port',
		width: 6,
		regex: Regex.PORT,
		default: 35551,
	},
	{
		id: 'important-line',
		type: 'static-text',
		label: 'The IP address and port of your remote PowerPoint machine.',
		value: `Default remote port is <b>35551</b> - this can be changed using the OSCPoint ribbon tab in PowerPoint.<br/><br/>`,
		width: 12,
	},
	{
		type: 'textinput',
		id: 'localport',
		label: 'Local port',
		width: 8,
		regex: Regex.PORT,
		default: 35550,
	},
	{
		id: 'important-line',
		type: 'static-text',
		label: 'This is the port that this module will use to listen for OSC feedback messages from OSCPoint',
		value: `Default local port is <b>35550</b> - this can be changed using the OSCPoint ribbon tab in PowerPoint.<br/><br/>`,
		width: 12,
	},
	{
		id: 'important-line',
		type: 'static-text',
		label: 'Setting up multiple PowerPoint machines?',
		value: `Each machine will need it's own instance of OSCPoint, and you'll need to tweak the local port below to get feedback from both machines.<br/>
		See the <a href='https://github.com/phuvf/oscpoint/blob/main/CONFIGURATION.md'>configuration examples page on GitHub</a> for full details and example setups.`,
		width: 12,
	},
]

module.exports = configFields
