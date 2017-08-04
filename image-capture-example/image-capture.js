(function() {
  function ImageCapture() {
  }

  window.ImageCapture = ImageCapture;

  ImageCapture.init = function(config) {
    var imaging = new ImageCapture();
    imaging.config = config;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 320, max: 640 },
            height: { min: 400, max: 480 }
          }
      }).then(function(stream) {
        var videoEl = imaging.config.videoEl;
        videoEl.controls = false;
        videoEl.src = URL.createObjectURL(stream);
      }).catch(function(err) {
        config.errorCallback(err);
      });

      imaging.canvasEl = createCanvasEl(imaging.config.height, imaging.config.width);

    } else config.errorCallback(new Error('Imaging not supported'));
    return imaging;
  };

  ImageCapture.prototype.capture = function(callback) {
    var dataURL;
    this.canvasEl.getContext('2d').drawImage(this.config.videoEl, 0, 0);
    dataURL = this.canvasEl.toDataURL('image/jpeg', 1);
    callback(dataURL);
  };

  function createCanvasEl(height, width) {
    var canvasEl = document.createElement('canvas');
    canvasEl.setAttribute('height', height);
    canvasEl.setAttribute('width', width);
    canvasEl.style.display = 'none';
    document.body.appendChild(canvasEl);
    return canvasEl;
  }

}());
