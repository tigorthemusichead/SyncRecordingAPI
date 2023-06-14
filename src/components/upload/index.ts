import {IUpload} from "./types"
import {google} from "googleapis"
import fs from "fs";
import {auth} from "../google-api"
import FFmpeg from "../transcode";

const Upload: IUpload = {
    uploadFile: async (req, res) => {
        console.log(req.file)
        let file = req.file
        if (file != null) {
            const transcoded = await FFmpeg.toWAV(file.path)
            if(transcoded.success) {
                file.path = transcoded.file ?? file.path
                file.originalname += '.wav'
                file.mimetype = 'audio/wav'
            }
            await Upload.sendToDrive(file)
        }
        res.send({
            success: true,
            file: file
        })
    },
    sendToDrive: async (uploadedFile) => {
        const driveService = google.drive({version: 'v3', auth})
        let fileMetaData = {
            name: uploadedFile.originalname,
            parents: ['1B_sJE1UcftK3tYY8YRxN9iXaFHnDMAzy'],
        }
        let media = {
            mimeType: uploadedFile.mimetype,
            body: fs.createReadStream(uploadedFile.path)
        }
        let response = await driveService.files.create({
            //@ts-ignore
            resource: fileMetaData,
            media: media,
            fields: 'id'
        })
    }
}

export default Upload