let arr = [];
$(document).ready(function () {
    let table = $('#mytable').DataTable();

    // $('.js-example-basic-multiple').select2(data);

    countryArr = [
        { id: '1', text: 'India' },
        { id: '2', text: 'Japan' }
    ];

    stateArr = [
        { id: '1', text: 'Jabalpur', cid: '1' },
        { id: '2', text: 'Ahmedabad', cid: '1' },
        { id: '3', text: 'MNO', cid: '2' },
        { id: '4', text: 'XYZ', cid: '2' }
    ];


    countryArr.forEach((ele) => {
        $('#country').append(`
        <option value="${ele.id}">${ele.text}</option>
        `)
    })

    $("#country").change(() => {
        $("#state").empty();
        $("#state").append(
            `<option selected disabled value="">Select State</option>`
        );
        let countryId = $("#country").val();
        stateArr.forEach((ele) => {
            if (ele.cid == countryId) {
                $('#state').append(`
        <option value="${ele.id}">${ele.text}</option>
        `)
            }
        })
    })
    let counter = 1
    
    $('#SaveBtn').on('click', () => {
        let abc = validate()
        if (abc) {
            let obj = {};
            obj.id = counter;
            obj.name = $('form input:eq(0)').val();
            obj.gender = $("form input[name='gender']:checked").val();
            let country = countryArr.find(obj => obj.id == $("#country").val());
            let state = stateArr.find(obj => obj.id == $("#state").val());
            obj.address = country.text + ' ' + state.text;
            obj.action = `
        <button type="button" class="btn btn-primary" id="DeleteBtn">Delete</button>&nbsp
        <button type="button" class="btn btn-primary" id="EditBtn" data-bs-toggle="modal" data-bs-target="#modalId">Edit</button>
        
        `
            arr.push(obj)
            table.row.add([obj.name, obj.gender, obj.address, obj.action]).draw();
            counter++;
            $('form').trigger('reset');
            $('#closeBtn').click();
            $('h6').empty();

        }
        // console.log(obj.name,obj.gender,obj.address);
    })

    $('#mytable').on('click', '#DeleteBtn', function () {
        const index = arr.findIndex((x) => {
            if (x.id == x) {
                return x;
            }
        })
        arr.splice(index, 1);
        table.row(index).remove();
        redraw();
    })

    function redraw() {
        table.clear().draw();
        arr.forEach((obj) => {
            table.row.add([obj.name, obj.gender, obj.address, obj.action]).draw();

        })
    }
    let row;
    $('#mytable').on('click', '#EditBtn', function (id) {
        $('#SaveBtn').hide();
        $('#UpdateBtn').show();
        row = $(this).closest('tr');
        let name = $('#name');
        name.val(row.find('td').eq(0).html());
        let genderValue = row.find('td').eq(1).html();
        $(`form input[value="${genderValue}"]`).prop("checked", true);

        let country=$('#country');
        country.val(row.find('td').eq(2).html());
      
    })

    $('#UpdateBtn').on('click', () => {
        let name = $('#name').val();
        let gender = $("form input[name='gender']:checked").val();
        let country = countryArr.find(obj => obj.id == $("#country").val());
        let state = stateArr.find(obj => obj.id == $("#state").val());
        let address = country.text + ' ' + state.text;
        row.find('td:eq(0)').html(name);
        row.find('td:eq(1)').html(gender);
        row.find('td:eq(2)').html(address);

        $('#closeBtn').click();

    })

    $('#AddBtn').on('click', () => {
        $('#SaveBtn').show();
        $('#UpdateBtn').hide();
    })
});
    function validate() {
        let name = $('#name').val();
        // let gender = $("form input[name='gender'].checked").val();
        let country = $('#country option:selected').val();
        let state = $('#state option:selected').val();
        let status = true;
        nameregex = /^[a-zA-Z\s]+$/;
        if (name == "") {
            $('#name_Loc').html(`please enter your name..`)
            status = false;
        }
        else if (!nameregex.test(name)) {
            $('#name_Loc').html(`please enter text only..`)
            status = false;
        }
        else {
            document.getElementsByClassName("name_loc").innerHTML = "  <a href='#' target='_blank'><i class='fa fa-check red-color'></i> </a>";
        }

        // if(!gender==""){
        //     $('#gender_loc').html(`please select your gender..`)
        //     status = false;
        // }
        // else {
        //     document.getElementsByClassName("gender_loc").innerHTML = "  <a href='#' target='_blank'><i class='fa fa-check red-color'></i> </a>";
        // }

        if (country == "") {
            $('#country_Loc').html(`please select your country..`)
            status = false;
        }
        else {
            document.getElementsByClassName("country_Loc").innerHTML = "  <a href='#' target='_blank'> <i class='fa fa-check red-color'></i></a>";
        }

        if (state == "") {
            $('#stateLoc').html(`please select your state..`)
            status = false;
        }
        else {
            document.getElementsByClassName("stateLoc").innerHTML = "  <a href='#' target='_blank'> <i class='fa fa-check red-color'></i></a>";
        }
        return status;
    }
