import express, {Express, Request, Response} from 'express'
import Upload from "./components/upload"
import path from 'path'
// import fileUpload from 'express-fileupload'
import multer from 'multer'
import cors from 'cors'
import WebSocket from 'ws'
import bodyParser from 'body-parser'

const upload = multer({ dest: 'upload/' })

const http = require('http')

const app: Express = express()

app.use(cors())

app.use(express.json())

const server = http.createServer(app)
const WS_PORT = process.env.PORT || 5001;
server.listen(WS_PORT, function () {
    console.log('Server running')
})

const wss = new WebSocket.Server({server});

wss.on('connection', function (ws) {
    console.log('new connection')
})

const port = 5000

app.get('/', (req: Request, res: Response)=> {
    res.send('<h1>SyncRecording API</h1>')
});

app.post('/uploadFile', upload.single('file'),  Upload.uploadFile)

app.post('/setTime', (req, res) => {
    console.log(req.body)
    wss.clients.forEach(client => client.send(JSON.stringify({
        action: 'set-time',
        value: {
            time: req.body.time
        }
    })));
    res.send({
        success: true
    })
})

app.listen(port, ()=> {
    console.log(`[Server]: I am running at https://localhost:${port}`)
});

export default app