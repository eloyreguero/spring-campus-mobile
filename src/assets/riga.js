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