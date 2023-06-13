function format() {
    let sub = $('#subject').val();
    console.log(sub);
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" id="childTBL" class=" ">' +
        '<thead><tr><th >Subject</th></tr></thead>' +
        '<tbody><tr><td> ' + sub + `</td></tr></tbody>` +
        '</table>'
    );

}
let arr = [];
$(document).ready(function () {
    let table = $('#myTable').DataTable();

    GenderArr = [
        { id: '1', text: 'Male' },
        { id: '2', text: 'Female' }
    ]
    // console.table(GenderArr);
    ServiceArr = [
        { id: '1', text: 'xyz', gid: '1' },
        { id: '2', text: 'mno', gid: '1' },
        { id: '3', text: 'PQR', gid: '2' },
        { id: '4', text: 'ABC', gid: '2' },
    ]
    GenderArr.forEach(element => {
        $('#gender').append(`
        <option value="${element.id}">${element.text}</option>
        `)
    });
    $('#gender').change(() => {
        $('#services').empty();
        $('#services').append(`
        <option selected disabled value="">select services</option
        `)
        let genderid = $('#gender').val();
        ServiceArr.forEach(element => {
            if (element.gid === genderid) {
                $('#services').append(`
                <option value="${element.id}">${element.text}</option>
                `)
            }
        })
    })

    
    $('#submitBtn').on('click', function () {

        let abc = validate();
        if (abc) {
            obj = {};
            obj.name = $('form input:eq(0)').val();
            obj.contact = $('form input:eq(1)').val();
            gender = GenderArr.find(obj => obj.id == $('#gender').val());
            service = ServiceArr.find(obj => obj.id == $('#services').val());
            obj.cont = gender.text;
            obj.serv = service.text;
            obj.action = ` <button type="button" class="btn btn-info btn-sm" id="deleteBtn">Delete</button>&nbsp
        <button type="button" class="btn btn-info btn-sm" id="editBtn" data-bs-toggle="modal" data-bs-target="#modalId">Edit</button>
        <button type="button" class="btn btn-danger btn-sm" id="AddressBtn" data-bs-toggle="modal" data-bs-target="#modalId2">Address</button>`
        arr.push(obj);
        let tr = table.row.add([obj.name, obj.contact, obj.cont, obj.serv, obj.action]).draw().node;
            $(tr).find("td:eq(0)").addClass('dt-control');

            $('#close').click();
            $('form').trigger('reset');
        }

    })
    $('#myTable').on('click', '#deleteBtn', function () {
        var row = $(this).parents('tr');
        table.row(row).remove().draw();
    });

    // $('#AddressBtn').on('click',function(){
    //     $('#closebtn').click();
    // })
    let row;
    $('#myTable').on('click', '#editBtn', function () {
        $('#submitBtn').hide();
        $('#btnEdit').show();
        row = $(this).closest('tr');
        let name = $('#name');
        name.val(row.find('td').eq(0).html());

        let contact = $('#contact');
        contact.val(row.find('td').eq(1).html());
    });


    $('#btnEdit').on('click', function () {
        let name = $('#name').val();
        let contact = $('#contact').val();
        gender = GenderArr.find(obj => obj.id == $('#gender').val());
        service = ServiceArr.find(obj => obj.id == $('#services').val());
        let cont = gender.text;
        let serv = service.text;

        row.find('td').eq(0).html(name);
        row.find('td').eq(1).html(contact);
        row.find('td').eq(2).html(cont);
        row.find('td').eq(3).html(serv);

        $('#close').click();

    })

    $('#AddData').click(function () {
        $('#submitBtn').show();
        $('#btnEdit').hide();
        $('form').trigger('reset');

    });

    $('#myTable tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    function validate() {
        let name = $('#name').val();
        let contact = $('#contact').val();

        let status = true;

        let regex = /^[a-zA-Z\s]+$/;
        if (name == "") {
            document.getElementById("name_Loc").innerHTML =
                "Please enter Name...";

            status = false;
        }
        else if (!regex.test(name)) {
            document.getElementById("name_Loc").innerHTML =
                "Please enter only Text...";

            status = false;
        }
        else {
            document.getElementById("name_Loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color' style='color:'red''></i></a>";
            // status = true;
        }

        if (contact == "") {
            document.getElementById("contact_Loc").innerHTML =
                "Please enter Name...";

            status = false;
        }
        else {
            document.getElementById("contact_Loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color' style='color:'red''></i></a>";
            // status = true;
        }
        return status;
    }

    
});

const person={
    fullName:function(city, country){
        return this.firstName +" "+this.lastName + "," + city + "," + country;
    }
}
const person1={
    
    firstName: "John",
    lastName: "Doe"
}

const person2={
    
    firstName: "Kajal",
    lastName: "Patel"
}


console.log(person.fullName.call(person1,"Jabalpur", "MP"));
console.log(person.fullName.apply(person2, ["Oslo", "Norway"]));

