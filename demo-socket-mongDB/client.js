const socket = io({
    auth: {
        serverOffset: 0
    }
});

const form = document.getElementById('form');
const room1 = document.getElementById('room1')
const room2 = document.getElementById('room2')
const room0 = document.getElementById('room0')
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const roomTitle = document.getElementById('room-title')
const leaveRoom = document.getElementById('leaveRoom')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        // title
        socket.emit('send-mess', input.value, roomTitle.title);
        input.value = '';
    }
});
room0.addEventListener('click', function() {
    const value = this.value;
    socket.emit('room', value);
    roomTitle.textContent = 'Room 0'
    roomTitle.title = 'room-default'
    room1.hidden=true
    room0.hidden=true
    room2.hidden=true
});
room1.addEventListener('click', function() {
    const value = this.value;
    socket.emit('room', value); 
    roomTitle.textContent = 'Room 1'
    roomTitle.title = 'room1'
    room2.hidden=true
    room1.hidden=true
    room0.hidden=true
});
room2.addEventListener('click', function() {
    const value = this.value;
    socket.emit('room', value);  
    roomTitle.textContent = 'Room 2'
    roomTitle.title = 'room2'
    room1.hidden=true
    room2.hidden=true
    room0.hidden=true
});
socket.on('some event', (msg, serverOffset, room) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    socket.auth.serverOffset = serverOffset;
    // socket.emit('room', roomTitle.title)
});

const toggleButton = document.getElementById('toggle-btn');

toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (socket.connected) {
        toggleButton.innerText = 'Connect';
        socket.disconnect();
    } else {
        toggleButton.innerText = 'Disconnect';
        socket.connect();
    }
});
leaveRoom.addEventListener('click', (e) => {
    socket.emit('leave-room',)
})

leaveRoom.addEventListener('click', ()=>{
    window.location.reload()
})
socket.on('error', (msg) => {
    roomTitle.textContent = 'Pls select room'
})
