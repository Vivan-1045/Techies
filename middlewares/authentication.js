const {verifyUserToken} =require('../services/authentication')

function CheckForAuthenticationCookie(cookiename){
    return (req,res,next) =>{
      const tokencookievalue = req.cookies[cookiename];
      if(!tokencookievalue){
        return next();
      }
      try {
        const userPayload = verifyUserToken(tokencookievalue)
        req.user = userPayload        
      } catch (error) {}

       return next();
    }
}

module.exports = {
    CheckForAuthenticationCookie,
}