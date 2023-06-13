$(document).ready(function () {
    let table = $('#tableData').DataTable();

    countryArr = [
        { id: '1', text: 'India' },
        { id: '2', text: 'USA' },
        { id: '3', text: 'Canada' }
    ];

    collageArr = [
        { id: '1', text: 'GGCT', cid: '1' },
        { id: '2', text: 'LNCT', cid: '1' },
        { id: '3', text: 'Jawaharlal Nehru Krishi Vishwa Vidyalaya', cid: '2' },
        { id: '4', text: 'Hitkarini Dental College & Hospital', cid: '2' },
        { id: '5', text: 'British Columbia Institute of Technology', cid: '3' },
        { id: '6', text: 'Northern Alberta Institute of Technology', cid: '3' }

    ];
    courseArr = [
        { id: '1', text: 'B.Tech', cid: '1', collid: '1' },
        { id: '2', text: 'M.Tech', cid: '1', collid: '1' },
        { id: '3', text: 'BSC', cid: '1', collid: '2' },
        { id: '4', text: 'MCA', cid: '1', collid: '2' },

        { id: '5', text: 'B.Tech', cid: '2', collid: '3' },
        { id: '6', text: 'MBA', cid: '2', collid: '3' },
        { id: '7', text: 'BSC', cid: '2', collid: '4' },
        { id: '8', text: 'CA', cid: '2', collid: '4' },

        { id: '9', text: 'B.Tech', cid: '3', collid: '5' },
        { id: '10', text: 'MSC', cid: '3', collid: '5' },
        { id: '11', text: 'MBA', cid: '3', collid: '6' },
        { id: '12', text: 'MCA', cid: '3', collid: '6' },

    ];

    countryArr.forEach(element => {
        $('#country').append(`
        <option value="${element.id}">${element.text}</option>
        `)
    });
    $('#country').change(() => {
        $('#collage').empty();
        $('#collage').append(`
         <option selected disabled value="">Select State</option>`
        );

        $('#course').empty();
        $('#course').append(`
         <option selected disabled value="">Select State</option>`
        );

        let countryid=$('#country').val();
        collageArr.forEach(element=>{
            if(element.cid==countryid){
                $('#collage').append(`
                <option value="${element.id}">${element.text}</option>
                `)
            }
        })
    });

    $('#collage').change(() => {
        $('#course').empty();
        $('#course').append(`
         <option selected disabled value="">Select Course</option>`
        );

        let collageid=$('#collage').val();
        courseArr.forEach(element=>{
            if(element.collid==collageid){
                $('#course').append(`
                <option value="${element.id}">${element.text}</option>
                `)
            }
        })
    });
    let arr=[];
    $('#saveBtn').on('click', () => {
        let obj={}
        obj.name=$('form input:eq(0)').val();
        let Country= countryArr.find(obj=>obj.id==$('#country').val());
        let Collage1= collageArr.find(obj=>obj.id==$('#collage').val());
        let Course1= courseArr.find(obj=>obj.id==$('#course').val());
        obj.country= Country.text;
        obj.collage= Collage1.text;
        obj.course= Course1.text;
        obj.action=` <button type="button" class="btn btn-primary" id="DeleteBtn">Delete</button>`+
                   ` <button type="button" class="btn btn-primary" id="EditBtn">Edit</button>`
        arr.push(obj)
        table.row.add([obj.name, obj.country,obj.collage,obj.course,obj.action]).draw();
        // let a= arr.length;
        // console.log(a);
        // console.table(obj);
        $('form').trigger('reset');
        $('#close').click();
    });

    $('#tableData').on('click','#DeleteBtn',function(){
        let row= $(this).parents('tr');
        table.row(row).remove().draw();
    });
    
    $('#tableData').on('click','#EditBtn',function(){
        let row =$('this').closest('tr');
    });
});