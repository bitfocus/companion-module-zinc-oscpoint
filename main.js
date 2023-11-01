const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const UpdatePresetDefinitions = require('./presets')
const oscListener = require('./osc-listener');


class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		this.log('info',`Sending OSC actions to ${this.config.remotehost}:${this.config.remoteport}`);
		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresetDefinitions() // export preset definitions
		oscListener.connect(this);

		//set some defaults for the variables
		this.setVariableValues({
			presentationName: "(none)",
			slideCount: '-',
			state: 'edit',
			currentSlide: '-',
			buildPosition: '-',
			buildCount: '-',
			buildsRemaining: '-',
			sectionIndex: '-',
			sectionName: "(none)",
			notes: "",
			notesSnip: "(none)",
			mediaState: "stopped",
			mediaDuration: 0,
			mediaDurationFormatted: "--:--",
			mediaPosition: 0,
			mediaPositionFormatted: "--:--",
			mediaRemaining: 0,
			mediaRemainingFormatted: "--:--",
		});

	}
	// When module gets deleted
	async destroy() {
		await oscListener.close();
	}


	async configUpdated(config) {
		this.log('info', 'Config has changed, updating...')
		this.config = config
		this.log('info',`Now sending OSC actions to ${this.config.remotehost}:${this.config.remoteport}`);
		await oscListener.close();
		oscListener.connect(this);
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
	updatePresetDefinitions() {
		UpdatePresetDefinitions(this)
	}


}

runEntrypoint(ModuleInstance, UpgradeScripts)
