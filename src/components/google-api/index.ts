const fs = require('fs')
const {google} = require('googleapis')
const path = require('path');

const KEYFILEPATH = path.resolve(__dirname) + '/credential.json'

const SCOPES = ['https://www.googleapis.com/auth/drive']

export const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    /*credentials: {
        "type": "service_account",
        "project_id": process.env.CRED_PROJECT_ID,
        "private_key_id": process.env.CRED_PRIVATE_KEY_ID,
        "private_key": process.env.CRED_PRIVATE_KEY,
        "client_email": process.env.CRED_CLIENT_EMAIL,
        "client_id": process.env.CRED_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": process.env.CRED_AUTH_X509_CERT_URL,
        "universe_domain": "googleapis.com"
    },*/
    scopes: SCOPES
})

