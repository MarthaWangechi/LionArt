
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
                    <a href = "${'/ArtistProfile/' + username}">
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
                </a>
                    `;
                    postsContainer.append(postElement);
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

$(document).ready(function() {
    $('#actual-search-bar').keypress(function(event) {
        if (event.which === 13) { 
            const searchQuery = $(this).val().trim(); 
            fetchPosts(searchQuery);
        }
    });
})