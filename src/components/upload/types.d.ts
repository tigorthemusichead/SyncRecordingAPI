import {Request, Response} from "express";

interface IUpload {
    uploadFile: (req: Request, res: Response) => Promise<void>
    sendToDrive: (file: any) => Promise<any>
}