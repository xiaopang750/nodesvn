/**
 *description:获取查询后的文件列表
 *author:fanwei
 *date:2014/12/8
 */
define(function(require, exports, module){
	
	var global = require("../../driver/global");
	var oTplList = require('../../tpl/list');

	var List = R.Class.create(R.util, {

		initialize: function() {
			
			this.oListWrap = $('[list-wrap]');
			this.events();
			
		},
		loadList: function(data) {

			this.render(this.oListWrap, oTplList, data, 'append');

		},
		events: function() {

			var _this = this;

			$(document).on('click', '[list-remove]', function(){

				_this.remove($(this));

			});

		},
		remove: function(oThis) {

			var oList = oThis.parents('[sub-list]');
			oList.remove();
			this.onRemove && this.onRemove();

		}

	});

	module.exports = List;

});