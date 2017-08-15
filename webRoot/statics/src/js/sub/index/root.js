/**
 *description:根据条件查询svn日志文件
 *author:fanwei
 *date:2014/12/08
 */
define(function(require, exports, module){
	
	require('../../driver/global');
	var calendar = require('../../widget/form/calendar');

	var Root = R.Class.create(R.util, {

		initialize: function() {
		
			this.oRootInput = $('[root]');
			this.oTip = $('[input-tip]');
			this.oRootBtn = $('[root-btn]');
			this.oHistoryWrap = $('[history-wrap]');
			this.oHistory = $('[history]');
			this.oDirWrap = $('[dir]');
			this.oDirBtn = $('[dir-btn]');
			this.oClear = $('[clear-cache]');
		},
		start: function() {

			this.events();
			this.showCalendar();
			this.startLoadDir();
		},
		startLoadDir: function() {

			var lastSelect = localStorage.lastSelect;

			if(lastSelect) {
				this.oHistory[0].selectedIndex = lastSelect;
			}

			var startDir = this.oHistory.val();

			if(startDir) {
				this.selectHistory(startDir);
			}

		},
		judgeLoadDirData: function(rootStr) {

			this.reqData(rootStr);

		},
		showCalendar: function() {

			var oCalendar = new calendar({
				ele : '[time]'
			});

		},
		events: function() {

			var _this = this;

			//查询子目录
			this.oDirBtn.on('click', function(){

				var rootStr = _this.oRootInput.val();
				_this.judgeLoadDirData(rootStr);

			});

			//清除缓存
			this.oClear.on('click', function(){

				_this.clearCache();

			});

			$(document).on('click', '[linker]', function(){

				_this.reqDetail($(this));

			});

			$(document).on('change', '[history]', function(){

				var nowRoot = $(this).val();

				if(nowRoot) {

					localStorage.lastSelect = $(this)[0].selectedIndex;
					_this.selectHistory(nowRoot);	

				}

			});

		},
		selectHistory: function(rootStr) {

			this.oRootInput.val(rootStr);
			this.reqData(rootStr);

		},
		reqDetail: function(oThis) {

			var _this = this;
			var file = oThis.attr('linker');
			var shortFile = oThis.text();
			var param = {
				file: file
			};

			$.getJSON('/getDetail', param, function(data){

				if(data.err) {
					alert('获取数据失败');
				} else {
					data.shortFile = shortFile;
					data.file = file;
					_this.onBackDetail && _this.onBackDetail(data);
				}

			});

		},
		reqData: function(rootStr) {

			this.onBeforeSearchDir && this.onBeforeSearchDir();

			var param = {
				rootStr: rootStr
			};
			var dirData,
				_this,
				backData;

			_this = this;

			$.getJSON('/showRoot', param, function(data){
				
				if(data.err) {

					alert(data.msg);

				} else {

					backData = data.data.root;
					_this.onDir && _this.onDir(backData);

					if(!data.repeat) {
						_this.appendOption(_this.oHistory, rootStr);
					}
					
					_this.onEndSearchDir && _this.onEndSearchDir();

				}

			});

		},
		clearCache: function() {

			$.getJSON('/clear', function(data){

				alert(data.msg);

			});

			this.oHistoryWrap.hide();
			this.oTip.hide();

		},
		appendOption: function(oWrap, rootStr) {

			var oOption = $('<option value='+ rootStr +'>'+ rootStr +'</option>');
			oWrap.append(oOption);
			var num = oWrap.children().length - 1;
			oWrap[0].selectedIndex = num;
			localStorage.lastSelect = '';

		}

	});
	
	module.exports = Root;

});