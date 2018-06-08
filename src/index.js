
class Http2Debug{
    constructor(){
        this.setModules()
    }
    log(){
    }
    setModules(){
       this.tryToSetModule('http2');
       this.tryToSetModule('fs');
       this.tryToSetModule('os');
       this.tryToSetModule('path');
    }
    tryToSetModule(name){
        try{
            this[name] = require(name);
        }
        catch(err){
            console.error(`
            We cannot require('${name}').
            It might be that the Nodejs version you are using 
            Is not comptible with this module.
            Try to install the latest LTS Node version.
            `)
            throw new Error(`We couldn't require('${name}')`)
        }
    }
    getServerConfig(){
        const args = process.argv.splice(2);
        const userRequest = {};
        args
            .map(args => args.replace('--' , '').split("="))
            .forEach((pair)=>{
                userRequest[pair[0]] = pair[1];
            });

        const config = {
            port : parseInt( userRequest.port || process.env.HTTP2_PORT  || 8443),
            host : userRequest.host || process.env.HTTP2_HOST || '0.0.0.0',
            key : userRequest.key || userRequest.HTTP2_TLS_PRIVATE_KEY || (this.path.join(__dirname , '..' , 'assets' , 'key.pem')),
            cert : userRequest.cert || userRequest.HTTP2_TLS_CERT || (this.path.join(__dirname , '..' , 'assets' , 'cert.pem'))
        }
        return config;
        
    }
    createServer(cb){
        const config = this.getServerConfig();
        let i = 0;
        const server = this.http2.createSecureServer({
            key: this.fs.readFileSync(config.key),
            cert: this.fs.readFileSync(config.cert)
        });
        server.on('error', (err) => console.error(err));
        server.on('stream', (stream, headers) => {
            let body = '';
            stream.on('data' , (chunk)=>{
                body+=chunk;
            });
            stream.on('end' , (chunk)=>{
                if (chunk)
                    body+=chunk;

                stream.respond({
                    'content-type': 'text/html',
                    ':status': 200
                });
                const result = JSON.stringify({
                    hostname : this.os.hostname(),
                    headers,
                    body
                },null, 2);
                this.log(`<Request #${i++}>`,result )
                stream.end(result);
            })
            
        });

        this.serverSocket = server.listen(config.port , config.host , (err)=>{
            this.log(`http-debug should be working on https://${config.host}:${config.port}`);
            if (cb)
                cb(err);
        });
    }
    stopServer(){
        if (this.serverSocket)
            this.serverSocket.close();
        this.serverSocket = null;
    }
}


module.exports = {
    Http2Debug
}

