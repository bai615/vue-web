/*
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('../db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
*/

var express = require('express')


var port = 3000

var apiServer = express()
var bodyParser = require('body-parser')

apiServer.use(bodyParser.urlencoded({ extended: true}))
apiServer.use(bodyParser.json())

var apiRouter = express.Router()
var fs = require('fs')
apiRouter.get('/', function (req, res) {
  res.json({ message: 'welcome to api server!'})
});

apiRouter.route('/:apiName')
  .all(function (req, res) {
    fs.readFile('../db.json', 'utf8', function (err, data) {
      if(err) throw  err
      var data = JSON.parse(data)
      if(data[req.params.apiName]) {
        res.json(data[req.params.apiName])
      }else {
        res.send('no such api name')
      }
    })
  })

apiServer.use('/api', apiRouter);

module.exports = apiServer.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
