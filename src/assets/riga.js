// Load url
function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    script.onload = function () {
        callback();
    };
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    document.getElementById("loader").style.display = "none";
}

// Use Camera
function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

var theStream;

function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = {
        video: true
    };

    getUserMedia(constraints, function (stream) {
        var mediaControl = document.querySelector('video');
        if ('srcObject' in mediaControl) {
            mediaControl.srcObject = stream;
            mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
        } else if (navigator.mozGetUserMedia) {
            mediaControl.mozSrcObject = stream;
        }
        theStream = stream;
    }, function (err) {
        alert('Error: ' + err);
    });
}

function takePhoto() {
    if (!('ImageCapture' in window)) {
        alert('ImageCapture is not available');
        return;
    }

    if (!theStream) {
        alert('Grab the video stream first!');
        return;
    }

    var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

    theImageCapturer.takePhoto()
        .then(blob => {
        var theImageTag = document.getElementById("imageTag");
    theImageTag.src = URL.createObjectURL(blob);
})
.catch(err => alert('Error: ' + err));
}


// Vibrate
function vibrateSimple() {
    navigator.vibrate(200);
}

function vibratePattern() {
    navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]); // SOS in Morse
}