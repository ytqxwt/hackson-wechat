var app = getApp();
const io = require('../../utils/weapp.socket.io.js');
var socket
Page({
  data: {
    message: null,
    test:''
  },
  onTap() {
    socket = (this.socket = io(
      'ws://localhost:9000',
    ))
    console.log(this.socket)
    this.socket.on('connect', function () {
      console.log('You joined')
    })

    this.socket.on('connect_error', function (d) {
      console.log(`connect_error: ${d}`)
    })

    //测试room
    this.socket.emit("message", "hello", function (d) { console.log(d) })
    this.socket.emit("broadcast", "hello", function (d) { console.log(d) })
    this.socket.on("broadcast",  function (d) { console.log(d) })
  },
  bind(e){
    console.log(e)
  },
})
