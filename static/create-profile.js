function renderCurrentUserInfo() {
    // user = JSON.parse(sessionStorage.getItem('user'));
    console.log("USER HERE", user)
    var profilePic = $("#profile-pic-id");
    var profilePicName = user["profile-photo"] == "none" ? "default.jpg" : user["profile-photo"];
    console.log("profilePicName", profilePicName);
    profilePic.attr("src", "/static/img/user-profile-pics/" + profilePicName);

    var profileName = $("#profile-name-id");
    if (user["profile-name"] != "none") {
        profileName.val(user["profile-name"]);
    }

    var schoolName = $("#school-name-id");
    if (user["school"] != "none") {
        schoolName.val(user["school"]);
    }

    var gradYear = $("#grad-year-name-id");
    if (user["grad-year"] != "none") {
        gradYear.val(user["grad-year"]);
    }

    var majorName = $("#major-name-id");
    if (user["major"] != "none") {
        majorName.val(user["major"]);
    }

    var bio = $("#description-input");
    if (user["artist-bio"] != "none") {
        bio.val(user["artist-bio"]);
    }

    var insta = $("#insta");
    if (user["instagram-link"] != "none") {
        insta.val(user["instagram-link"]);
    }

    var portfolio = $("#portfolio");
    if (user["portfolio-link"] != "none") {
        portfolio.val(user["portfolio-link"]);
    }


}

function updateUserInfo() {

    // user = JSON.parse(sessionStorage.getItem('user'));
    var updatedUserData = {}; 

    updatedUserData["profile-name"] = $("#profile-name-id").val();
    updatedUserData["school"] = $("#school-name-id").val();
    updatedUserData["grad-year"] = $("#grad-year-name-id").val();
    updatedUserData["major"] = $("#major-name-id").val();
    updatedUserData["artist-bio"] = $("#description-input").val();
    updatedUserData["instagram-link"] = $("#insta").val();
    updatedUserData["portfolio-link"] = $("#portfolio").val();

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
                // Redirect to the next page after 5000 milliseconds (5 seconds)
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