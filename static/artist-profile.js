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

    var links = $('.links')
    var linksCode = '';

    if (user["instagram-link"] && user["instagram-link"] !== "none") {
        linksCode += '<a href="' + user["instagram-link"] + '" id="instagram-link"><img src="/static/img/instagram-logo.png"></a>';
    }
    
    if (user["portfolio-link"] && user["portfolio-link"] !== "none") {
        linksCode += '<a href="' + user["portfolio-link"] + '" id="personal-portfolio"><img src="/static/img/website-link.png"></a>';
    }
    console.log(user)
    console.log(linksCode)
    links.append(linksCode);

    if (user["posts"] != "none") {
        const postsContainer = $('#postsContainer');
        var posts = user["posts"]
        var spotlightImage = $('<img>').attr('src', "/static/img/posts/" + posts[posts.length - 1]["art-photo"]);
        $('.spotlight-image').append(spotlightImage);
        $('.spotlight-image').css('background-color', 'white');
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            username = user["username"]
            artPhoto = post["art-photo"]
            profilePhoto = user["profile-photo"]
            title = post["title"]
            profileName = user["profile-name"]
            const postElement = `
                    <div class="art-block">
                        <img class="art-piece-block" src="${'/static/img/posts/' + artPhoto}">
                        <div class="art-caption-block">
                            <img class="profile-picture" src="${'/static/img/user-profile-pics/' + profilePhoto}">
                            <div class="art-caption">
                                <div class="title">
                                    ${title}
                                </div>
                                <div class="artist-bio-3">
                                    ${profileName}
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                const $postElement = $(postElement)

                $postElement.on('click', function() {
                    displayPostDetails(post)
                });
                postsContainer.append($postElement);
        }
    }
} 


function displayPostDetails(post) {
    username = user["username"]
    artPhoto = post["art-photo"]
    profilePhoto = user["profile-photo"]
    title = post["title"]
    profileName = post["profile-name"]
    description = post["description"]

    tags = post["tags"]
    let tagElements = ``
    if (tags && tags.length > 0) {
        tagElements = tags.map(tag => `<div class="tag">${tag}</div>`).join('')
    }

    const popUp = `
        <div class="pop-up">
        <div class="artist-bio-2">
        <div class="navigation-bar-2">
            <div class="navigation-bar-element">
                <a href="#" class="back-button"><img class="navigation-bar-image" src="/static/img/back-button.png" alt="Back Button"></a>
            </div>
            <div class="navigation-bar-element-2">${title}</div>
        </div>
                <div class="artist-name-box">
                    <div class="artist-name">By ${profileName}</div>
                </div>
                <img class="art-piece-block-2" src="${'/static/img/posts/' + artPhoto}">
                <div class="long-intro">
                    ${description}
                </div>
                <div class="tag-list">
                    ${tagElements}
                </div>
                <div>
                <a href="/ArtistProfile/${username}"> 
                    <img class="profile-picture-2" src="${'/static/img/user-profile-pics/' + profilePhoto}">
                </a>
                </div>
        </div>
        </div>
    `;

    $('.iphone-screen').append(popUp);

    $('.back-button').on('click', function(event) {
        event.preventDefault(); 
        $('.pop-up').remove();
    });


}

$(document).ready(function() {
    var menuProfilePic = $("#menu-profile-pic")[0];
    if (user != "none") {
        var profilePicName = actualUser["profile-photo"] === "none" ? "default.jpg" : actualUser["profile-photo"];
        menuProfilePic.src = "/static/img/user-profile-pics/" + profilePicName;
    } 

    $('#menu-profile-pic').click(function() {
        $('.popup-menu').toggle(); 
    });
    
    renderArtistDetails()
})