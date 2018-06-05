const {Http2Debug } = require('../../src/index');

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));


describe('Http2Debug' , ()=>{
    it('Should listen' , ()=>{
        const http2Debug = new Http2Debug();
        http2Debug.createServer();
        
        http2Debug.stopServer();
    })
})