const fs = require('fs');
const path = require('path');

const inputStream = path.resolve(__dirname, 'input.txt')
const outputStream = path.resolve(__dirname, 'output.txt')

const readStream = fs.createReadStream(inputStream)
// const writeStream = fs.createWriteStream(outputStream)

// readStream.pipe(writeStream);

// );

readStream.on('data', (chunk) => {
    console.log('--- New Chunk ---');
    console.log(chunk.toString());
});