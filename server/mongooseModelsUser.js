const mongoose =require("mongoose")
//const bcrypt = require('bcrypt')
const Schema= mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
   email:{
        type:String,
        required:true,
    },
  role:{
      type:String,
      default:"USER"
  },
  joinDate:{
    type:Date,
    default:Date.now
}
  
},{ timestamps: { createdAt: 'joinDate' } })

// UserSchema.pre('save', function(next){
//     if(!this.isModified('password')){
//         return next()
//     }
// bcrypt.genSalt(10,(err,salt)=>{
//     if(err) return next(err)
//     bcrypt.hash(this.password,salt,(err,hash)=>{
//         if(err) return next(err)
//         this.password =hash
//         next()
//     })
// })
//})

module.exports = mongoose.model('User',UserSchema)