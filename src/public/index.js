const socket = io();
let username = null;

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

function enableSendMessage() {
    btn.disabled = !username;
}

if (!username) {
    Swal.fire({
        title: '¡Hola!',
        text: 'Ingresa un nombre',
        input: 'text',
        inputValidator: (value) => {
            if (!value) return 'Si no me dices tu nombre, ¡hay tabla!'
        }
    })
        .then((input) => {
            username = input.value;
            socket.emit('newUser', username);
            enableSendMessage();
        });
}

btn.addEventListener('click', () => {
    const userMessage = message.value;
    socket.emit('chat:message', { username, message: userMessage });
    message.value = '';
});

socket.on('messages', (arrayMsgs) => {
    actions.innerHTML = '';
    const chatRender = arrayMsgs.map((msg) => `<p><strong>${msg.user}</strong>: ${msg.message}</p>`).join(' ');
    output.innerHTML = chatRender;
});

socket.on('msg', (msg) => {
    console.log(msg);
});

socket.on('newUser', (user) => {
    Toastify({
        text: `🟢 ${user} se conectó`,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #464d4d, #363b3b)",
        },
    }).showToast();
});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username);
});

socket.on('chat:typing', (user) => {
    actions.innerHTML = `<p>${user} está escribiendo...</p>`;
});