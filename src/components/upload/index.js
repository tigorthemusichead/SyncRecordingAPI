"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
const google_api_1 = require("../google-api");
const Upload = {
    uploadFile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.file);
        if (req.file != null) {
            yield Upload.sendToDrive(req.file);
        }
        res.send({
            success: true,
            file: req.file
        });
    }),
    sendToDrive: (uploadedFile) => __awaiter(void 0, void 0, void 0, function* () {
        const driveService = googleapis_1.google.drive({ version: 'v3', auth: google_api_1.auth });
        let fileMetaData = {
            name: uploadedFile.originalname,
            parents: ['1B_sJE1UcftK3tYY8YRxN9iXaFHnDMAzy'],
        };
        let media = {
            mimeType: uploadedFile.mimetype,
            body: fs_1.default.createReadStream(uploadedFile.path)
        };
        let response = yield driveService.files.create({
            //@ts-ignore
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });
    })
};
exports.default = Upload;
