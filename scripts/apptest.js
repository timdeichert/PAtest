if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(function() {
      console.log('SW registered');
    });
}

function getConnection() {
  return navigator.connection || navigator.mozConnection ||
    navigator.webkitConnection || navigator.msConnection;
}

function updateNetworkInfo(info) {
  document.getElementById('networkType').innerHTML = info.type;
  document.getElementById('effectiveNetworkType').innerHTML = info.effectiveType;
  document.getElementById('downlinkMax').innerHTML = info.downlinkMax;
}

var info = getConnection();
if (info) {
  info.onchange = function (event) {
    updateNetworkInfo(event.target);
  }
  updateNetworkInfo(info);}


  document.getElementById('result').innerHTML = navigator.deviceMemory 