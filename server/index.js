const express = require("express");
const fs = require('fs');
let emailData = require('../data/dataEmail.json');
let dataUser = require('../data/dataUser.json');
const PORT = process.env.PORT || 3080;

const app = express();

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.get("/getEmail", (req, res) => {
    res.json(emailData);
});

app.post("/postEmail", async (req, res) => {
    let email = await req.body.email;
    emailData.push({ email: email });
    fs.writeFile("./data/dataEmail.json", JSON.stringify(emailData), function (err) {
        if (err) throw err;
        console.log('complete');
    });
    res.send(`Succed Subscribe Email is : ${email}`);
});

app.post('/login', async (req, res) => {
    let email = await req.body.email;
    let password = await req.body.password;
    const checkUser = dataUser.filter(item => email.includes(item.email) && password.includes(item.password));
    if (checkUser) {
        res.send(checkUser);
    }
    else {
        res.statusCode = 401;
        res.send("Username atau Password anda salah!");
    }
});

app.post('/register', async (req, res) => {
    let fname = await req.body.fname;
    let email = await req.body.email;
    let password = await req.body.password;
    let obj = {
        fname: fname,
        email: email,
        password: password,
        favoriteUniv: []
    }
    dataUser.push(obj);
    fs.writeFile("./data/dataUser.json", JSON.stringify(dataUser), function (err) {
        if (err) throw err;
        console.log('Register Success');
    });
    res.send(obj);
})

app.post('/addFavoriteUniv', async (req, res) => {
    let email = await req.body.email;
    let name = await req.body.name;
    let country = await req.body.country;
    let website = await req.body.website;
    let obj = {
        name: name,
        country: country,
        website: website
    }
    const index = dataUser.findIndex(item => email.includes(item.email));
    const check = dataUser[index].favoriteUniv.filter(item => name.includes(item.name));
    console.log(check);
    if(check.length > 0){
        res.statusCode = 401;
        res.send("University Already Exist In Your Favorite");
    }
    else {
        dataUser[index].favoriteUniv.push(obj);
        fs.writeFile("./data/dataUser.json", JSON.stringify(dataUser), function (err) {
            if (err) throw err;
            console.log('Add Data To Favorite Success');
        });
        res.send(obj);
    }
})

app.post('/listFavoriteUniv', async (req, res) => {
    let email = await req.body.email;
    const index = dataUser.findIndex(item => email.includes(item.email));
    res.send(dataUser[index].favoriteUniv);
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});