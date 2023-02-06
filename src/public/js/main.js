const socket = io();

let user;

const chatbox = document.querySelector('#chatbox');

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingrese su nombre para identificarse en el chat',
    inputValidator: (value)=> {
        return !value && 'Debes ingresar un nombre'
    },
    allowOutsideClick:false
})
.then(res =>{
    user = res.value
    //console.log(res.value)
    socket.emit('inicio', 'Inicio de sesión')
})

chatbox.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {

        if (chatbox.value.trim().length > 0) {
            
            socket.emit('message', { message: chatbox.value, user});
        }
    }
})

socket.on('connected', (data)=>{
  if ( user !== undefined){

    Swal.fire({
        text:'Nuevo usuario conectado',
        toast: true,
        position:'top-right'
    })
  }
})

socket.on('messageLogs', (data) => {
    let log = document.querySelector('#messageLogs');
    let messages = "";

    data.forEach(message => {
        messages = messages + `<strong>${message.user}</strong>: ${message.message} <br>`;
        chatbox.value = '';
    });

    log.innerHTML = messages;
})