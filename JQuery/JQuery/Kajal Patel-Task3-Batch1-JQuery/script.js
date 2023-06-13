$(document).ready(function () {
   
$('#addButton').on('click', function () {
      $('.firstTableBody').append(`<tr>` +
        `<td class="sno"></td>`
        +
        `<td><input class="subject" id="subject"  name="subject"> </td>`
        +
        `<td> <input type="text" class="subject"   name="subject" ></td>`
        +
        `<td> <input type="text" class="marks"   name="marks" ></td>`
        +
        `<td>  <button  id="button" class="btn btn-dark " type="button" >Accept</button>
                   <button  class="btn btn-primary  " >Reject</button></td>`
        +
        `<td> <button  id="button" class="btn btn-dark deleteButton" type="button" id="deleteButton" >Delete</button></td>`
      );
});

// $('#saveDataIntable').on('click', function () {
//     var count = $('#firstTableBody tr').length;
//     console.log(count);
//     var Table2 = $('#secondTableBody');
//     displayData = Table2.length;
//     var displayData =   `<tr><td>S.No</td><td>Name</td><td>Subject</td><td>Mark</td></tr>`
//     for (var i = 1; i <= count; i++) {
//       var name = $('.name').val();
//       var subject = $('.subject').val();
//       var marks = $('.marks').val();
//       var displayData =
//         '<tr><td class="sno">'
//         +
//         '</td><td class="name">'
//                 + name +
//         '</td><td class="subject">'
//         + subject +
//         '</td><td class="mark">'
//         + marks +
//         '</td></tr>';
//       $('table tbody').append(displayData);
     
    
//     //   var data = [];
//     //   data.push({
//     //     name: name,
//     //     subject: subject,
//     //     marks: marks
//     //   });

     
//     }
// });

 })

//  function saveDataToSecondTable(event) {
//   event.preventDefault();

$('#saveDataIntable').on('click', function () {
var table2=$('#secondTableBody');
var displayData =   `<tr><td>S.No</td><td>Name</td><td>Subject</td><td>Mark</td></tr>`


var name = $('.name');
  var subject = $('.subject');
  var mark = $('.marks');
  $('table tr').each(function(i) {
    if (i > 0) {
      var row = $('<tr></tr>').appendTo(secondTableBody.find('tbody'));
      var call1 = $('<td></td>').appendTo(row);
      var call2 = $('<td></td>').appendTo(row);
      var call3 = $('<td></td>').appendTo(row);
      var call4 = $('<td></td>').appendTo(row);
      call1.addClass('sno2');
      call2.text(name[i - 1].value);
      call3.text(subject[i - 1].value);
      call4.text(mark[i - 1].value);
      if (mark[i - 1].value < 33) {
        row.css('background-color', 'pink');
      }
    }
  });
  
 })