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
  if(input == 'exit'){
    console.log('Good luck, my friend!');
    return rl.close();
  }
  fs.appendFile(
    path.join(__dirname, 'result.txt'),
    input + '\n',
    err => {
      if (err) throw err;
    }
  );
});

rl.on('SIGINT', () => {
  console.log('Good luck, my friend!');
  rl.close();
});

