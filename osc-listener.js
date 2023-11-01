const osc = require('osc');

const oscListener = {
    close: async function () {
        await this.udpPort.close();
    },
    mediaDuration: 0,
    mediaPosition: 0,
    mediaRemaining: 0,
    connect: async function (self) {
        console.log("Connecting to OSCPoint")
        this.udpPort = new osc.UDPPort({
            localAddress: '0.0.0.0',
            localPort: self.config.localport,
            metadata: true,
        });

        this.udpPort.open();

        this.udpPort.on('ready', () => {
            self.log('info', `Listening to OSCPoint on port: ${self.config.localport}`)

            //send a refresh request to OSCPoint
            self.oscSend(self.config.remotehost, self.config.remoteport, `/oscpoint/feedbacks/refresh`, []);
        });

        this.udpPort.on('message', (oscMsg) => {
            this.processData(oscMsg, self)
        });

        this.udpPort.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                self.log('error', 'Error: Selected port in use.' + err.message)
            }
        });

    },

    processData: function (oscMsg, self) {
        console.log(oscMsg.address);
        const msgParts = oscMsg.address.split('/');
        if (msgParts[1] != 'oscpoint') return;
        const feedbackId = oscMsg.address.substring(9);
        //console.log(feedbackId);

        switch (feedbackId) {
            case `/presentation/name`:
                let fileName = oscMsg.args[0].value == "" ? "(none)" : oscMsg.args[0].value;
                self.setVariableValues({ presentationName: fileName });
                break;
            case `/presentation/slides/count`:
                self.setVariableValues({ slideCount: oscMsg.args[0].value });
                break;
            case `/slideshow/state`:
                console.log(oscMsg.args[0].value);
                self.setVariableValues({ state: oscMsg.args[0].value });
                break;
            case `/slideshow/currentslide`:
                self.setVariableValues({ currentSlide: oscMsg.args[0].value });
                break;
            case `/slideshow/builds/position`:
                self.setVariableValues({ buildPosition: oscMsg.args[0].value });
                break;
            case `/slideshow/builds/count`:
                self.setVariableValues({ buildCount: oscMsg.args[0].value });
                break;
            case `/slideshow/builds/remaining`:
                self.setVariableValues({ buildsRemaining: oscMsg.args[0].value });
                break;
            case `/slideshow/section/index`:
                self.setVariableValues({ sectionIndex: oscMsg.args[0].value });
                break;
            case `/slideshow/section/name`:
                let sectionName = oscMsg.args[0].value == "" ? "(none)" : oscMsg.args[0].value;
                self.setVariableValues({ sectionName: sectionName });
                break;
            case `/slideshow/notes`:
                let ns = oscMsg.args[0].value == "" ? "(none)" : `${oscMsg.args[0].value.substr(0,20)}...`;
                let notes = oscMsg.args[0].value == "" ? "(none)" : oscMsg.args[0].value;
                self.setVariableValues({
                    notes: notes,
                    notesSnip: ns,
                });
                break;
            case `/slideshow/media/state`:
                self.setVariableValues({ mediaState: oscMsg.args[0].value });
                break;

            //these three always come together, and mainly in this order, so we can risk batching the variable updates.
            case `/slideshow/media/duration`:
                this.mediaDuration = oscMsg.args[0].value;
                break;
            case `/slideshow/media/position`:
                this.mediaPosition = oscMsg.args[0].value;
                break;
            case `/slideshow/media/remaining`:
                this.mediaRemaining = oscMsg.args[0].value;
                self.setVariableValues({
                    mediaDuration: Math.floor(this.mediaDuration / 1000),
                    mediaDurationFormatted: this.convertToMmSs(this.mediaDuration),
                    mediaPosition: Math.floor(this.mediaPosition / 1000),
                    mediaPositionFormatted: this.convertToMmSs(this.mediaPosition),
                    mediaRemaining: Math.floor(this.mediaRemaining / 1000),
                    mediaRemainingFormatted: this.convertToMmSs(this.mediaRemaining),
                });
                break;
            default:
                console.log(`No action found for OSC ${oscMsg.address}`);
                break;
        }

    },
    convertToMmSs(msValue) {
        let seconds = Math.floor(msValue / 1000);
        let mm = Math.floor(seconds / 60).toString().padStart(2, '0');
        let ss = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${mm}:${ss}`;
    }
}


module.exports = oscListener;