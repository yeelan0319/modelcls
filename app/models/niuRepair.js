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
  provinceId: { type: String, default: '' },
  cityId: { type: String, default: '' },
  name: { type: String, default: '' },
  address: { type: String, default: '' },
  owner: { type: String, default: '' },
  phone: { type: String, default: '' },
  ctime: { type: Date, default: Date.now() },
  utime: { type: Date, default: '' }
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

NiuRepairSchema.method({

});

/**
 * Statics
 */

NiuRepairSchema.static({

});

/**
 * Register
 */

mongoose.model('NiuRepair', NiuRepairSchema);
