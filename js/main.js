/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* global AudioContext, SoundMeter */

'use strict';

var instantMeter = document.querySelector('#instant meter');
var slowMeter = document.querySelector('#slow meter');
var clipMeter = document.querySelector('#clip meter');

var instantValueDisplay = document.querySelector('#instant .value');
var slowValueDisplay = document.querySelector('#slow .value');
var clipValueDisplay = document.querySelector('#clip .value');

try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  window.audioContext = new AudioContext();
} catch (e) {
  alert('Web Audio API not supported.');
}

// Put variables in global scope to make them available to the browser console.
var constraints = window.constraints = {
  audio: true,
  video: false
};

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function successCallback(stream) {
  // Put variables in global scope to make them available to the browser console.
  window.stream = stream;
  var soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
  soundMeter.connectToSource(stream);

  setInterval(function() {
    instantMeter.value = instantValueDisplay.innerText =
      soundMeter.instant.toFixed(2);
    slowMeter.value = slowValueDisplay.innerText =
      soundMeter.slow.toFixed(2);
    clipMeter.value = clipValueDisplay.innerText =
      soundMeter.clip;
  }, 200);
}

function checkForAlert(soundLevel) {
  // if soundLevel > threshold, add to violation array
  // else 
  // if size of violation array > 5 (1 second of violations), send an alert
    // if the size of the collection is less than 3 or the new violation is top3, 
      // add to topViolations collection
    // end
  // end
  // reset the array
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);