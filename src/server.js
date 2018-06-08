const {Http2Debug} = require('../src/index');
const http2Debug = new Http2Debug();
http2Debug.log = function(){
    console.log(...arguments);
}
http2Debug.createServer();
module.exports = http2Debug;