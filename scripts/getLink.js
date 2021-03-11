const fetch = require('node-fetch')
const Bluebird = require('bluebird')
fetch.Promise = Bluebird

function get_link(){
    fetch('http://127.0.0.1:4040/api/tunnels')
    .then(data => data.json())
    .then(body => console.log(`Pishing Link: ${body['tunnels'][0]['public_url']}`))
}
module.exports = get_link
