"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("./components/upload"));
const path_1 = __importDefault(require("path"));
// import fileUpload from 'express-fileupload'
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const ws_1 = __importDefault(require("ws"));
const upload = (0, multer_1.default)({ dest: 'upload/' });
const http = require('http');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http.createServer(app);
server.listen(1337, function () {
    console.log('Server running');
});
const wss = new ws_1.default.Server({ server });
wss.on('connection', function (ws) {
    console.log('new connection');
});
const port = 5000;
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, './front/index.html'));
});
app.post('/uploadFile', upload.single('file'), upload_1.default.uploadFile);
app.post('/setTime', (req, res) => {
    console.log(req.body);
    wss.clients.forEach(client => client.send(JSON.stringify({
        action: 'set-time',
        value: {
            time: req.body.time
        }
    })));
    res.send({
        success: true
    });
});
app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});
