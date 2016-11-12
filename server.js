const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((request, response) => {
    let fileName = path.resolve(__dirname, 'example/index.html');

    console.log('Requested url', request.url);

    fs.readFile(fileName, (err, file) => {
        if (err) {        
            response.writeHead(500, {
                'Content-Type': 'text/plain',
            });
            response.write(err + '\n');
            response.end();
            return;
        }

        response.writeHead(200);
        response.write(file);
        response.end();
    });
});

server.listen(port, (err) => {  
    if (err) {
        return console.log('Error:', err);
    }

    console.log(`Server is listening on ${port}`);
});
