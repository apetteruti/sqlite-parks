const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./parks.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the parks database.');
});
 
db.serialize(() => {
  db.each("SELECT id as id, park_name as park_name FROM parks", (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.park_name);
  });
});
 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});