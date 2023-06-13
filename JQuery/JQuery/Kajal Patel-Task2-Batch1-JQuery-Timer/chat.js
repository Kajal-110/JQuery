$('document').ready(function () {
  var $table = $('#myTable');
  var sNo = 6;
  var sno3 = 1;

  addNewRow = () => {
    var $row = $table.find('tbody').append('<tr></tr>').find('tr:last');

    var $call1 = $('<td>').attr("data-label", "S.No:").appendTo($row);
    var $call2 = $('<td>').attr("data-label", "Name:").appendTo($row);
    var $call3 = $('<td>').attr("data-label", "Subject:").appendTo($row);
    var $call4 = $('<td>').attr("data-label", "Marks:").appendTo($row);
    var $call5 = $('<td>').attr("data-label", "Result:").appendTo($row);
    var $call6 = $('<td>').attr("data-label", "Action:").appendTo($row);

    $call1.text(sNo++);
    $('<input>').attr({
      'type': 'text',
      'placeholder': 'Name',
      'class': 'name',
      'id': 'name',
      'name': 'name',
      'title': 'you can enter only alphabets here'
    }).appendTo($call2);

    $('<input>').attr({
      'type': 'text',
      'placeholder': 'Subject',
      'class': 'subject',
      'id': 'subject',
      'name': 'subject'
    }).appendTo($call3);

    $('<input>').attr({
      'type': 'number',
      'placeholder': 'Mark',
      'class': 'marks',
      'id': 'marks',
      'name': 'marks'
    }).appendTo($call4);

    $('<button>').attr({
      'type': 'button',
      'class': 'btn btn-dark',
      'onclick': 'visited(this)'
    }).text('Accept').appendTo($call5);

    $('<button>').attr({
      'type': 'button',
      'class': 'btn btn-primary mx-1',
      'onclick': 'notVisited(this)'
    }).text('Reject').appendTo($call5);

    $('<button>').attr({
      'type': 'button',
      'class': 'btn btn-dark',
      'onclick': 'deleteRow(this)'
    }).text('Delete').appendTo($call6);
  };


  deleteRow = (a) => {
    if (confirm("Are you want to delete")) {
      $(a).closest('tr').remove();
      sNo--;
      $('#myTable tr').each(function (i) {
        $(this).find('td:first').text(i + 1);
      });
    }
  }

  $("#form").submit(function(e){
    e.preventDefault();
    
    var demoList = $('#demoList');
    demoList.html(`
    <thead>
      <tr class="header">
        <th>S.No</th>
        <th onclick="sortDataInSecondTable(1)">Name</th>
        <th onclick="sortDataInSecondTable(2)">Subject</th>
        <th>Mark</th>
      </tr>
    </thead>
    <tbody></tbody>
  `);

    var name = $('.name');
    var subject = $('.subject');
    var mark = $('.marks');
    $('table tr').each(function (i) {
      if (i > 0) {
        var row = $('<tr></tr>').appendTo(demoList.find('tbody'));
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
      AcceptedRows();
      findPercentages();
    });
      return false;
});


  searchDataInSecondTable = () => {
    let input, filter, table, tr, tdname, tdsubject, txtValue1, txtValue2;
    input = $('#myInput');
    filter = input.val().toUpperCase();
    table = $('#demoList');
    tr = table.find('tr');
    for (let i = 0; i < tr.length; i++) {
      tdname = $(tr[i]).find('td:eq(1)');
      tdsubject = $(tr[i]).find('td:eq(2)');
      if (tdname.length || tdsubject.length) {
        txtValue1 = tdname.text() || tdname.html();
        txtValue2 = tdsubject.text() || tdsubject.html();
        if ((txtValue1.toUpperCase().indexOf(filter) > -1) || (txtValue2.toUpperCase().indexOf(filter) > -1)) {
          $(tr[i]).show();
        } else {
          $(tr[i]).hide();
        }
      }
    }
  }

  sortDataInSecondTable = (n) => {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = $('#demoList');
    switching = true;
    while (switching) {
      switching = false;
      rows = table.find('tr');
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = $(rows[i]).find('td').eq(n);
        y = $(rows[i + 1]).find('td').eq(n);
        if (x.text().toLowerCase() > y.text().toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  function visited(a) {
    $(a).addClass('salmon');
    $(a).parent().children().last().removeClass('salmon');
  }

  function notVisited(a) {
    $(a).addClass('salmon');
    $(a).parent().children().first().removeClass('salmon');
  }


  function findPercentages() {

    var name = $('.name');
    var mark = $('.marks');
    var markArr = []

    percentages = $('#percentages');

    percentages.html(`
    <thead>
      <tr class="header">
        <th>S.No</th>
        <th>Name</th>
        <th>Mark</th> 
      </tr>
    </thead>
    <tbody id="tbody">

    </tbody>
  `);

    tbody = $('#tbody');

    let tableNames = [];
    name.each((i, el) => {
      tableNames[i] = $(el).val();
    });

    uniquename = new Set(tableNames);

    let nameCount = [];
    uniquename.forEach((uniquename, uindex) => {
      count = 0;
      tableNames.forEach(tableNames => {
        if (tableNames == uniquename) {
          count++;
          nameCount[uindex] = count;
        }
      });
    });

    let nameandmarks = []
    nameandmarks = name.map((i, el) => {
      return {
        name: $(el).val(),
        marks: $(mark[i]).val()
      }
    });

    totalmarks = []
    totalmarks = nameandmarks.map((name, index) => {
      return nameandmarks.map((nm, i) => {
        if (nm.name == name.name) {
          return mark[index].marks = parseInt(mark[i].value)
        }
        else {
          return 0
        }
      })
    })

    let c = []

    let b = totalmarks.forEach((m, i) => {
      c[i] = m.reduce((h1, h2) => {
        return h1 + h2;
      });
    })

    let d = new Set(c);
    let z = Array.from(d).map(d => { return d })

    Array.from(uniquename).forEach((m, i) => {
      let row = $('<tr>');
      let call1 = $('<td>').html(`${sno3++} `)
      let call2 = $('<td>').html(m);
      let call3 = $('<td>').html(z[i] / nameCount[m] + '%');
      row.append(call1, call2, call3);
      tbody.append(row);
    });
  }


  validateData = () => {
    var isFormValid = true;

    var name = $('.name');
    var subject = $('.subject');
    var mark = $('.marks');

    for (i = 0; i < name.length; i++) {
      let nameVal = name.eq(i).val();
      let subjectVal = subject.eq(i).val();
      let marksVal = mark.eq(i).val();

      if (nameVal == "" || subjectVal == "" || marksVal == "") {
        alert("Please enter valid data");
        isFormValid = false;
      }
    }

    if (isFormValid) {
      saveDataToSecondTable(e);
    }

    return isFormValid;
  }
  function AcceptedRows() {
    var name = $('.name');
    var mark = $('.marks');
    var subject = $('.subject');
    var acceptedRows = $('#acceptedRows');
    acceptedRows.html(`
    <thead>
      <tr class="header">
        <th>S.No</th>
        <th>Name</th>
        <th>Mark</th> 
        <th>Result</th>
      </tr>
    </thead>
    <tbody id="acceptedRows">
    </tbody>
  `);

    var sno3 = 1;
    var acceptRow = $('.btn-dark');
    for (let i = 0; i < name.length; i++) {
      if (acceptRow.eq(i).hasClass("salmon")) {
        var row = $('<tr></tr>');
        var call1 = $('<td></td>').html(`${sno3++}`);
        var call2 = $('<td></td>').html(name.eq(i).val());
        var call3 = $('<td></td>').html(subject.eq(i).val());
        var call4 = $('<td></td>').html('<button class="btn btn-dark" type="button">Accepted</button>');

        row.append(call1, call2, call3, call4);
        acceptedRows.append(row);
      }
    }
  }

})