const fetch = require('node-fetch')
const Bluebird = require('bluebird')
const fs = require('fs')
fetch.Promise = Bluebird

function get_link(){
    fetch('http://127.0.0.1:4040/api/tunnels')
    .then(data => data.json())
    .then(body => {

      fs.writeFile(`link.json`, `
{
    "link":"${body['tunnels'][0]['public_url']}"
}`, (err, data)=>{


        })

    })
}
module.exports = get_link

