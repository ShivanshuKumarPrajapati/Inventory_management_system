const mongoose = require('mongoose');
const crypto =require('node:crypto');
const { v4: uuidv4 } = require('uuid')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    encry_password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    salt:String
}, { timestamps: true });

userSchema.virtual('password')
    .set(function (plainpassword) {
        this._password = plainpassword,
        this.salt = uuidv4();
        this.encry_password = this.securePassword(plainpassword);
    })
    .get(function () {
        return this._password;
    }, { timestamps: true });


userSchema.methods = {
    securePassword: function(plainpassword) {
         if (!plainpassword) return "";
         try {
           return crypto
             .createHmac("sha256", this.salt)
             .update(plainpassword)
             .digest("hex");
         } catch (error) {
           return "";
         }
    },

    Authenticate: function (plainpassword) {
        return this.encry_password === this.securePassword(plainpassword);
    }
}


const User = mongoose.model('User', userSchema);

module.exports = User;