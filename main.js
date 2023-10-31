const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const osc = require('osc')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.connect();

	}
	// When module gets deleted
	async destroy() {
		if (this.udpPort) this.udpPort.close();
		//this.log('debug', 'destroy')
	}

	async connect() {
		this.udpPort = new osc.UDPPort({
			localAddress: '0.0.0.0',
			localPort: this.config.localport,
			metadata: true,
		});
		this.udpPort.on('message', (oscMsg) => {
			this.processData(oscMsg)
		})

		this.udpPort.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				this.log('error', 'Error: Selected port in use.' + err.message)
			}
		})

		// Open the socket.
		this.udpPort.open();

		this.udpPort.on('ready', () => {
			this.log('info', `Listening to OSCPoint on port: ${this.config.localport}`)
		});
	}

	async configUpdated(config) {
		this.log('info', 'Config has changed, updating...')
		this.config = config
		if (this.udpPort) this.udpPort.close();
		this.connect();
	}

	// Return config fields for web config
	getConfigFields() {
		return [
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
				The remote port is 35551 by default, but can be changed using the OSCPoint ribbon tab in PowerPoint.`,
				width: 12,
			},
			{
				type: 'textinput',
				id: 'remotehost',
				label: 'Remote IP',
				width: 8,
				regex: Regex.IP,
				default: '127.0.0.1'
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
				The local port is 35550 by default, but can be changed using the OSCPoint ribbon tab in PowerPoint.`,
				width: 12,
			},
			{
				type: 'textinput',
				id: 'localport',
				label: 'Local port',
				width: 8,
				regex: Regex.PORT,
				default: 35550
			},

		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}


}

runEntrypoint(ModuleInstance, UpgradeScripts)
