const { Regex } = require('@companion-module/base')

const configFields = [
	{
		id: 'important-line',
		type: 'static-text',
		label: 'Getting started with OSCPoint',
		value: `OSCPoint provides an OSC API to control and monitor PowerPoint on Windows devices.<br/>
        There's a free PowerPoint add-in you'll need to download and install on your show machines - follow the link below for more details:<br/>
        <a href='https://github.com/phuvf/oscpoint' target="_blank">https://github.com/phuvf/oscpoint</a>`,
		width: 12,
	},
	{
		id: 'important-line',
		type: 'static-text',
		label: 'Remote IP and Port',
		value: `The IP address and port of your PowerPoint machine.<br/>
        Default remote port: <b>35551</b>. This can be changed using the OSCPoint ribbon tab in PowerPoint.`,
		width: 12,
	},
	{
		type: 'textinput',
		id: 'remotehost',
		label: 'Remote IP',
		width: 8,
		regex: Regex.IP,
		default: '127.0.0.1',
	},
	{
		type: 'textinput',
		id: 'remoteport',
		label: 'Remote port',
		width: 4,
		regex: Regex.PORT,
		default: 35551,
	},
	{
		id: 'important-line',
		type: 'static-text',
		label: 'Local port',
		value: `This is the port that this module will use to listen for OSC feedback messages from OSCPoint<br/>
        Default local port: <b>35550</b>. This can be changed using the OSCPoint ribbon tab in PowerPoint.`,
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
]

module.exports = configFields
