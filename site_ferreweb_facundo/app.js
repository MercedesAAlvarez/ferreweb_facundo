/* livereload */
const livereload = require("livereload");
const liveReloadServer = livereload.createServer(); 

/* entry point */
const express = require('express')
const connectLivereload = require("connect-livereload");
const path = require('path')
const app = express()
const port = 3084

/* archivos estaticos */
app.use(express.static(path.resolve(__dirname,'public')))

/* archivos monitoreados x livereload */
liveReloadServer.watch(path.join(__dirname,'public'));
app.use(connectLivereload());


/* rutas */
app.get('/',(req,res) => res.sendFile(path.resolve(__dirname,'views','index.html')))
app.get('/login',(req,res) => res.sendFile(path.resolve(__dirname,'views','login.html')))
app.get('/register',(req,res) => res.sendFile(path.resolve(__dirname,'views','register.html')))
app.get('/detalle',(req,res) => res.sendFile(path.resolve(__dirname,'views','detalle.html')))
app.get('/carrito',(req,res) => res.sendFile(path.resolve(__dirname,'views','carrito.html')))


/* funcion de actualizacion del servidor */
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/")

    }, 100);
}); 


const fecha = new Date();
const diaSemana = fecha.toLocaleDateString('es-AR', { weekday: 'long' })

app.listen(port,() => console.log(`Servidor levantado exitosamente hoy ${diaSemana} en puerto ${port}`))
