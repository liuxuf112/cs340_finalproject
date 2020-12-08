function filter() {
    //get the value from the filter dropdown.
    var filter_category = document.getElementById('search-by').value;
    var search_key_word = document.getElementById('search-bar-input').value;

    //construct the URL and redirect to it
    if (filter_category=="author"){
        window.location = '/booklist/filter/author/' + encodeURI(search_key_word);
    }else if(filter_category == "name"){
        window.location = '/booklist/filter/name/' + encodeURI(search_key_word);
    }else if(filter_category == "category"){
        window.location = '/booklist/filter/category/' + encodeURI(search_key_word);
    }else{
        console.log("pls select something");
    }
}
