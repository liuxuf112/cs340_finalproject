function deleteBook_author(book_id, author_id){
    $.ajax({
        url: '/book_author/' + book_id + '/' + author_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};