
$(document).ready(function () {
  
  $('#addButton').on('click', function () {
    var rowCount = $('table tr').length;
  if (rowCount <= 5) {

      $('#tbody').append(`<tr>` +
        `<td><input type="text" placeholder="Enter First Name" class="text-center form-control" /></td>`
        +
        `<td><input type="text" placeholder="Enter Last Name" class="text-center form-control" /></td>`
        +
        `<td> <button class="btn btn-dark text-center form-control" id="deleteButton" type="button"> Delete</button> </td>`
      )
    }
    else {
      $("#addButton").attr("disabled", true);

    }
  })

   $('#tbody').on('click',function (){
   
    var rowCount = $('table tr').length;   
    if(rowCount<=6){
      $('#addButton').attr('disabled', false);
    }
   
    $('#deleteButton').closest('tr').remove();
    return false;
   });

 

})