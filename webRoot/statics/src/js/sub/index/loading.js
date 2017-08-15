/**
 *description:loading
 *author:fanwei
 *date:2014/12/9
 */
define(function(require, exports, module){
	
	var global = require("../../driver/global");
	
	var Loading = R.Class.create(R.util, {

		initialize: function() {
			
			this.oLoading = $('[shadow]');
			this.oLoadingText = $('[loading-text]');
			
		},
		show: function() {
			this.oLoading.show();
		},
		hide: function() {
			this.oLoading.hide();
		},
		text: function(str) {
			this.oLoadingText.html(str);
		}

	});

	module.exports = Loading;
	
});