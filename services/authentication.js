const JWT = require('jsonwebtoken')

const secert = 'rghjksdcvbndfghn'


//Token generating for user
function CreateTokenForUser(user){
    const payload = {
        fullName : user.fullName,
        _id : user._id,
        email : user.email,
        prouserProfileUrl : user.userProfileUrl,
        role : user.role
    }
    const token = JWT.sign(payload,secert);
    return token;
}

//for verification of tokens
function verifyUserToken(token){
    const payload = JWT.verify(token,secert);
    return payload
}


module.exports = {
    CreateTokenForUser,
    verifyUserToken
}