function createUser(username, password) {
    console.log("SHELBY CREATE USER")
    var userData = {
        "username": username,
        "password": password
    }

    console.log("SHELBY USER DATA", userData)

    $.ajax({
        type: "POST",
        url: "CreateAccount",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(userData),
        success: function(result) {
            console.log("Sucess! User Created!", userData);
            window.location.href = '/LandingPage';
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
            $('#error-message').text(request.responseJSON.message);
        }
    });
}

$(document).ready(function(){

    $("#loginButton").click(function(){
        console.log("SHELBY LOGIN BUTTON CLICKED")
        var username = $("#username").val()
        var password = $("#password").val()

        createUser(username, password);
    })
})
