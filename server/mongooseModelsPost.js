const mongoose = require('mongoose');
//const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	body: {
		type: Schema.Types.Mixed,
		default: 'POST'
	},

	title: {
    type: String,
    required:true
	},
	user: {
		type: Schema.Types.ObjectId ,
		ref: 'User'
	}
},{ timestamps: { createdAt: 'postDate' } });

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

module.exports = mongoose.model('Post', PostSchema);
