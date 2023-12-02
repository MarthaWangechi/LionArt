# LionArt
To run our website locally: python server.py

We referenced the lecture notes from the flask lecture to write server.py. We also referenced the lecture notes from the javascript/html
lecture. We also consulted stack overflow when we were having trouble linking out html views together on our local server. We referenced
stack overflow for other small html issues as well.

We used flask and so far we created html and css files for all of the major screens of our app. We have not yet added any dynamic content that
would require using javascript. This means we have not yet implemented our menu in the upper right hand corner for navigating between screens.
However most of the other buttons work (log in, create account, discover more, clicking on an art piece, clicking on an artist profile image, etc.)

All screens are easily accessible via their URLS though:
Route	             HTML File
/                    login-page.html
/ArtistProfile	     artist-profile.html
/CreateAccount	     create-account.html
/CreateProfile	     create-profile.html
/LandingPage	     landing-page.html
/Login	             login-page.html
/MyArt	             my-art.html
/UploadArt	         upload-art.html