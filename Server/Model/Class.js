const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassSchema = new Schema({
    className : {
        type : String,
    },
    classSection : {
        type : String
    },
    classDatePost : {
        type : Date , default : Date.now()
    },
    classStatus : {
        type : String , default : "Active"
    },
    classLevel : {
        type : Number
    },
    classColor : {
        type : String 
    },
    file:{
        type:String,
        default:
        "https://i.ibb.co/KryG66q/classroom.jpg",
    },
    fileType:{
        type:String
    },
    picture: {
        type: String,  
      },
      classOwner :{
        type: Schema.Types.ObjectId,
        ref : 'Teacher'
    },
    classUsers :[{
        type: Schema.Types.ObjectId,
        ref : 'Student'
    }],
})
module.exports = mongoose.model('Class', ClassSchema);