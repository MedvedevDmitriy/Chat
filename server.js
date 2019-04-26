const WebSocket = require('ws');
// const axios = require('axios');
//
// axios.get('https://localhost:3000')
//     .then(response => {
//         console.log(response.data.url);
//         console.log(response.data.explanation);
//     })
//     .catch(error => {
//         console.log(error);
//     });
//
const wsServer = new WebSocket.Server({port: 4000}, () => {
    console.log('ws server is listening port 4000...')
});

wsServer.on('connection', ws => {
    ws.send(JSON.stringify({
        text: 'Добро Пожаловать',
        author: 'server',
        datetime: new Date().getTime(),
    }));

    ws.on('message', message => {
        // ws.send(JSON.stringify({
        //     text: message,
        //     author: 'server',
        //     datetime: new Date().getTime(),
        // }));
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    })
});

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);

    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello from server!');
            break;
        case '/greeting':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hi there! Hello from server!');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found!');
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('http server is listening port 3000...')
});