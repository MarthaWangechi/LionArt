
function fetchPosts(query) {
    const postsContainer = $('#postsContainer');

    postsContainer.empty();

    $.ajax({
        type: "POST",
        url: "FetchPosts",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ "query" : query }),
        success: async function(result) {
            if (result.posts && result.posts.length > 0) {
                console.log(result.posts)
                result.posts.forEach(post => {
                    username = post["username"]
                    artPhoto = post["art-photo"]
                    profilePhoto = post["profile-photo"]
                    title = post["title"]
                    profileName = post["profile-name"]
                    const postElement = `
                    <div class="art-block">
                        <img class="art-piece-block" src="${'/static/img/posts/' + artPhoto}">
                        <div class="art-caption-block">
                            <img class="profile-picture" src="${'/static/img/user-profile-pics/' + profilePhoto}">
                            <div class="art-caption">
                                <div class="title">
                                    ${title}
                                </div>
                                <div class="artist-bio">
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
                });
            } else {
                postsContainer.html('<p>No posts found</p>');
            }
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
            $('#error-message').text(request.responseJSON.message);
        }
    });

}

function displayPostDetails(post) {
    username = post["username"]
    artPhoto = post["art-photo"]
    profilePhoto = post["profile-photo"]
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

{/* <div class="popup">
<div class="popup-content">
    <!-- Display detailed post information -->
    <h2>${postData.title}</h2>
    <p>Username: ${postData.username}</p>
    <p>Art Photo: <img src="/static/img/posts/${postData['art-photo']}" alt="Art"></p>
    <p>Profile Photo: <img src="/static/img/user-profile-pics/${postData['profile-photo']}" alt="Profile"></p>
    <!-- Add more post details as needed -->
    <button onclick="closePopup()">Close</button>
</div>
</div> */}

$(document).ready(function() {

    var menuProfilePic = $("#menu-profile-pic")[0];
    if (user != "none") {
        var profilePicName = user["profile-photo"] === "none" ? "default.jpg" : user["profile-photo"];
        menuProfilePic.src = "/static/img/user-profile-pics/" + profilePicName;
    }  
    $('#actual-search-bar').keypress(function(event) {
        if (event.which === 13) { 
            const searchQuery = $(this).val().trim(); 
            fetchPosts(searchQuery);
        }
    });

    $('#menu-profile-pic').click(function() {
        $('.popup-menu').toggle(); 
    });
})