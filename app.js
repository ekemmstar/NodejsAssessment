//  const http = require('http');
//  const cors = require('cors');
//  const server = http.createServer(function(req, res){

// // res.write("<html><body><h1>Welcome</h1></body></html>");
// // res.end();

// // });
const http = require('http');
const URL = require('url');
// const cors = require('cors');
const UserAc = require('./adduser');
const userList = require('./datasource.json');

const server = http.createServer(function (req, res) {

    const data = [
        { username: 'naomi', age: 10 },
        { username: 'sefa', age: 14 },
        { username: 'eric', age: 11 }   
    ]

   /* req.on('data', (data) =>{
        fs.writeFile("datasource.json", data, (err) => {
            if (err) {throwerror}             
             console.log("saved")        
         })    
 })    
 res.end();*/

     if (req.url == '/') {
        res.writeHead(200, { 'Content_Type': 'text/html' });
        res.write("welcome");
        res.end();
    } else if (req.url == '/users') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content_Type': 'application/json' });
        res.write(JSON.stringify(data));
        res.end();
    }
    else if (req.url == '/adduser?username=ben&age=15') {
        const newUrl = URL.parse(req.url, true)
        const params = newUrl.query
        let u_name = params.username;
        let u_age = params.age;
        UserAc(u_name, u_age);
        res.end("record added");
    }
    else if (req.url.startsWith('/addNewUser')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content_Type': 'application/json' });
        const newUrl = URL.parse(req.url, true)
        const params = newUrl.query
        let u_name = params.username;
        let u_age = params.age;
        UserAc(u_name, u_age);
        res.end("record added Succesfully");
    }
    else if (req.url.startsWith('/postNewUser')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, { 'Content_Type': 'application/json' });
        res.write(JSON.stringify(userList));
        res.end("record added Succesfully");
    }
    else if (req.url == '/contact') {
        res.writeHead(200, { 'Content_Type': 'text/html' });
        res.write("contact page");
        res.end();
    } else {
        res.writeHead(404, { 'Content_Type': 'text/html' });

        res.end();
    }
})

server.listen(5000, function () {
    console.log("Server running");
})