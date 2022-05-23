const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      const FileDescription = file.name.split('.');
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) {
          console.log('File doesn\'t exist.');
        } else {
          FileDescription.push(`${stats.size / 1000}kb`);
          if(file.isFile()){
            console.log(FileDescription.join(' - '));
          }
        }
      });
    });
  }
});