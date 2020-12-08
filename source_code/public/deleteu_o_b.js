function deleteU_O_B(user_id, order_id, book_id){
    $.ajax({
        url: '/user_order_book/' + user_id + '/' + order_id + '/' + book_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};