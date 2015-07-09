var mongoose = require('mongoose');
var NiuRepair = mongoose.model('NiuRepair');
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  res.render('home/index', {});
};

exports.fetchList = function(req, res) {
	NiuRepair.list(function(err, list){
    if(err) {
      return console.log("Something wrong");
    }
    console.log(list)
    res.json(JSON.stringify(list));
  });
}
