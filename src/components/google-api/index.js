"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');
const KEYFILEPATH = path.resolve(__dirname) + '/credential.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
exports.auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});
