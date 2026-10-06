const jwt = require("jsonwebtoken");
const secret = "V12@45$";


function setUser(user){
    const payload = user.toObject ? user.toObject() : user;
    return jwt.sign(payload, secret);
}   

function getUser(token){
    if (!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {

    setUser,
    getUser,

}