const { User } = require("../models/user");
const { v4 : uuidv4 } = require("uuid")

const {

    setUser,
    getUser,

} = require("../service/auth");

async function handleUserSignUp(req, res){

    const { name, email, password } = req.body;

    // Validations if needed

    await User.create({

        name: name,
        email: email,
        password: password,

    });

    return res.status(201).redirect("/");
}

async function handleUserLogin(req, res){


    const { name, password } = req.body;

    const user = await User.findOne({
        name: name,
        password: password,
    })

    if (!user) return res.render("login", {
        error: "Invalid Username or Password",
    });


    const token = setUser(user);

    res.cookie("uid", token);
    return res.status(200).redirect("/");

}


module.exports = {

    handleUserSignUp,
    handleUserLogin,

}