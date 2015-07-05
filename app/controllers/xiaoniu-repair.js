
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  res.render('home/index', {
  	list: [{
  			id: '0101',
  			provinceId: '01',
  			cityId: '01',
  			name: '爱玛电动车',
  			address: '龙岩市新罗区西安南路东亚商场一楼',
  			owner: '林少英',
  			phone: '13599332006',
  			ctime: Date.now(),
  			utime: Date.now()
  	},
  	{
  			id: '0101',
  			provinceId: '01',
  			cityId: '01',
  			name: '爱玛电动车',
  			address: '龙岩市新罗区西安南路东亚商场一楼',
  			owner: '林少英',
  			phone: '13599332006',
  			ctime: Date.now(),
  			utime: Date.now()
  	},
  	{
  			id: '0101',
  			provinceId: '01',
  			cityId: '01',
  			name: '爱玛电动车',
  			address: '龙岩市新罗区西安南路东亚商场一楼',
  			owner: '林少英',
  			phone: '13599332006',
  			ctime: Date.now(),
  			utime: Date.now()
  	}]
  });
};
