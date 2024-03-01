const fs = require('fs/promises');
const path = require('path');

const INPUT_FOLDER = './app/input_file';
const OUTPUT_FOLDER = './app/output_files';
const MAXIMUM_MB_FILE_SIZE = 2;
const MAXIMUM_FILE_SIZE = MAXIMUM_MB_FILE_SIZE * 1024 * 1024;

const readFileContent = async () => {
    try {
        const csvRawFile = await fs.readFile(path.join(INPUT_FOLDER, 'input.csv'));
        return csvRawFile;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error
    }
};

const splitAndSaveFiles = async () => {
  try {
    const getFile = await readFileContent();
    const fileString = getFile.toString().split(/\r?\n/);

    if (Buffer.byteLength(getFile) > MAXIMUM_FILE_SIZE) {
      let currentSize = 0;
      let currentFileIndex = 1;
      let currentFileContent = fileString[0] + '\n'; // i nclude headers

      for (let i = 1; i < fileString.length; i++) {
        const line = fileString[i] + '\n'; // Include new line char \n
        const lineSize = Buffer.byteLength(line);

        // Check size with new line
        if (currentSize + lineSize <= MAXIMUM_FILE_SIZE) {  
          currentFileContent += line;
          currentSize += lineSize;
        } else {
          // Save current to file
          const outputFilePath = path.join(OUTPUT_FOLDER, `output_${currentFileIndex}.csv`);
          await fs.writeFile(outputFilePath, currentFileContent);

          // reset variables proximo arquivo
          currentFileIndex++;
          currentSize = lineSize;
          currentFileContent = fileString[0] + '\n' + line; // include header next file
        }
      }

      // save the last part in a file
      const outputFilePath = path.join(OUTPUT_FOLDER, `output_${currentFileIndex}.csv`);
      await fs.writeFile(outputFilePath, currentFileContent);

      console.log(`File split into ${currentFileIndex} parts.`);
    } else {
      console.log('File size is within the limit. No need to split.');
    }
  } catch (error) {
    console.error('Error handling file:', error);
  }
};

splitAndSaveFiles();
