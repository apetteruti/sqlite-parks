const sqlite3 = require('sqlite3').verbose();

 
// open the database
let db = new sqlite3.Database('./parks.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the parks database.');
});
 
// db.serialize(() => {
//   db.each("SELECT id as id, park_name as park_name FROM parks", (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.park_name);
//   });
// });

//-------READS ALL-----------//

  db.serialize(() => {
  db.all("SELECT * FROM parks", (err,rows) => {
    if(err){
      throw err;
    }
    rows.forEach((row)=> {
      console.log(row)
    });
  });
  })

//-------CREATE--------//
//var park = req.body.park_name
//var location = req.body.location
// db.run("INSERT INTO parks(park_name, location) VALUES (park, location)", function(err) {  
// if (err) {
//   return console.error(err.message);
// }
// console.log(`Rows inserted ${this.changes}`);
// });
 

//---------UPDATE----------//
//var park = req.body.park_name;
//var id = req.params.id
// db.run("UPDATE parks SET park_name = park WHERE id = id", function(err){
//   if(err){
//     return console.error(err.message);
//   }
//   console.log (`Rows inserted ${this.changes}`)
// });

// db.run("DELETE FROM parks WHERE park_name = 'Long Bridge Park'", function(err){
//   if(err){
//     return console.error(err.message);
//   }
//   console.log(`Rows deleted ${this.changes}`)
// })

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});