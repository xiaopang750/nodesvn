var Client = require('svn-spawn');
var express = require('express');
var template = require('art-template/node/template.js');
var getRootTree = require('root')();
var filter = require('filter');
var getlog = require('getlog');
var app = express();
var open = require('open');
app.use(express.urlencoded());
app.use(express.bodyParser({
limit: 1000000  //1m
}));


app.use(express.json());
var client = new Client();
var xlsx = require('node-xlsx');
var fs = require('fs');
var Spawn = require('easy-spawn');
spawn = new Spawn();




//set
template.config('extname', '.html');
template.config('cache', false);
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(express.static(__dirname + '/webRoot'));

/*var persons = {persons:[
	{
		id: 'sa',
		name: '杨瑞'
	},
	{
		id: 'yangzq',
		name: '杨钟淇'
	},
	{
		id: 'yanjuan',
		name: '严娟'
	},
	{
		id: 'xucheng',
		name: '徐成'
	},
	{
		id: 'liuliang',
		name: '刘亮'
	},
	{
		id: 'lipei',
		name: '李佩'
	},
	{
		id: 'fanwei',
		name: '范为'
	},
	{
		id: 'nijc',
		name: '倪建春'
	},
	{
		id: 'wangdx',
		name: '王东新'
	},
	{
		id: 'huangxx',
		name: '黄行星'
	},
	{
		id: 'zhanghx',
		name: '张红香'
	},
	{
		id: 'wangwc',
		name: '王维成'
	},
	{
		id: 'wangyy',
		name: '李国涛'
	}
]};*/

//show-page
var historyFileJson = 'history.json';
app.get('/', function(req, res){

	var history = fs.readFileSync(historyFileJson, 'utf8');
	var info = JSON.parse(history);
	info.data = info.data.reverse();
  	res.render('./index', info);
});

app.get('/test', function(req, res){

	res.render('./test');

});

//show-root
var arrSearchResult;
app.get('/showRoot', function(req, res){

  	var info = req.query;
  	var rootStr = info.rootStr;
  	var sPerson = info.sPerson;
  	var sTime = info.sTime;
  	var back = {};
  	var sBack;
  	
  	var isRoot = fs.existsSync(rootStr);

  	if(!isRoot) {
  		back.err = 1;
  		back.msg = '当前目录不存在，请重新输入';
  		sBack = JSON.stringify(back);
  		res.end(sBack);
  	}

  	var history = fs.readFileSync(historyFileJson, 'utf8');
	var hasedData = JSON.parse(history).data;
	var dataIndex = judge(hasedData, rootStr);

	if(dataIndex < 0) {

		getRootTree(rootStr, null, client, function(data, orgData, root){

			var searchParam = {
				date: sTime,
				author: sPerson
			};

			var info = filter(data, searchParam);
			var arrFile = info.files;
			var result = {};
			var sFiles = JSON.stringify(arrFile);
			result.files = rootStr;
			result.root = root;
			back.err = 0;
			back.data = result;
			sBack = JSON.stringify(back);

			fs.readFile(historyFileJson, function(err, data){

				var arrHistory = JSON.parse(data).data;
				var _reuslt = {};
				arrHistory.push(result);

				_reuslt.data = arrHistory;
				sResult = JSON.stringify(_reuslt);
				fs.writeFile(historyFileJson, sResult, function(err, data){

					res.end(sBack);

				});

			});


		});

	} else {

		back.err = 0;
		back.data = hasedData[dataIndex];
		back.repeat = 1;
		sBack = JSON.stringify(back);
		res.end(sBack);	
	}

	function judge(arr, insert) {

		var i,
			num;
		
		num = arr.length;
		
		for (i=0; i<num; i++) {
			
			var hasRoot = arr[i].files.toUpperCase();
			var upperInsert = insert.toUpperCase();
			if(hasRoot == upperInsert) {
				return i;
			}

		}

		return -1;	

	}


});

app.get('/getDetail', function(req, res){

	var info = req.query;
	var fileName = info.file;

	getlog(client, fileName, function(data){
		res.end(data);
	});

});	

app.get('/save', function(req, res){

	var info = req.query;
	var data = JSON.parse(info.data);

	var buffer = xlsx.build([{name: "", data: data}]);
	fs.writeFile('user.xlsx', buffer, 'binary', function(err, data){

		if(err) {
			res.end(err);
		} else {
			res.end("生成成功");
			open('user.xlsx');
		}

	});

});


app.get('/historyList', function(req, res){

	fs.readFile(historyFileJson, function(err, data){

		if(err) {
			res.end(err);
		} else {
			res.end(data);
		}

	});	

});


//清除历史记录
app.get('/clear', function(req, res){

	var orgData = {data:[]};
	var sOrgData = JSON.stringify(orgData);

	fs.writeFile(historyFileJson, sOrgData, function(err, data){

		var info = {};

		if(err) {
			info.err = 1;
			info.msg = err;
		} else {
			info.err = 0;
			info.msg = '清除成功';
		}

		res.end( JSON.stringify(info) );

	});

});

app.listen(7788);

open("http://localhost:7788");