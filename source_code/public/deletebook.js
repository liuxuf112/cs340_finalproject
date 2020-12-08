function deleteBook(id){
    $.ajax({
        url: '/booklist/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};