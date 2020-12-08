function updateBook(id){
    $.ajax({
        url: '/booklist/' + id,
        type: 'PUT',
        data: $('#update-book').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
