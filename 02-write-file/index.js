const fs = require('fs');
const path = require('path');
const readline = require('readline');


fs.createWriteStream(path.join(__dirname, 'result.txt'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Write the text you want to add');

rl.on('line', (input) => {
  fs.appendFile(
    path.join(__dirname, 'result.txt'),
    input + '\n',
    err => {
      if (err) throw err;
    }
  );
  if(input == 'exit'){
    console.log('Good luck, my friend!');
    rl.close();
  }
});

rl.on('SIGINT', () => {
  console.log('Good luck, my friend!');
  rl.close();
});

