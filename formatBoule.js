var fs = require('fs');

fs.readFile('boulevards.txt', 'utf-8', (err, data) => {
  var formatted = data.split('\n').map( boul => {
    return '\'' + boul + '\'' + '\r';
  });
  fs.writeFile('output.txt', formatted);
});