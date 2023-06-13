let arr = [];
$('document').ready(function () {
    let table = $('#myTable').DataTable();
    let counter = 1;
    $('#SaveBtn').on('click', function () {
        let obj = {};
        obj.id = counter;
        obj.name = $('form input:eq(0)').val();
        obj.subject = $('form input:eq(1)').val();
        obj.mark = $('form input:eq(2)').val();
        obj.selectGender = $('input[name="gender"]:checked').val();
        // if(selectGender){
        //     obj.Gender=selectGender
        // }
        console.log(obj.selectGender);

        obj.action = `<button type="button" class="btn btn-primary" id="DeleteBtn">Delete</button>&nbsp
    <button type="button" class="btn btn-primary" id="EditBtn" data-bs-toggle="modal" data-bs-target="#modalId">Edit</button>  `
        obj.address = $('#address').val();
        arr.push(obj);
        let tr = table.row.add([obj.name, obj.subject, obj.mark, obj.action]).draw().node();
        $(tr).find('td:eq(0)').addClass('dt-control')
        counter++;
        $('#close').click();
        $('form').trigger('reset');
    })

    $('#myTable').on('click', '#DeleteBtn', function (id) {
        const index = arr.findIndex((x) => {
            if (x.id == id) {
                return x;
            }
        })
        arr.splice(index, 1);
        table.row(index).remove()
        redraw();

    });
    function redraw() {
        table.clear().draw();
        arr.forEach((obj) => {
            table.row.add([obj.name, obj.subject, obj.mark]).draw();
        })
    }

    let row;
    $('#myTable').on('click', '#EditBtn', function () {
        $('#SaveBtn').hide();
        $('#updateBtn').show();
        row = $(this).closest('tr');
        let name = $('#name')
        name.val(row.find('td').eq(0).html())

        let subject = $('#subject')
        subject.val(row.find('td').eq(1).html())

        let mark = $('#mark')
        mark.val(row.find('td').eq(2).html())

    })

    $('#updateBtn').on('click', function () {
        let name = $('#name').val();
        let subject = $('#subject').val();
        let mark = $('#mark').val();

        row.find('td').eq(0).html(name);
        row.find('td').eq(1).html(subject);
        row.find('td').eq(2).html(mark);
    })

    $('#AddBtn').on('click', function () {
        $('#SaveBtn').show();
        $('#updateBtn').hide();
    })

    $('#myTable tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');

        var row = table.row(tr);
        let index = row.index();
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(index)).show();
            tr.addClass('shown');
        }
    });
});


function format(index) {
    let address = arr[index].address;
    let selectGender = arr[index].gender;

    // console.log(subject);

    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" id="childTBL" class=" ">' +
        '<thead><tr><th>Subject</th><th>Gender</th></tr></thead>' +
        '<tbody><tr><td> ' + address + `</td><td> ` + selectGender + `</td></tr></tbody>` +
        '</table>'
    );
}

$('#myTable').on('click', '#deleteBtn', function (id) {

    let index = arr.findIndex((x) => {
        if (x.id == id) {
            return x;
        }
    })
    table.splice(index, 1);
    table.row(index).remove();
    dwawAgain();
})

function dwawAgain() {
    table.clear().draw();
    arr.forEach((obj) => {
        table.row.add([]).draw();
    })
}
let tr= table.row.add([]).draw().node();    
$(tr).find('td:eq(0)').addClass('dt-control');
$(tr).find('td:eq(0)').addClass('dt-control')
