function deleteCart(user_id, book_id){
    $.ajax({
        url: '/cart/' + user_id + '/' + book_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};