const sqlite3 = require('sqlite3').verbose();
var inquirer = require("inquirer");


// open the database
let db = new sqlite3.Database('./parks.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the parks database.');
  optionsMenu();
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

function readParks() {
  console.log("-----WELCOME TO The National Parks Tracker-----")
  db.serialize(() => {
    db.all("SELECT park_name as park_name, location as location, visited as visited FROM parks", (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row)
      });
    });
  })
  optionsMenu();
}

function createPark() {
  inquirer.prompt([{
        name: "park_name",
        type: "input",
        message: "What is the name of the park you would like to add?"
      },
      {
        name: "location",
        type: "input",
        message: "In which state is the park located?"
      },
      {
        name: "visited",
        type: "confirm",
        message: "Have you visited this park?"
      }
    ])
    .then(function (answer) {
      console.log(answer);

      db.run(`INSERT INTO parks (park_name, location, visited) VALUES (?,?,?)`,
        answer.park_name, answer.location, answer.visited,
        // "park", "park", "n",

        function (err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Rows inserted ${this.changes}`);
        });
      optionsMenu();
    })
};


//---------UPDATE----------//
//var park = req.body.park_name;
//var id = req.params.id
// db.run("UPDATE parks SET park_name = park WHERE id = id", function(err){
//   if(err){
//     return console.error(err.message);
//   }
//   console.log (`Rows inserted ${this.changes}`)
// });

function updatePark() {
  db.all("SELECT park_name as park_name FROM parks", function (err, results) {
    if (err) throw err;
    inquirer.prompt([{
        name: "choice",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].park_name);
          }
          return choiceArray;
        },
        message: "Which park have you visited?"
      }])
      .then(function (answer) {
        db.run(`UPDATE parks SET visited = 1 WHERE park_name = ?`, answer.choice,

          function (err, res) {
            console.log("----------------------------------");
            console.log(answer.choice + " has been set to Visited!");
            console.log("----------------------------------")
            optionsMenu();
          })
      })
  })
}


function deletePark() {
  db.all("SELECT park_name as park_name FROM parks", function (err, results) {
    if (err) throw err;
    inquirer.prompt([{
        name: "choice",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].park_name);
          }
          return choiceArray;
        },
        message: "Which park would you like to remove from the list?"
      }])
      .then(function (answer) {
        db.run(`DELETE FROM parks WHERE park_name = ?`, answer.choice,

          function (err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows deleted ${this.changes}`)
          })
        optionsMenu();
      })
  })
}



var optionsMenu = function () {
  inquirer.prompt([{

    name: "options",
    type: "list",
    choices: ["See park list", "Create a new park", "Update a park", "Delete a park"],
    message: "What would you like to do?"

  }]).then(function (answer) {
    switch (answer.options) {
      case "See park list":
        readParks();
        break;
      case "Create a new park":
        createPark();
        break;
      case "Delete a park":
        deletePark();
        break;
      case "Update a park":
        updatePark();
        break;
    }
  })
}

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });