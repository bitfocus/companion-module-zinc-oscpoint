const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const UpdatePresetDefinitions = require('./presets')
const oscListener = require('./osc-listener')
const configFields = require('./config')
const variableDefaults = require('./variable-defaults')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		this.files = []
		this.fileIndex = 0
		this.fileCount = 0
		this.presentations = []
		this.presentation = {}
		this.presentationIndex = 0
		this.presentationCount = 0
		this.log('info', `OSCPoint module started`)
		this.log('info', `Sending OSC actions to ${this.config.remotehost}:${this.config.remoteport}`)
		this.updateStatus(InstanceStatus.Connecting, `Connecting to port ${this.config.localport}...`)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updatePresetDefinitions() // export preset definitions
		oscListener.connect(this)

		//set some defaults for the variables
		this.setVariableValues(variableDefaults)
	}

	// When module gets deleted
	async destroy() {
		await oscListener.close()
	}

	async configUpdated(config) {
		this.config = config
		this.log('info', 'Config has changed, updating...')
		this.log('info', `Now sending OSC actions to ${this.config.remotehost}:${this.config.remoteport}`)
		this.updateStatus(InstanceStatus.Connecting, 'Reconnecting...')

		await oscListener.close()
		oscListener.connect(this)
	}

	// Return config fields for web config
	getConfigFields() {
		return configFields
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
