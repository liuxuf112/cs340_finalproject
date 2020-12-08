function deleteOrder(id){
    $.ajax({
        url: '/orderlist/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};