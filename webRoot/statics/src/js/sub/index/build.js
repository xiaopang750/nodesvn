/**
 *description:生成提交表格
 *author:fanwei
 *date:2014/12/10
 */
define(function(require, exports, module){
	
	var global = require("../../driver/global");
	
	var Build = R.Class.create(R.util, {

		initialize: function() {
			
			this.oBuild = $('[build]');
			this.events();

		},
		events: function() {

			var _this = this;

			this.oBuild.on('click', function(){

				_this.getData();

			});

		},
		show: function() {

			this.oBuild.show();

		},
		hide: function() {

			this.oBuild.hide();

		},
		judgeShow: function() {

			var nowSubList = $('[sub-list]');

			if(nowSubList.length) {

				this.show();

			} else {

				this.hide();

			}

		},
		getData: function() {

			var aList = $('[sub-list]');

			var i,
				num,
				nowList,
				oFile,
				oVersion,
				oName,
				oBug,
				oDescribe,
				oStatus,
				oDate,
				sFile,
				sVersion,
				sName,
				sBug,
				sStatus,
				sDate,
				sDescribe,
				result,
				sResult,
				codeLoc,
				code,
				titleArr;
			
			num = aList.length;
			result = [];
			code = "code_branch";
			titleArr = ['bug', '描述', '状态', '版本号', 'path', '提交人', '日期'];

			for (i=0; i<num; i++) {
				
				arr = [];
				nowList = aList.eq(i);
				oFile = nowList.find('[file]');
				oVersion = nowList.find('[version]');
				oName = nowList.find('[name]');
				oBug = nowList.find('[bug]');
				oDescribe = nowList.find('[describe]');
				oStatus = nowList.find('[status]');
				oDate = nowList.find('[time]');
				sFile = oFile.attr('file');
				sVersion = oVersion.val();
				sName = oName.val();
				sBug = oBug.val();
				sStatus = oStatus.val();
				sDate = oDate.val().replace(/\-/g, '\/');
				sDescribe = oDescribe.val();
				codeLoc = sFile.indexOf(code) + code.length + 1;
				sFile = sFile.substring(codeLoc).replace(/\\/gi, '\/');

				arr.push(sBug);
				arr.push(sDescribe);
				arr.push(sStatus);
				arr.push(sVersion);
				arr.push(sFile);
				arr.push(sName);
				arr.push(sDate);
				result.push(arr);

			}

			result.unshift(titleArr);
			sResult = JSON.stringify(result);

			$.get('/save', {data: sResult}, function(msg){

				alert(msg);

			});	

		}

	});

	module.exports = Build;
	
});