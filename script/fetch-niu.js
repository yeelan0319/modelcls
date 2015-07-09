var http = require('http');
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
var config = require('../config/config');

// Establish mongo connection and load model
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
require('../app/models/niuRepair');

// Get model variable to be used
var NiuRepair = mongoose.model('NiuRepair');
// var startCronJob = function(){
// 	schedule.scheduleJob({hour: 0, minute: 0, dayOfWeek: 1}, updateNiuRepair);
// }
// startCronJob();
updateNiuRepair();

function updateNiuRepair(){
	queryProvince(function(){
		console.log('Updated XiaoNiu Repair List at ' + new Date());
	});
}

function queryProvince(callback){
	http.get('http://cms.niu.com/news/index.php?a=all&c=Api', function(res) {
		var result = '';
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			result += chunk;
		});
		res.on('end', function() {
			result = JSON.parse(result);
			async.each(result.data, queryCity, function(err){
				if(err){
					return console.log(err);
				}
				callback();
			});
		});
	});
}

function queryCity(province, callback) {
	http.get('http://cms.niu.com/news/index.php?catid=' + province.id + '&a=son&c=Api', function(res) {
		var result = '';
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			result += chunk;
		});
		res.on('end', function() {
			result = JSON.parse(result);
			async.each(result.data, queryShop, function(err){
				if(err){
					return callback(err);
				}
				callback(null);
			});
		});
	});
}

function queryShop(city, callback){
	http.get('http://cms.niu.com/news/index.php?catid=' + city.id + '&type=weixiu&a=all_arc&c=Api', function(res) {
    var result = '';
    var province = '';
    var city = '';
    var shoplist = [];
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        result += chunk;
    });
    res.on('end', function() {
    	result = JSON.parse(result);
    	//pre-process the data here.
    	//1. Fill the city and province name
    	//2. Remove the newline symbol
    	for(var i = 0; result.data && i < result.data.length; i++){
    		var shop = result.data[i];
    		if(!province && shop.province) {
	    		province = shop.province.replace(/\r?\n|\r/g, '');
	    	}
	    	if(!city && shop.city) {
	    		city = shop.city.replace(/\r?\n|\r/g, '')
	    	}
	    	if(city && province) {
	    		break;
	    	}
    	};
    	_.each(result.data, function(shop){
    		shoplist.push({
    			id: shop.id,
    			name: shop.title.replace(/\r?\n|\r/g, ''),
    			province: province,
    			city: city,
    			address: shop.yingyedizhi? shop.yingyedizhi.replace(/\r?\n|\r/g, '') : '',
    			owner: shop.xingming? shop.xingming.replace(/\r?\n|\r/g, '') : '',
    			phone: shop.lianxidianhua? shop.lianxidianhua.replace(/\r?\n|\r/g, '') : '',
    			ctime: shop.inputtime,
    			utime: shop.updatetime
    		});
    	});
    	async.each(shoplist, updateDatabase, function(err){
    		if(err) {
    			return callback(err);
    		}
    		callback(null);
    	});
    });
  });
}

function updateDatabase(shop, callback){
	NiuRepair.findById(shop.id, function(err, record){
		if(err){
			return callback(err);
		}

		if(!record){
			var record = new NiuRepair(shop);
			record.save(function(err){
				if(err){
					return callback(err);
				}
				callback(null);
			});
		}
		else{
			//compare if any data has been updated
			callback(null);
		}
	});
}