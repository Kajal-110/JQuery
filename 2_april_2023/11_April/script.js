let arr = [];
$(document).ready(function () {
    let table = $('#myTable').DataTable();

    let CountryArr = [
        { id: '1', text: "India" },
        { id: '2', text: "United States" }
    ]
    let StatesArr = [
        { id: '1', text: "Gujrat", cid: '1' },
        { id: '2', text: "Madhay Pradesh", cid: '1' },
        { id: '3', text: "MNO", cid: '2' },
        { id: '4', text: "XYZ", cid: '2' }
    ]

    CountryArr.forEach(ele => {
        $('#country').append(`
        <option value="${ele.id}">${ele.text}</option>
    `)
    })

    $('#country').change(() => {
        $('#state').empty();
        $('#state').append(`
             <option disabled selected value=""> select State</option>
        `)

        let countryid = $('#country').val()
        StatesArr.forEach(ele => {
            if (ele.cid == countryid) {
                $('#state').append(`
            <option value="${ele.id}">${ele.text}</option>
            `)
            }
        })
    })

    let counter = 1;
    $('#SaveBtn').on('click', function () {
        let abc = validate()
        if (abc) {
            let obj = {};
            obj.id = counter;
            obj.name = $('form input:eq(0)').val();
            obj.gender = $('#gender').val();
            let countryName = CountryArr.find(obj => obj.id == $('#country').val());
            let stateName1 = StatesArr.find(obj => obj.id == $('#state').val());
            obj.address = countryName.text + ', ' + stateName1.text
            obj.action = `
        <button type="button" class="btn btn-primary DeleteBtn" id="DeleteBtn">Delete</button>&nbsp
        <button type="button" class="btn btn-primary EditBtn" id="EditBtn" data-bs-toggle="modal" data-bs-target="#modalId">Edit</button>
        `
            // console.log(obj.address);
            arr.push(obj);
            $('form').trigger('reset')
            table.row.add([obj.name, obj.gender, obj.address, obj.action]).draw();
            counter++;
            $('#closeBtn').click();
            
        }
      

    })

    $('#myTable').on('click', '#DeleteBtn', function (id) {
        const index = arr.findIndex((x) => {
            if (x.id == id) {
                return x;
            }
        })
        arr.splice(index, 1);
        table.row(index).remove()
        drawAgain();
    })
    function drawAgain() {
        table.clear().draw();
        arr.forEach((obj) => {
            table.row.add([obj.name, obj.gender, obj.address, obj.action]).draw();

        })
    }
    let row;
    $('#myTable').on('click', '#EditBtn', function () {
        $('#SaveBtn').hide();
        $('#updateBtn').show();
        row = $(this).closest('tr');
        let name = $('#name');
        name.val(row.find('td:eq(0)').html());

        let gender = $('#gender')
        gender.val(row.find('td:eq(1)').html())

        let country = $('#country')
        country.val(row.find('td:eq(2)').html())

        let state = $('#state')
        state.val(row.find('td:eq(2)').html())

    })

    $('#updateBtn').on('click', function () {
        let name = $('#name').val();
        let gender = $('#gender').val();

        let countryName = CountryArr.find(obj => obj.id == $('#country').val());
        let stateName1 = StatesArr.find(obj => obj.id == $('#state').val());

        let address1 = countryName.text + ' ,' + stateName1.text
        row.find('td:eq(0)').html(name);
        row.find('td:eq(1)').html(gender);
        row.find('td:eq(2)').html(address1);


    })

    $('#AddBtn').on('click', function () {
        $('#SaveBtn').show();
        $('#updateBtn').hide();
        $('form').trigger('reset');

    })



function validate() {
    let name = $('#name').val();
    let gender = $('#gender option:selected').val();
    let country = $('#country option:selected').val();
    let state = $('#state option:selected').val();
    let status = true;
    let nameregex = /^[a-zA-Z\s]+$/;
    if (name == "") {
        document.getElementById('name_loc').innerHTML =
            "please enter your name..."
            status = false;
    }
    else if (!nameregex.test(name)) {
        document.getElementById('name_loc').innerHTML =
            "please enter text only..."
            status = false;
    }
    else {
        document.getElementsByClassName("name_loc").innerHTML = "  <a href='#' target='_blank'>  <i class='fa fa-check red-color' style='color:'red''></i></a>";
    }

    if(gender ==""){
        $('#gender_loc').html(`pleale select your gender...`);
        status = false;
    }
    else{
        document.getElementsByClassName("gender_loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color'></i></a>";
    }
    if(country==""){
        $('#country_loc').html(`pleale select your country...`);
        status = false;
    }
    else{
        document.getElementsByClassName("country_loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color'></i></a>";
    }
    if(state==""){
        $('#state_loc').html(`pleale select your state...`);
        status = false;
    }
    else{
        document.getElementsByClassName("state_loc").innerHTML = " <a href='#' target='_blank'>  <i class='fa fa-check red-color'></i></a>";

    }
   return status;

}
});