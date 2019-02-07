$(document).ready(function() {

    //---BUILD the LIST ---//

    function displayResults(parks) {

        // Then, for each entry from the database
        parks.forEach(function(park) {
          // Append each of the park's properties to the table
          var tr = $("<tr>").append(
            $("<td>").text(park.parks_name),
            $("<td>").text(park.location),
            $("<td>").text(park.size),
            $("<td>").text(park.visited),
          );
      
          $("tbody").append(tr);
        });
      }

//--- GET all data from database--/
    //AJAX call to grab everything from the database and put it in the rows
$.get("/api/all", function(data){
    console.log(data);
 
})

    //----CREATE an entry from the form--//


    //---UPDATE data - change the visitor toggle---//


    //---DELETE data from the website---//


  });