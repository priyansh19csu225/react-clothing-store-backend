const jwt = require("jsonwebtoken");
module.exports = {
  secret: process.env.SECRET,
  generateToken(emailid,Id,role) {
    
    let tokenId = jwt.sign({ useremail: emailid, userid: Id , useradmin: role }, this.secret, {
      expiresIn: "1d",
    });
    return tokenId;
  },
  returnToken(tokenId){
      let decode = jwt.verify(tokenId, process.env.SECRET ); 
      return decode.userid;
  },
  returnEmail(tokenId){
    let decode = jwt.verify(tokenId, process.env.SECRET ); 
    return decode.useremail;
  },
  verifyToken(tokenId) {
    try {
      let decode = jwt.verify(tokenId, this.secret);
      console.log(decode);
      if (decode && decode.userid) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("VERIFY TOKEN ", err);
      return false;
    }
  },
  verifyTokenAndAuthorization(tokenId) {
    try {
      let decode = jwt.verify(tokenId, this.secret);
      console.log(decode);
      if (decode && decode.userid || decode.useradmin == "true" ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("VERIFY TOKEN ", err);
      return false;
    }
  },
  verifyTokenAndAdmin(tokenId) {
    try {
      let decode = jwt.verify(tokenId, this.secret);
      console.log(decode);
      console.log("reaching");
      if (decode.useradmin == "true" ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("VERIFY TOKEN ", err);
      return false;
    }
  },
};
