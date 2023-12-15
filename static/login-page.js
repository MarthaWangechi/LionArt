function login(username, password) {
    var userData = {
        "username": username,
        "password": password
    }

    $.ajax({
        type: "POST",
        url: "Login", 
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(userData),
        success: function(result) {
            console.log("Success! User Logged in!", userData);
            $('#error-message').text("");
            window.location.href = '/LandingPage'; 
        },
        error: function(xhr, status, error) {
            console.log("Error");
            console.log(xhr.responseJSON.message);
            $('#error-message').text(xhr.responseJSON.message);
        }
    });
}

$(document).ready(function(){

    $("#loginButton").click(function(){
        console.log("SHELBY LOGIN BUTTON CLICKED")
        var username = $("#username").val()
        var password = $("#password").val()
        login(username, password);
    })
})