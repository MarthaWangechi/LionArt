function renderArtistDetails() {
    console.log("SHELBY USER", user)
    var profilePic = document.getElementById("artist-profile-pic")
    var profilePicName = user["profile-photo"] == "none" ? "default.jpg" : user["profile-photo"]
    profilePic.src = "/static/img/user-profile-pics/" + profilePicName;


    var profileName = document.getElementById("artist-name")
    if (user["profile-name"] != "none") {
        profileName.textContent = user["profile-name"]
    }

    var majorName = document.getElementById("major-name-id")
    if (user["major"] != "none") {
        majorName.textContent  = user["major"]
    }

    var schoolName = document.getElementById("school-name-id")
    if (user["school"] != "none") {
        schoolName.textContent = user["school"]
    }

    var gradYear = document.getElementById("grad-year-name-id")
    if (user["grad-year"] != "none") {
        gradYear.textContent  = user["grad-year"]
    }

    var bio = document.getElementById("artist-bio")
    if (user["artist-bio"] != "none") {
        bio.textContent  = user["artist-bio"]
    }

    // var insta = document.getElementById("insta")
    // if (user["instagram-link"] != "none") {
    //     insta.value = user["instagram-link"]
    // }

    // var portfolio = document.getElementById("portfolio")
    // if (user["portfolio-link"] != "none") {
    //     portfolio.value = user["portfolio-link"]
    // }
}

$(document).ready(function() {
    renderArtistDetails()
})