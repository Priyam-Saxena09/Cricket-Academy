const express = require("express")
require("./connection")
const user = require("./schema")
const regis = require("./schema2")
const port = process.env.PORT || 3000
const app = express()
const hash = require("bcryptjs")
app.use(express.static("./static"))
app.set("view engine","hbs")
var login = "";
app.set("views",(__dirname,"./public"))
app.use(express.urlencoded())
app.get("",(req,res) => {
    res.render("login",{})
})

app.get("/signup",(req,res) => {
    res.render("signup",{})
})

app.post("/reg",async(req,res) => {
    req.body.password = await hash.hash(req.body.password,8)
    const User = await new user(req.body)
    User.save().then(() => {
        res.render("login",{})
    }).catch(() => {
        res.render("404",{
            "error":"User already exist.Sign up with a new email.",
            "back":"/signup"
        })
    })
})

app.get("/get",async(req,res) => {

    const Use = await user.find({"email":req.query.email})
    if(JSON.stringify(Use) != "[]")
    {
        const match = await hash.compare(req.query.password,Use[0].password)
        if(!match)
        {
            res.render("404",{
                "error":"User not found.Please sign up first.",
                "back":"/"
            })
        }
        else
        {
            login = Use[0].email;
            res.render("index",{"name":Use[0].name})
        }
    }
    else
    {
        res.render("404",{
            "error":"Please fill all the details.",
            "back":"/"
        })
    }
})

app.get("/register",(req,res) => {
    res.render("register",{})
})

app.get("/fill",async(req,res) => {
    if(login!="")
    {
    const User = await user.find({"email":login})
    res.send({
        "em":User[0].email,
        "nm":User[0].name
    })
}
})

app.post("/submit",async(req,res) => {
    const use = await new regis(req.body)
    const User = await user.find({"email":login})
    use.save().then(() => {
        res.render("thanku",{})
    }).catch(() => {
        res.render("404",{
            "error":"Already registered,or you have not filled all the details.",
            "back":"/register"
        })
    })
})

app.get("/inst",(req,res) => {
    res.render("inst",{})
})
app.get("/about",(req,res) => {
    res.render("about",{})
})

app.get("/contact",(req,res) => {
    res.render("contact",{})
})

app.get("/logout",(req,res) => {
    login = "";
    res.render("login",{})
})

app.listen(port,() => {
    console.log("Server is running on Port " + port)
})