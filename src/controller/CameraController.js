export class CameraController {

    constructor(videoEl) {

        this._videoEl = videoEl

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {

            this._stream = stream;
            this._videoEl.srcObject = new MediaStream(stream)
            this._videoEl.play();

        }).catch(err => {
            console.error(err)
        })
    }

    stop() {

        this._stream.getTracks().forEach(track => {
            track.stop();
        })
    }

    takePicture(mimeType = 'image/png') { //Extensão dessa foto

        let canvas = document.createElement('canvas') //gerando canvas

        canvas.setAttribute('height', this._videoEl.videoHeight) //Definindo as
        canvas.setAttribute('width', this._videoEl.videoWidth) // dimensões da foto

        let context = canvas.getContext('2d') //Definindo 2d

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height) //o que será desenhado no canvas


        return canvas.toDataURL(mimeType)


    }
}