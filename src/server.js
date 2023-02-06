import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8080, () => console.log(`Server on port ${8080}`));

//Socket
const io = new Server(httpServer);

//

//Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));


//views

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

//Endpoints
app.use('/', viewsRouter);

const messages = [];

//Socket Server
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    socket.on('inicio', ()=>{
        io.sockets.emit('messageLogs', messages);
        socket.broadcast.emit('connected', messages);
    })
    socket.on('message', (data) => {
        messages.push(data);
        io.sockets.emit('messageLogs', messages);
    })
})

