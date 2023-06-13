$('document').ready(function() {
    table=$('#tabledata').DataTable();
    let arr=[]

    $('#submitBtn').on('click', function(){
        obj={}
        obj.sno=`<p class="sno"></p>`
        obj.name=$('#myForm input:eq(0)').val();
        obj.email=$('#myForm input:eq(1)').val();
        obj.age=$('#myForm input:eq(2)').val();
        obj.address=$('#myForm input:eq(3)').val();
        obj.action=`<button type="submit" class="btn btn-primary" id="edit" data-bs-toggle="modal" data-bs-target="#modalId">Edit</button>&nbsp<button type="submit" class="btn btn-primary" id="delete">Delete</button>`
        arr.push(obj);
        console.log(arr);
        table.row.add([obj.sno,obj.name, obj.email, obj.age,obj.address,obj.action]).draw();
        $('form').trigger('reset');
        $('#close').click();
    });
    $('#tabledata').on('click','#delete',function(){
        $(this).closest('tr').remove();
    });

    $('#addDetails').on('click',function(){
        $('#submitBtn').show();
        $('#EditBtn').hide();
    });

    let row;
    $('#tabledata').on('click','#edit',function(){
        $('#EditBtn').show();
        $('#submitBtn').hide();

    });
});

