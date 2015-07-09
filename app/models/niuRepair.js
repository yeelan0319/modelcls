/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var NiuRepairSchema = new Schema({
	id: { type: String, default: ''},
	name: { type: String, default: '' },
	province: { type: String, default: '' },
	city: { type: String, default: '' },
	address: { type: String, default: '' },
	owner: { type: String, default: '' },
	phone: { type: String, default: '' },
	ctime: { type: Date, default: Date.now() },
	utime: { type: Date, default: Date.now() }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

NiuRepairSchema.methods = {
	find: function(id, cb){
		this.findOne({id: id})
			.exec(cb);
	}
};

/**
 * Statics
 */
NiuRepairSchema.statics.list = function(cb){
	this.find({}, function(error, list){
      cb(error, list);
  });
};
NiuRepairSchema.statics.findById = function(id, cb){
	this.findOne({id: id})
		.exec(cb);
};

/**
 * Register
 */

mongoose.model('NiuRepair', NiuRepairSchema);
