const mongoose = require('mongoose');
const slug  = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: {type:Number,},
    name: {type: String, require:true, maxLength: 255},
    description: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    videoId: {type: String, require:true,},
    level: {type:String},
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    slug: { type: String, slug: 'name', unique: true }
  }, {
    _id: false,
    timestamps: true,
  });

  // Add plugins
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
  deleteAt:true,
  overrideMethods: 'all' })
module.exports = mongoose.model('Course', CourseSchema);