function format() {
    let Disease = $('#Disease').val();
    let Doctor = $('#Doctor').val();
    let Medicine = $('#Medicine').val();
    let Follow = $('#Follow').val();
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" id="childTBL" class=" ">' +
        '<thead><tr><th >S.No </th><th>Disease </th><th>Doctor</th><th>Medicine </th><th> Follow </tr></thead>' +
        '<tbody><tr><td class="sno"> </td><td> ' + Disease + `</td><td>` + Doctor + `</td><td>` + Medicine + `</td><td>` + Follow + `</td></tr></tbody>` +
        '</table>'
    );
}

$(document).ready(function () {
    var table = $('#example').DataTable();

    $('#AddButton').on('click', function () {
        $('#SubmitBtn').show();
        $('#EditBtn').hide();
    })


    $('#SubmitBtn').on('click', function () {

            let Name = $('#Name').val();
            // let Email = $('#Email').val();
            let Contact = $('#Contact').val();

            function findAge() {
                let DOB1 = $('#DOB').val();
                let DOB2 = new Date(DOB1).getFullYear();
                let DOB3 = new Date().getFullYear();
                let DOB4 = DOB3 - DOB2;
               
                return DOB4;
            }
            // console.log(findAge());
            let Address = $('#Country').val() + '   , ' + $('#State').val() + '  , ' + $('#City').val();
            let obj = {
                name: Name,
                dob: findAge(),
                contact: Contact,
                address: Address,
                action: `<button class="btn btn-primary btn-sm" id="AddTreatment" data-bs-toggle="modal" data-bs-target="#myModal2">Add Treatment</button> &nbsp
                    <button class="btn btn-primary btn-sm edit" id="edit" data-bs-toggle="modal" data-bs-target="#myModal" >Edit</button> &nbsp 
                    <button class="btn btn-info btn-sm  delete" id="delete">Delete</button>`

            }
            let tr = table.row.add(["", obj.name, obj.dob, obj.contact, obj.address, obj.action]).draw().node();
            $(tr).find("td:eq(0)").addClass('dt-control');
            $('form').trigger('reset');
       
    });

    // $('#NextBtn').on('click', function () {
    //     let Disease = $('#Disease').val();
    //     let Doctor = $('#Doctor').val();
    //     let Medicine = $('#Medicine').val();
    //     let Follow = $('#Follow').val();
    //     let obj = {
    //         Sno:`<p class="sno"></p>`,
    //         Disease: Disease,
    //         Doctor: Doctor,
    //         Medicine: Medicine,
    //         Follow: Follow
    //     }
    // $('#childTBL').append(  `<tbody><tr><td> ` + obj.Sno +`</td><td> ` + obj.Disease +`</td><td>` + obj.Doctor +`</td><td>` +obj.Medicine+`</td><td>` + obj.Follow +`</td></tr></tbody>`);

    // })

    $('#example').on('click', '#delete', function () {
        $(this).closest('tr').remove();
    });

    let row;
    $('#example').on('click', '#edit', function () {
        $('#SubmitBtn').hide();
        $('#EditBtn').show();
        row = $(this).closest('tr');
        let Name = $('#Name');
        Name.val(row.find('td').eq(1).html());


        let Email = $('#Email');
        Email.val(row.find('td').eq(2).html());

        let Contact = $('#Contact');
        Contact.val(row.find('td').eq(3).html());
    });

    $('#EditBtn').on('click', function () {
        let Name = $('#Name').val();
        let Contact = $('#Contact').val();
        let Address = $('#Country').val() + '    ' + $('#State').val() + '   ' + $('#City').val();
        let DOB1 = $('#DOB').val();
        let DOB2 = new Date(DOB1).getFullYear();
        let DOB3 = new Date().getFullYear();
        let Age = DOB3 - DOB2;

        row.find('td').eq(1).html(Name);
        row.find('td').eq(2).html(Age);
        row.find('td').eq(3).html(Contact);
        row.find('td').eq(4).html(Address);

    });


    $('#example tbody').on('click', 'td.dt-control', function () {
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


});


// function validate() {
//     let Name = $('#Name').val();
//     var status = true;
//     if (Name = "") {
//         // $('.LOC').html( 'Please enter your name ');
//         document.getElementsByClassName("LOC").innerHTML =
//             "Please enter your name ";
//         status = false;
//     } else {
//         document.getElementsByClassName("LOC").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color'></i></a>";

//         return status;
//     }
// }