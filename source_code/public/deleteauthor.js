function deleteAuthor(id){
    $.ajax({
        url: '/authorlist/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};