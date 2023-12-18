function uploadPost() {
        var title = $('.title-text').val();
        var description = $('#description-input').val();
        var tags = [];
        $('.tag-list .tag').each(function() {
            tags.push($(this).text());
        });

        var imageFile = $('#photoInput')[0].files[0];

        var formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', JSON.stringify(tags));
        if (imageFile) {
            formData.append('image', imageFile);
        }

        $.ajax({
            type: "POST",
            url: "UploadArt",
            contentType: false,
            processData: false,
            data: formData,
            success: function(result) {
                console.log("Success! Artwork Uploaded!", userData);
                window.addEventListener('beforeunload', function(event) {
                    sessionStorage.setItem('user', JSON.stringify(result.user));
                });
                console.log("SHELBY", JSON.parse(sessionStorage.getItem('user')))
                setTimeout(function() {
                    // Redirect to the next page after 5000 milliseconds (5 seconds)
                    window.location.href = '/ArtistProfile';
                }, 5000);
            },
            error: function(xhr, status, error) {
                console.log("Error uploading artwork");
                console.log(xhr);
                console.log(status);
                console.log(error);
                // Handle errors here
            }
        });
}

$(document).ready(function() {
    const addTagButton = $('.add-tag');
    const tagForm = $('.tag-form');
    const tagList = $('.tag-list');

    addTagButton.on('click', function() {
        tagForm.removeClass('hidden');
    });

    $('#new-tag-input').on('keypress', function(event) {
        if (event.which === 13) { // Check if the Enter key is pressed
            event.preventDefault(); // Prevent default form submission
            const newTagText = $(this).val().trim();
            if (newTagText !== '') {
                const tagExists = tagList.find('.tag').filter(function() {
                    return $(this).text().toLowerCase() === newTagText.toLowerCase();
                }).length > 0;

                if (!tagExists) {
                    const newTag = $('<div class="tag"></div>').text(newTagText);
                    tagList.append(newTag);
                    newTag.on('click', function() {
                        $(this).remove();
                    });
                }
            }
            // Reset input and hide the form
            $('#new-tag-input').val('');
            tagForm.addClass('hidden');
        }
    });

    // Event listener to remove tags when clicked
    tagList.on('click', '.tag', function() {
        $(this).remove();
    });

    $('#uploadIcon').on('click', function() {
        $('#photoInput').click();
    });

    $('#photoInput').on('change', function(e) {
        // Handle the selected file here if needed
        const selectedFile = e.target.files[0];
        console.log('Selected file:', selectedFile);
    });

    $('#upload-button').on('click', function() {
        uploadPost()
    });
});
