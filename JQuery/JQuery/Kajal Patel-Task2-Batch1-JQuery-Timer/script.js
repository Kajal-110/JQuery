$(document).ready(function () {
  c();
  var rowCount = 6;
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
    rowCount++;


  });
  $('tbody').on('click', '.deleteButton', function () {


    if (confirm("Do you want to delete this button?")) {
      $(this).closest('tr').remove();
      rowCount--;
    }

  });

  $('#saveDataIntable').on('click', function () {
    var count = $('.firstTableBody tr').length;
    console.log(count);
    for (var i = 1; i <= count; i++) {
      var name = $('.name').val();
      var subject = $('.subject').val();
      var marks = $('.marks').val();

      var rowCount = "";

      var dynamicTable =
        `<tr><td class="sno">`
        + rowCount +
        `</td><td class="name">`
        + name +
        `</td><td class="subject">`
        + subject +
        `</td><td class="mark">`
        + marks +
        `</td></tr>`;

      $('.saveDatatable tbody').append(dynamicTable);
      //rowCount++;

      var data = [];
      data.push({
        name: name,
        subject: subject,
        marks: marks
      });

      //console.log(data.name.val())
    }
  })
function c() {
    var n = $('.c').attr('id');
    var c = n;
    $('.c').text(c);
    setInterval(function () {
      c--;
      if (c >= 0) {
        $('.c').text(c);

      }
      if (c == 0) {
        $('.c').text(n);
        //alert('time out');
        Swal.fire({
          title: 'if you want to use this website so first need to login',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
                          rgba(0,0,123,0.4)
                          url("/images/nyan-cat.gif")
                          left top
                          no-repeat
                        `

        })
      }
    }, 1000)
    
  }
  
  setInterval(function(){
    c();
  },13000)
})






















