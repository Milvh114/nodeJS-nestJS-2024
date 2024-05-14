const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function main() {
  // open the database file
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });

  // create our 'messages' table (you can ignore the 'client_offset' column for now)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_offset TEXT UNIQUE,
        content TEXT,
        room INT
    );
  `);

  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {}
  });

  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  io.on('connection',async (socket) => {
    let room;
    room = "room-default"
    socket.on('room', async (selectRoom) =>{
      try {
        await db.each('SELECT id, content FROM messages WHERE id > ? AND room = ?',
          [socket.handshake.auth.serverOffset || 0, selectRoom],
          (_err, row) => {
            socket.emit('some event', row.content, row.id, row.room);
          }
        )
      } catch (e) {
        // something went wrong
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

main()

// socket.on('chat message', async (msg) => {
//   let result;
//   try {
//     // store the message in the database
//     result = await db.run('INSERT INTO messages (content, room) VALUES (?, ?)', msg, room);
//   } catch (e) {
//     // TODO handle the failure
//     return;
//   }
//   // include the offset with the message
//   socket.in(room).emit('some event', msg, result.lastID, room);
// });
// if (!socket.recovered) { // mỗi lần reset lại page thì nó render ra data này 
//   // if the connection state recovery was not successful
//   try {
//     await db.each('SELECT id, content FROM messages WHERE id > ? AND room = ?',
//       [socket.handshake.auth.serverOffset || 0, room],
//       (_err, row) => {
//         socket.emit('some event', row.content, row.id, row.room);
//       }
//     )
//   } catch (e) {
//     // something went wrong
//   }
// }