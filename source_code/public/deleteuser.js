function deleteUser(id){
    $.ajax({
        url: '/userlist/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};