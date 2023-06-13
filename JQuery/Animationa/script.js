$(document).ready(function () {
  $('#add').on('click', function () {
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
  $('tbody').on('click', '.deleteButton', function () {
    if (confirm("Do you want to delete this button?")) {
      $(this).closest('tr').remove();
      rowCount--;
    }
  });

  $('#saveDataIntable').on('click', function () {
    var count = $('.firstTableBody tr').length;
    for (var i = 0; i < count; i++) {
      var name = $($('.name')[i]).val();
      var subject = $($('.subject')[i]).val();
      var marks = $($('.marks')[i]).val();
      console.log(marks);
      var allBtn = $($('.btn-dark')[i]);
      //console.log(allBtn.hasClass("active"));
      var rowCount = "";
      var color = marks < 33 ? "lightgreen" : '';
      var dynamicTable =
        `<tr style="background-color:` + color + `"><td class="sno">`
        + rowCount +
        `</td><td class="name" id="name">`
        + name +
        `</td><td class="subject" id="subject">`
        + subject +
        `</td><td class="mark">`
        + marks +
        `</td></tr>`;

      $('.saveDatatable tbody').append(dynamicTable);
    }
  })
  const startingMinutes = 1;
  let time = startingMinutes * 60;
  const countdownEl = $('#countdown');

  setInterval(function updateCountdown() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    countdownEl.text(`${minutes > 0 ? minutes : '0'}:${seconds > 0 ? seconds : '0'}`);
    time--;
    if (time == 0) {
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
      }).then((result) => {
        if (result.isConfirmed) {
          time = startingMinutes * 60;
        }
      })
      updateCountdown()
    }
  }, 1000)
})