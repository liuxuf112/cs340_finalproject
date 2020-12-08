function updateAuthor(id){
    $.ajax({
        url: '/authorlist/' + id,
        type: 'PUT',
        data: $('#update-author').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
