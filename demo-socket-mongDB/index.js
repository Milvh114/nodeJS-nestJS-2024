
/* -------------------------------------------------------------------------- */
/*                               MongoDB                                      */
/* -------------------------------------------------------------------------- */
// const express = require('express');
// const { createServer } = require('node:http');
// const { join } = require('node:path');
// const { Server } = require('socket.io');
// const { MongoClient, ServerApiVersion } = require('mongodb')
// require('dotenv').config();

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGO_DB, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function main() {

//   // Connect the client to the server	(optional starting in v4.7)
//   await client.connect();
//   const app = express();
//   const server = createServer(app);
//   const io = new Server(server, {
//     connectionStateRecovery: {}
//   });

//   app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
//   });

//   try {
//     const database = client.db('message-socket');
//     const msg = database.collection('messages');
//     // const query = { room: '123' };
//     const query = { content: 'Back to the Future'};
//     // const movies = await msg.find(query);
//     const movies = await msg.find();
//     await movies.forEach(movie => console.log(movie._id, movie.room));
//   } catch(error) {
//     console.error('Error:', error);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }

//   io.on('connection',async (socket) => {
//     let room;
//     room = "room-default"
//     socket.on('room', async (selectRoom) =>{
//       try {
//         const database = client.db('message-socket');
//         const msg = database.collection('messages');
//         // Query for a movie that has the title 'Back to the Future'
//         const query = { room: selectRoom };
//         const movie = await msg.findOne(query);
//         console.log(movie);
//       } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//       }
//     }); 

//     socket.on('send-mess',async (msg, room) => {
//       if(!room){
//         socket.emit('error', msg)
//       }
//       let result;
//       try {
//         // store the message in the database
//         result = await db.run('INSERT INTO messages (content, room) VALUES (?, ?)', msg, room);
//       } catch (e) {
//         // TODO handle the failure
//         return;
//       }
//       // include the offset with the message
//       socket.emit('some event', msg, result.lastID, room);
//     })
    
//   });
  
//   server.listen(3000, () => {
//       console.log('server running at http://localhost:3000');
//   });
// }
// main()

/* -------------------------------------------------------------------------- */
/*                               Mongoose                                     */
/* -------------------------------------------------------------------------- */

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Msg = require('./models/message');
const path = require('node:path');
const clientOptionsMongoDb = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
require('dotenv').config();


async function main() {

  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  // const db = {dbName: 'testDB'}
  // await mongoose.connect(process.env.MONGOOSE_DB, db);
  
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {}
  });
  
  await mongoose.connect(process.env.MONGOOSE_DB_SRV)
  .then(() => {
    server.listen(3000, () => {
      console.log('server running at http://localhost:3000');
    });
  })
  .catch((error) => console.log(error))

  app.use(express.static('.'))


  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  // app.get('/client.js', (req, res) => {
  //   res.sendFile(join(__dirname, 'client.js'));
  // });


  io.on('connection',async (socket) => {
    let room;
    room = "room-default"
    socket.on('room', async (selectRoom) =>{
      try {
        console.log(selectRoom)
        // Query for a movie that has the room 'selectRoom'
        const query = { room: selectRoom };
        const data = await Msg.find(query);
        // console.log(data)
        data.forEach( (msg) => { socket.emit('load-data', msg.content, msg.id, msg.room)})
      }catch (error){
        console.error(error)
      } finally {
        // Ensures that the client will close when you finish/error
        // await mongoose.disconnect();
      }
    }); 

    socket.on('send-mess',async (msg, room) => {
      if(!room){
        socket.emit('error', msg)
      }
      let result;
      try {
        const mess = new Msg({content: msg, room: room})
        console.log( mess._id.toString())
        // store the message in the database
        await mess.save()
        socket.emit('load-data', msg, mess._id.toString(), room);
      } catch (e) {
        console.error(e)
        // TODO handle the failure
        return;
      }
    })
    
  });
  // server.listen(3000, () => {
  //   console.log('server running at http://localhost:3000');
  // });

}

main().catch(err => console.log(err));