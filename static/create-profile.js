function renderCurrentUserInfo() {
    // user = JSON.parse(sessionStorage.getItem('user'));
    console.log("USER HERE", user)
    var profilePic = document.getElementById("profile-pic-id")
    var profilePicName = user["profile-photo"] == "none" ? "default.jpg" : user["profile-photo"]
    console.log("profilePicName", profilePicName)
    profilePic.src = "/static/img/user-profile-pics/" + profilePicName;


    var profileName = document.getElementById("profile-name-id")
    if (user["profile-name"] != "none") {
        profileName.value = user["profile-name"]
    }

    var schoolName = document.getElementById("school-name-id")
    if (user["school"] != "none") {
        schoolName.value = user["school"]
    }

    var gradYear = document.getElementById("grad-year-name-id")
    if (user["grad-year"] != "none") {
        gradYear.value = user["grad-year"]
    }

    var majorName = document.getElementById("major-name-id")
    if (user["major"] != "none") {
        majorName.value = user["major"]
    }

    var bio = document.getElementById("description-input")
    if (user["artist-bio"] != "none") {
        bio.value = user["artist-bio"]
    }

    var insta = document.getElementById("insta")
    if (user["instagram-link"] != "none") {
        insta.value = user["instagram-link"]
    }

    var portfolio = document.getElementById("portfolio")
    if (user["portfolio-link"] != "none") {
        portfolio.value = user["portfolio-link"]
    }

}

function updateUserInfo() {

    // user = JSON.parse(sessionStorage.getItem('user'));
    var updatedUserData = {}; 

    updatedUserData["profile-name"] = document.getElementById("profile-name-id").value;
    updatedUserData["school"] = document.getElementById("school-name-id").value;
    updatedUserData["grad-year"] = document.getElementById("grad-year-name-id").value;
    updatedUserData["major"] = document.getElementById("major-name-id").value;
    updatedUserData["artist-bio"] = document.getElementById("description-input").value;
    updatedUserData["instagram-link"] = document.getElementById("insta").value;
    updatedUserData["portfolio-link"] = document.getElementById("portfolio").value;

    userData = user
    for (var key in userData) {
        if (updatedUserData[key]) {
            userData[key] = updatedUserData[key];
        }
    }

    var profilePic = document.getElementById('photoInput').files[0];

    var formData = new FormData();

    if (profilePic) {
        formData.append('profilePic', profilePic)
    }

    formData.append('userData', JSON.stringify(userData))

    // sessionStorage.setItem('user', JSON.stringify(userData));

    $.ajax({
        type: "POST",
        url: "CreateProfile",
        contentType: false,
        processData: false,
        data : formData,
        success: async function(result) {
            console.log("Success! User Profile Updated!", userData);
            window.addEventListener('beforeunload', function(event) {
                sessionStorage.setItem('user', JSON.stringify(result.user));
            });
            console.log("SHELBY", JSON.parse(sessionStorage.getItem('user')))
            setTimeout(function() {
                // Redirect to the next page after 2000 milliseconds (2 seconds)
                window.location.href = '/ArtistProfile';
            }, 5000);
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

$(document).ready(function() {
    // var user = JSON.parse(sessionStorage.getItem('user'));
    renderCurrentUserInfo()
    $("#save-button-id").click(function() {
        console.log("SAVE BUTTON CLICKED")
        updateUserInfo()
    })
})