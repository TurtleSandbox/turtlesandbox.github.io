function showContacts(type) {
    switch (type) {
        case "github":
            document.getElementById("show").innerHTML = '<a href="https://github.com/caccavale">github.com/caccavale</a>';
            break;
        case "email":
            document.getElementById("show").innerHTML = '<a href="mailto:samcaccavale@gmail.com">samcaccavale@gmail.com</a>';
            break;
        default:
            document.getElementById("show").innerHTML = '<br/>';
    }
}
