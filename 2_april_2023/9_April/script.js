Arr = [];
$('document').ready(function () {
    let table = $('#mytable').DataTable();

    let Full_and_Half_time = [
        { id: '1', text: 'Full Time' },
        { id: '2', text: 'Half Time' }

    ];
    let FirstHalf_and_SecondHalf = [
        { id: '1', text: 'FirstHalf', FHid: 2 },
        { id: '2', text: 'SecondHalf', FHid: 2 }
    ];

    Full_and_Half_time.forEach(ele => {
        $('#time').append(
            `<option  value="${ele.id}">${ele.text}</option>`
        )
    })
    $('#time').change(() => {
        $('#time1').empty();
        $('#time1').append(
            ` <option selected disabled value="">Select YOUR HALF TIME</option>`
        )
        let tid = $('#time').val();

        FirstHalf_and_SecondHalf.forEach(ele => {
            if (ele.FHid == tid) {
                $('#time1').append(
                    `<option  value="${ele.id}">${ele.text}</option>`
                )
            }
        })
    })


    let counter = 1;
    $('#saveBtn').on('click', function () {
        let abc = validate();
        if (abc) {
            obj = {};
            obj.id = counter
            obj.name = $('form input:eq(0)').val();
            obj.email = $('form input:eq(1)').val();
            obj.dob = $('form input:eq(2)').val();
            obj.ticketdate = $('form input:eq(3)').val();
            let fulltime = Full_and_Half_time.find(obj => obj.id == $('#time').val());
            let halftime = FirstHalf_and_SecondHalf.find(obj => obj.id == $('#time1').val());
            if (fulltime.id == "1") {
                obj.time = fulltime.text

            }
            else {
                obj.time = fulltime.text + ' , ' + halftime.text;

            }
            obj.action = `<button type="button" class="btn btn-primary" id="DeleteBtn">Delete</button>&nbsp
         <button type="button" class="btn btn-primary" id="EditBtn" data-bs-toggle="modal" data-bs-target="#modalId">Edit</button>`

            Arr.push(obj);
            table.row.add([obj.name, obj.email, obj.dob, obj.ticketdate, obj.time, obj.action]).draw(false);
            counter++;
            $('#closeBtn').click();
            $('form').trigger('reset');
        }
    })

    $('#mytable').on('click', '#DeleteBtn', function (id) {
        confirm('Are you sure you want to delete');
        const index = Arr.findIndex((x) => {
            if (x.id == id) {
                return x
            }
        }
        )
        Arr.splice(index, 1)
        table.row(index).remove();
        redraw();

    })

    function redraw() {
        table.clear().draw();
        Arr.forEach((obj) => {
            table.row.add([obj.name, obj.email, obj.dob, obj.ticketdate, obj.time, obj.action]).draw(false);
        })
    }

    let row;
    $('#mytable').on('click', '#EditBtn', function () {
        $('#saveBtn').hide();
        $('#update').show();
        row = $(this).closest('tr');
        let name = $('#name');
        name.val(row.find('td').eq(0).html());

        let email = $('#email');
        email.val(row.find('td').eq(1).html());

        let dob = $('#dob');
        dob.val(row.find('td').eq(2).html());

        let ticket = $('#ticket');
        ticket.val(row.find('td').eq(3).html());




    })
    $('#update').on('click', function () {
        let name = $('#name').val();
        let email = $('#email').val();
        let dob = $('#dob').val();
        let ticketdate = $('#ticket').val();

        row.find('td').eq(0).html(name);
        row.find('td').eq(1).html(email);
        row.find('td').eq(2).html(dob);
        row.find('td').eq(3).html(ticketdate);
        let fulltime = Full_and_Half_time.find(obj => obj.id == $('#time').val());
        let halftime = FirstHalf_and_SecondHalf.find(obj => obj.id == $('#time1').val());
        if (fulltime.id == "1") {
            let time = fulltime.text
            row.find('td').eq(4).html(time);
        }
        else {
            let time = fulltime.text + ' , ' + halftime.text;
            row.find('td').eq(4).html(time);
        }



        $('closeBtn').click();
    })

    $('#addBtn').on('click', function () {
        $('form').trigger('reset');

        $('#saveBtn').show();
        $('#update').hide();

    })

    function validate() {
        let name = $('#name').val();
        let email = $('#email').val();
        let dob = $('#dob').val();
        let ticketdate = $('#ticket').val();
        let fulltime = $('#time option:selected').val();
        let halftime = $('#time1 option:selected').val();
        let nameregex = /^[a-zA-Z\s]+$/;
        let emailregex = /(^$|^.*@.*\..*$)/;
        let status = true;

        if (name == "") {
            document.getElementById("name_Loc").innerHTML =
                "Please enter Name...";

            status = false;
        }
        else if (!nameregex.test(name)) {
            document.getElementById("name_Loc").innerHTML =
                "Please enter only Text...";

            status = false;
        }
        else {
            document.getElementById("name_Loc").innerHTML = " <a href='#' target='_blank'> </a>";
        }

        if (email == "") {
            document.getElementById("email_Loc").innerHTML =
                "Please enter Name...";

            status = false;
        }
        else if (!emailregex.test(email)) {
            document.getElementById("email_Loc").innerHTML =
                "Please enter valid Email...";

            status = false;
        }
        else {
            document.getElementById("email_Loc").innerHTML = " <a href='#' target='_blank'> </a>";
        }

        if (dob == "") {
            document.getElementById("dob_Loc").innerHTML =
                "Please select Date of Birth";

            status = false;
        } else {
            document.getElementById("dob_Loc").innerHTML = " <a href='#' target='_blank'> </a>";
            // status = true;
        }

        if (ticketdate == "") {
            document.getElementById("ticket_Loc").innerHTML =
                "Please select Ticket Booking Date";

            status = false;
        } else {
            document.getElementById("ticket_Loc").innerHTML = " <a href='#' target='_blank'> </a>";
            // status = true;
        }


        if (fulltime == "") {
            document.getElementById("FH_Loc").innerHTML =
                "Please select ";

            status = false;
        } else {
            document.getElementById("FH_Loc").innerHTML = " <a href='#' target='_blank'> </a>";
            // status = true;
        }

        // if (halftime ==  "") {
        //     document.getElementById("FS_Loc").innerHTML =
        //         "Please select ";

        //     status = false;
        // } else {
        //     document.getElementById("FS_Loc").innerHTML = " <a href='#' target='_blank'> </a>";
        //     // status = true;
        // }
        return status;
    }

});