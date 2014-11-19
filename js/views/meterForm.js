NoiseViolator.Views.MeterForm = Backbone.View.extend({
	template: _.template(
		"<label for='cell-number'>Cellphone Number:</label>" +
		"<input id='cell-number' type='tel'>" +
		"<label for='threshold'>Threshold</label>" +
		"<input type='range'>" +
		"<input type='submit'>" +
		"<meter></meter>"
	),

	className: 'threshold',

	_setContext: function() {
		try {
		  window.AudioContext = window.AudioContext || window.webkitAudioContext;
		  window.audioContext = new AudioContext();
		} catch (e) {
		  alert('Web Audio API not supported.');
		}
	},

	_getUserMedia: function() {
		navigator.getUserMedia = navigator.getUserMedia ||
		  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		},

	render: function() {
		this.$el.html(this.template);
		// run code to start monitoring
		return this;	
	}
})