const { Schema, model } = require("mongoose");
const { createHmac,randomBytes } = require("crypto");
const { CreateTokenForUser} = require('../services/authentication')
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pwd: {
      type:String ,
      required: true,
    },
    salt: {
      type: String,
    },
    userProfileUrl: {
      type: String,
      default: "/images/user-avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

//Method for Hashing the user credentials like password , card details etc
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("pwd")) return;

  const salt = randomBytes(16).toString();
  const hashedpwd = createHmac("sha256",salt).update(user.pwd).digest('hex');

  user.salt = salt;
  user.pwd= hashedpwd;
  next();
});

//virtual function or static method to verify the user credentials
userSchema.static('VerifyPwdGenerateToken', async function(email,pwd){
  const user = await this.findOne({email})
  if(!user) throw new Error('User not found')

  
  const salt = user.salt;
  const HashedPwd = user.pwd;

  
  const ProvidedHashedPwd =  createHmac("sha256",salt).update(pwd).digest("hex");
  if(HashedPwd !== ProvidedHashedPwd) throw new Error('Wrong Password')
  
  const token = CreateTokenForUser(user)
  return token
})

const User = model("user", userSchema);

module.exports = User;


