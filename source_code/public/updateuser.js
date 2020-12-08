function updateUser(id){
    $.ajax({
        url: '/userlist/' + id,
        type: 'PUT',
        data: $('#update-user').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
