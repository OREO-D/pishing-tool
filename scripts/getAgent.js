function getAgent(req){
  return req.get('user-agent')
}
module.exports = getAgent
