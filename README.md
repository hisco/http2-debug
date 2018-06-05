# HTTP2 debug

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

Debug http2 client requests

## Purpose
`http2-debug` will help you to understand if your are making http2 request from your service.
It acts as an http2 echo server.
It returns in the response body the following information:
  * Hostname (Whoami)
  * HTTP2 headers
  * HTTP2 body

With this information you will be able to see if the desired information was sent from your service.

It's also very helpful for HTTP2 load balancer testing.
You can use it to test kubernetes ingress / docker LB + http2.

## Local usage
Before testing please make sure your version of nodejs is support http2.
To check your node version run on your terminal / CMD the fllowing command:
```
node -v 
```
Http2 was added to Node.js only on later versions of >v8.5 .
If you need to upgrade or install Node.js got to:
[Download page of Node.js ](https://nodejs.org/en/download/)

Install this module
```
npm i http2-debug -g
```

Run the following command from any folder
```
http2-debug 
```

That's it you now have an HTTP2 server running with selfsigned certificate.
Don't forget to enable security notice.
By default server is lisening to 0.0.0.0:8443 .

## HTTP2 certificates
To enable fast debuging, this module comes with a self signed certificate.
To use it you must disable security warnings.
In Node.jd request client just set the following options `rejectUnauthorized` to false.

Detailed decription could be found here:
[ Node.js TLS API ](https://nodejs.org/api/tls.html#tls_new_tls_tlssocket_socket_options)

## API
The comes with some default you can overide these as you see fit
 * --host=0.0.0.0
 * --port=8443
 * --key=THE_PATH_TO_THE_KEY_FILE
 * --cert=THE_PATH_TO_THE_CERT_FILE

For example to change all configuration , run in terminal / CMD:
```
http2-debug --host=10.10.90.210 --port=443 --key=./my-key.pem  --cert=./my-cert.pem

```

## Run with Docker
```
docker run -p 8443:8443 hisco/http2-debug

```
Registry link [Link to hub registry](https://hub.docker.com/r/hisco/http2-debug/)
## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/http2-debug.svg
[npm-url]: https://npmjs.org/package/http2-debug
[travis-image]: https://img.shields.io/travis/hisco/http2-debug/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/hisco/http2-debug