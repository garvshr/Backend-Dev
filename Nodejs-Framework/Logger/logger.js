const fs = require("fs");
const path = require("path");
const http = require("http");

function logAcivity(message){
    const timestamp = new Date().toLocaleString();
    const logMessage = `${timestamp} - ${message}\n`;

    fs.appendFile('activity.log', logMessage, (err) => {
        if (err) 
            console.log('Error logging activity:');
    });
}

module.exports = { logAcivity };