import http from 'http';
import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017");

const db = client.db("student").collection("students");

    // 
    // console.log("Inserted Successfully")
    // const obj = {
    //     id:id1,
    //     name: name1,
    //     dept: dept1
    // }

async function fetchData() {
    try {
        const data = await db.find({}).toArray();
        // console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


http.createServer(async (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(req.url)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/insert') {
        let body = '';

        req.on('data', chunk => {
            // console.log(chunk.toString())
            body += chunk.toString(); 
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            data.id = parseInt(data.id)

            // console.log('Received data:', data);

            db.insertOne(data);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data received successfully' }));
        });
    } 
    else if(req.method === 'GET' && req.url === '/display'){

        const prom = await fetchData();
        // console.log(prom)
        const data = JSON.stringify(prom);
        res.end(data)
        // prom.then(data => {
        //         // console.log('Data:', data);
        //         return data;
        //     })
        //     .catch(error => {
        //         // console.error('Error:', error);
        //         return error;
        //     });
        
    }
    else if(req.method === 'POST' && req.url === '/remove'){
        let body = '';

        req.on('data', chunk => {
            // console.log(chunk.toString())
            body += chunk.toString(); 
        });
        req.on('end', () => {
            const data = JSON.parse(body);

            // console.log('Received data:', data);

            db.deleteOne({id:parseInt(data.id)})

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data recieved successfully' }));
        });
    }
    else {
        res.writeHead(404);
        res.end();
    }
}).listen(3000, ()=>{
    console.log(`The server is running at ${3000}`)
})