import {IUpload} from "./types"
import {google} from "googleapis"
import fs from "fs";
import {auth} from "../google-api"

const Upload: IUpload = {
    uploadFile: async (req, res) => {
        console.log(req.file)
        if (req.file != null) {
            await Upload.sendToDrive(req.file)
        }
        res.send({
            success: true,
            file: req.file
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