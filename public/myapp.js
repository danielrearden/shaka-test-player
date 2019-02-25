const manifestUri =
    'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd'
    // 'http://462e632b.ngrok.io/vod/mp4:CAIR.mp4/manifest.mpd'

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll()

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer()
  } else {
    // This browser does not have the minimum set of APIs we need.
    alert('Browser not supported!')
  }
}

function initPlayer() {
  // Create a Player instance.
  const video = document.getElementById('video')
  const player = new shaka.Player(video)

  player.configure({
    drm: {
      servers: {
        'com.widevine.alpha': 'https://widevine-dash.ezdrm.com/proxy?pX=FCB7FA'
      }
    }
  })

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player

  // Listen for error events.
  player.addEventListener('error', onErrorEvent)

  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!')
  }).catch(onError)  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail)
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error)
}

document.addEventListener('DOMContentLoaded', initApp)