function updateBook(id){
    $.ajax({
        url: '/cart/' + id,
        type: 'PUT',
        data: $('#update-cart').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
