function updateOrder(id){
    $.ajax({
        url: '/orderlist/' + id,
        type: 'PUT',
        data: $('#update-order').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
