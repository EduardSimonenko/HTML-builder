const fs = require('fs');
const path = require('path');


fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  (err) => {
    if (err) throw err;
  }
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      if (path.extname(file) == '.css') {

        const stream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');

        let result = '';

        stream.on('data', chunk => result += chunk);
        stream.on('end', () => fs.appendFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          result,
          err => {
            if (err) throw err;
          })
        );

      }
    });
  }
});


