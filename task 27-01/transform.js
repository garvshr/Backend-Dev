const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

const inputFilePath = path.join(__dirname, 'input.txt')
const transformOutputFilePath = path.join(__dirname, 'transformed_output.txt')

const readStream = fs.createReadStream(inputFilePath, {encoding : "utf-8"})
const writeStream = fs.createWriteStream(transformOutputFilePath, {encoding : "utf-8"})

const upperCaseTransform = new Transform ({
    transform(chunk, encoding, callback) {
        const transformedData = chunk.toString().toUpperCase();
        this.push(transformedData);
        callback();
    }
});

readStream.pipe(upperCaseTransform).pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Data has been written to transformed_output.txt successfully.');
});