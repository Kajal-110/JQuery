
let arr=[];
$(document).ready(function () {
    var table = $('#mytable').DataTable();

    function format(index) {
        let subject = arr[index].subject;
        // console.log(subject);
    
        return (
            '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" id="childTBL" class=" ">' +
            '<thead><tr><th >Subject</th></tr></thead>' +
            '<tbody><tr><td> ' + subject + `</td></tr></tbody>` +
            '</table>'
        );
    }

    $('#SubmitBtn').on('click', function() {
     
        let abc= validate()
        if(abc){
        let obj = {};
        // obj.sno = ``
        obj.name = $('form input:eq(0)').val();
        obj.email = $('form input:eq(1)').val();
        obj.contact = $('form input:eq(2)').val();
        obj.dob = $('form input:eq(3)').val();
        let country = CountryArr.find(obj => obj.id == $("#country").val());
        let state1 = state.find(obj => obj.id == $("#state").val());
        let city1 = cityArr.find(obj => obj.id == $("#city").val());
        obj.Address = country.text + ' ' + state1.txt + ' ' + city1.text;

        obj.action = `<button type="button" class="btn btn-primary edit" id="edit" data-bs-toggle="modal" data-bs-target="#myModal" >Edit</button>` +
            `&nbsp<button class="btn btn-outline-danger deleteBtn" type="button"  >Delete</button>`;
        obj.subject=$('#subject').val();
        arr.push(obj);
        $('#close').click();
        let tr =table.row.add(['',obj.name, obj.email, obj.contact, obj.dob, obj.Address, obj.action]).draw().node();
        $(tr).find("td:eq(0)").addClass('dt-control');

        $('form').trigger('reset');
    }
        
    })

    var CountryArr =
        [{ id: '1', text: 'India' },
        { id: '2', text: 'Canada' },
        { id: '3', text: 'Russia' }];


    var state = [
        { id: '1', txt: 'J&K', cid: '1' },
        { id: '2', txt: 'Gujarat', cid: '1' },
        { id: '3', txt: 'Alberta', cid: '2' },
        { id: '4', txt: 'British Columbia', cid: '2' },
        { id: '5', txt: 'Altai Territory', cid: '3' },
        { id: '6', txt: 'Amur Region', cid: '3' },
    ]

    CountryArr.forEach(ele => {
        $("#country").append(`
        <option value="${ele.id}">${ele.text}</option>    
        `)
    })

    $("#country").change(() => {
        $("#state").empty();
        $("#state").append(
            `<option selected disabled value="">Select State</option>`
        );
        $("#city").empty();
        $("#city").append(
            `<option selected disabled value="">Select City</option>`
        );
        let countryId = $("#country").val();
        state.forEach(ele => {
            if (ele.cid == countryId) {
                $("#state").append(`
            <option value="${ele.id}">${ele.txt}</option>    
            `)
            }
        })


    })
    var cityArr =
        [{ id: '1', text: 'Jammu', sid: '1', cid: '1' },
        { id: '2', text: 'Katra', sid: '1', cid: '1' },
        { id: '3', text: 'Ahmedabad', sid: '2', cid: '1' },
        { id: '4', text: 'Rajkot', sid: '2', cid: '1' },

        { id: '5', text: 'abc', sid: '3', cid: '2' },
        { id: '6', text: 'xyz', sid: '3', cid: '2' },
        { id: '7', text: 'mno', sid: '4', cid: '2' },
        { id: '8', text: 'pqr', sid: '4', cid: '2' },

        { id: '9', text: 'abc', sid: '5', cid: '3' },
        { id: '10', text: 'xyz', sid: '5', cid: '3' },
        { id: '11', text: 'mno', sid: '6', cid: '3' },
        { id: '12', text: 'pqr', sid: '6', cid: '3' }
        ];

    $("#state").change(() => {
        $("#city").empty();
        $("#city").append(
            `<option selected disabled value="">Select City</option>`
        );
        let stateid = $("#state").val();
        cityArr.forEach(ele => {
            if (ele.sid == stateid) {
                $("#city").append(`<option value="${ele.id}">${ele.text}</option>`)
            }
        })
    })

    $('#mytable').on('click','.deleteBtn', function(ele){
        var row = $(this).parents('tr');
        table.row(row).remove().draw();
    })

    
    let row;
    $('#mytable').on('click', '.edit', function () {
        $('#SubmitBtn').hide();
        $('#EditBtn').show();
        row = $(this).closest('tr');
        let name = $('#name');
        name.val(row.find('td').eq(0).html());

        let email = $('#email');
        email.val(row.find('td').eq(1).html());

        let contact = $('#contact');
        contact.val(row.find('td').eq(2).html());

        let dob = $('#dob');
        dob.val(row.find('td').eq(3).html());
   


    })
    $('#EditBtn').on('click', function () {
               // console.log(1);
        let name = $('#name').val();
        let email = $('#email').val();
        let contact = $('#contact').val();
        let dob = $('#dob').val();
        let country = CountryArr.find(obj => obj.id == $("#country").val());
        let state1 = state.find(obj => obj.id == $("#state").val());
        let city1 = cityArr.find(obj => obj.id == $("#city").val());
        let Address = country.text + ' ' + state1.txt + ' ' + city1.text;

        row.find('td').eq(1).html(name);
        row.find('td').eq(2).html(email);
        row.find('td').eq(3).html(contact);
        row.find('td').eq(4).html(dob);
        row.find('td').eq(5).html(Address);


        $('#close').click();


    });

    $('#AddButton').click(function () {
        $('#SubmitBtn').show();
        $('#EditBtn').hide();
        $('form').trigger('reset');

    });

    $('#mytable tbody').on('click', 'td.dt-control', function () {
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
       
})
function validate() {
    let name = $('#name').val();
    let email = $('#email').val();
    let contact = $('#contact').val();
    let dob = $('#dob').val();
    let subject= $('#subject').val();

    let status = true;

    let regex= /^[a-zA-Z\s]+$/;
    if (name == ""  ) {
        document.getElementById("name_Loc").innerHTML =
            "Please enter Name...";

        status = false;
    }
    else if(!regex.test(name)) {
        document.getElementById("name_Loc").innerHTML =
        "Please enter only Text...";    

    status = false;
    }
    else {
        document.getElementById("name_Loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color' style='color:'red''></i></a>";
        // status = true;
    }
    let regex1= /(^$|^.*@.*\..*$)/
    if (email == "") {
        document.getElementById("email_Loc").innerHTML =
            "Please enter Email...";

        status = false;
    }
    else if(!regex1.test(email)) {
        document.getElementById("email_Loc").innerHTML =
        "Please enter valid email...";    

    status = false;
    }
     else {
        document.getElementById("email_Loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color' style='color:'red''></i></a>";
        // status = true;
    }

    let regex2= /^\d*(?:\.\d{1,2})?$/;

    if (contact == "") {
        document.getElementById("contact_Loc").innerHTML =
            "Please enter Contact Number";

        status = false;
    }
    else if(!regex2.test(contact)) {
        document.getElementById("email_Loc").innerHTML =
        "Please enter valid email...";    

    status = false;
    }
    else {
        document.getElementById("contact_Loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color' style='color:'red''></i></a>";
        // status = true;
    }

    if (dob == "") {
        document.getElementById("dob_Loc").innerHTML =
            "Please select Date";

        status = false;
    } else {
        document.getElementById("dob_Loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color' style='color:'red''></i></a>";
        // status = true;
    }

    if (subject == "") {
        document.getElementById("subject_Loc").innerHTML =
            "Please enter subject";

        status = false;
    } else {
        document.getElementById("subject_Loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color' style='color:'red''></i></a>";
        // status = true;
    }

    return status;
}