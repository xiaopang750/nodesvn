/**
 *description:获取目录结构
 *author:fanwei
 *date:2014/12/8
 */
define(function(require, exports, module){
	
	var global = require("../../driver/global");

	var Dir = R.Class.create(R.util, {

		initialize: function() {
			
			this.oTree = $('[tree]')[0];
			this.events();
			this.lastClickArr = this.getHistoryClick();
			
		},
		events: function() {

			var _this = this;

			$(this.oTree).on('click', '[root]', function(){

				_this.showNext($(this));

			});

		},
		showNext: function(oThis) {

			var oNextUl = oThis.next('ul');
			var isShow = oNextUl.is(':visible');
			var oEm = oThis.prev();
			var nowStr = oThis.text();

			if(isShow) {
				oEm.addClass('fa-folder-o');
				oEm.removeClass('fa-folder-open');
				oThis.removeClass('active');
				oNextUl.hide();
				this.reduceHistory(nowStr);
			} else {
				oEm.removeClass('fa-folder-o');
				oEm.addClass('fa-folder-open');
				oThis.addClass('active');
				oNextUl.show();
				this.addHistory(nowStr);
			}

		},
		makeRootDir: function(oWrap, arr) {

			var i,
				num,
				strList,
				sin,
				oLi,
				oUl;

			strList = '';
			num = arr.length;
			oUl = document.createElement('ul');

			for (i = 0; i < num; i++) {

				sin = arr[i];

				if(sin.root) {

					oLi = document.createElement('li');
					oLi.innerHTML = '<em class="fa fa-folder-o"></em><span root>'+ sin.root +'</span>';

				} else {

					oLi = document.createElement('li');
					oLi.innerHTML = '<a href="javascript:;" onclick="return false;" onfocus="this.blur()" linker='+ sin.name +'>'+ sin.fileName +'</a>';
				}

				oUl.appendChild(oLi);

				if(arr[i].children.length) {

					this.makeRootDir(oLi, arr[i].children);

				}

			}

			oWrap.appendChild(oUl);

		},
		getHistoryClick: function() {

			var arr = [];

			if(localStorage.lastClick) {

				arr = JSON.parse(localStorage.lastClick);

			}

			return arr;

		},
		saveHistoryClick: function(arr) {

			localStorage.lastClick = JSON.stringify(arr);

		},
		addHistory: function(name) {
			
			this.lastClickArr.push(name);
		},
		reduceHistory: function(name) {

			var i,
				num;
			
			num = this.lastClickArr.length;
			
			for (i=0; i<num; i++) {
				
				if(this.lastClickArr[i] == name) {

					this.lastClickArr.splice(i, 1);

				}

			}
			console.log(this.lastClickArr);	

		}

	});

	module.exports = Dir;

});