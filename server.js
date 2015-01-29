// ==== Clear Log on each startup (if TTY)
// if (process.stdout.isTTY) {
//   var i, lines, _i;
//   lines = process.stdout.getWindowSize()[1];
//   for (i = _i = 0; 0 <= lines ? _i < lines : _i > lines; i = 0 <= lines ? ++_i : --_i) {
//     console.log('\r\n');
//   }
// }

// ==== Run App
require('./app')();