const fs = require('fs')
const {google} = require('googleapis')
const path = require('path');

const KEYFILEPATH = path.resolve(__dirname) + '/credential.json'

const SCOPES = ['https://www.googleapis.com/auth/drive']

export const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
})

