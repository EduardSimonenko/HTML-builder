const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if (err) {
    console.log(err);
  }
});

fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
        if (err) throw err;
      });
    });
  }

  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), fs.constants.COPYFILE_EXCL, (err) => {
          if (err) throw err;
        });
      });
    }
    console.log('everything copied successfully');
  });
});

