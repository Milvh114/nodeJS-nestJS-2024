
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
const clientOptionsMongoDb = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
require('dotenv').config();


async function main() {

  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  // await mongoose.connect(process.env.MONGO_DB, clientOptionsMongoDb);
  await mongoose.connect(process.env.MONGOOSE_DB);
  // await mongoose.connect('mongodb://127.0.0.1/milvh1142002');


  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {}
  });

  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  // try {
  //   const mess = new Msg({content: 'abc12', room: 'room4'})
  //   console.log(mess)
  //   // await mongoose.connection.db.message()
  //   await mess.save()
  // } catch(error) {
  //   console.error('Error:', error);
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   await mongoose.disconnect();
  // }

  io.on('connection',async (socket) => {
    let room;
    room = "room-default"
    socket.on('room', async (selectRoom) =>{
      try {
        // Query for a movie that has the room 'selectRoom'
        const query = { room: selectRoom };
        const data = await msg.findOne(query);
        console.log(data)
        socket.emit('load-data', data)
      } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
      }
    }); 

    socket.on('send-mess',async (msg, room) => {
      if(!room){
        socket.emit('error', msg)
      }
      let result;
      try {
        // store the message in the database
        result = await db.run('INSERT INTO messages (content, room) VALUES (?, ?)', msg, room);
      } catch (e) {
        // TODO handle the failure
        return;
      }
      // include the offset with the message
      socket.emit('some event', msg, result.lastID, room);
    })
    
  });
  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });

}

main().catch(err => console.log(err));