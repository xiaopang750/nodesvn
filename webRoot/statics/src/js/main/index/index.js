/**
 *description:svn日志生成
 *author:fanwei
 *date:2014/12/08
 */
define(function(require, exports, module){
	
	require('../../driver/global');
	var Root = require('../../sub/index/root');
	var List = require('../../sub/index/list');
	var Dir = require('../../sub/index/dir');
	var Loading = require('../../sub/index/loading');
	var Build = require('../../sub/index/build');

	var Index = R.Class.create(R.util, {

		initialize: function() {
			
		},
		start: function() {

			this.events();
			oRoot.start();
			

		},
		events: function() {

			oRoot.onBeforeSearchDir = function() {

				oLoading.show();
				oLoading.text('遍历目录中，请耐心等待...');
			};

			oRoot.onEndSearchDir = function() {
				oLoading.hide();	
			};

			//load-root
			oRoot.onDir = function(data){
				//console.log(data);
				oDir.oTree.innerHTML = '';
				oDir.makeRootDir(oDir.oTree, data.children); 
				//console.log(data);
			};

			//load-file
			oRoot.onBackDetail = function(data) {

				oList.loadList({data: data});

				oBuild.judgeShow();

			};

			//remove-list
			oList.onRemove = function() {

				oBuild.judgeShow();

			};

		}
	});

	
	var oRoot = new Root();
	var oList = new List();
	var oDir = new Dir();
	var oLoading = new Loading();
	var oBuild = new Build();
	var oIndex = new Index();
	oIndex.start();
	//oDir.start();

});