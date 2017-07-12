/**
 * switch target DOMElement to fullscreen mode.
 * @param element {Element} DOMElement that you want to make fullscreen.
 * @param callback {Function} callback function after calling fullscreen api.
 */
function switchFullscreen(element, callback) {
  if (!isFullscreen()) {
    enterFullscreen(element);
    fullScreenChange(function(event) {
      if (isFullscreen()) {
        callback(true);
      } else {
        callback(false);
      }
    });
  } else {
    exitFullscreen(element);
  }
}

/**
 * check whether fullscreen or not.
 * @returns {boolean}
 */
function isFullscreen() {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    return false;
  }
  return true;
}

/**
 * enter fullscreen mode.
 * @param {Element} element
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.parentElement.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  }
}

/**
 * exit fullscreen mode.
 * @param {Element} element
 */
function exitFullscreen(element) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * injection function to onfullscreenchange.
 * @param callback
 */
function fullScreenChange(callback) {
  if (document.fullscreenEnabled) {
    document.addEventListener('fullscreenchange', callback);
  } else if (document.mozFullScreenEnabled) {
    document.onmozfullscreenchange = callback;
  } else if (document.webkitFullscreenEnabled) {
    document.addEventListener('webkitfullscreenchange', callback);
  } else if (document.msFullscreenEnabled) {
    document.addEventListener('msfullscreenchange', callback);
  }
}

export default switchFullscreen;
