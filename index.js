const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.set('views', './views')

app.set('view engine', 'ejs')

const USERS = []

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/files/homepage.html")
})

app.get("/users",(req, res)=>{
    res.json(USERS)
})

app.get("/signin", (req, res)=>{
    res.sendFile(__dirname+"/files/signin.html")
})

app.get("/signup", (req, res)=>{
    res.sendFile(__dirname+"/files/signup.html")
})

app.get("/log-out", (req, res)=>{
    res.sendFile(__dirname+"/files/signin.html")
})

app.post("/get-data", (req, res) => {
    const { email, password } = req.body;
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
        // res.send(`Welcome back <b>${user.firstName} ${user.lastName}</b>`);
        res.render('profile',{user})
    } else {
        res.status(401).send("Invalid email or password");
    }
});

app.post("/update-data", (req, res)=>{
    const {firstName, lastName, email, number, password, confirmPassword} = req.body;
    const user = {firstName, lastName, email, number, password, confirmPassword}
    USERS.push(user)
    res.render('profile',{user})
})

app.listen(5000, ()=>{
    console.log("server running on 5000")
})