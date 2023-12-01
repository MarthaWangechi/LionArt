from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

app = Flask(__name__)

@app.route('/')
def display_start_page():
    return render_template('login-page.html')

# TODO: Change this route to include the username once page is dynamic
@app.route('/ArtistProfile') 
def display_artist_profile():
    return render_template('artist-profile.html')

@app.route('/CreateAccount')
def display_create_account():
    return render_template('create-account.html')

@app.route('/CreateProfile')
def display_create_profile():
    return render_template('create-profile.html')

@app.route('/LandingPage', methods=['GET','POST'])
def display_landing_page():
    return render_template('landing-page.html')

@app.route('/Login', methods=['GET','POST'])
def display_login_page():
    return render_template('login-page.html')

# TODO: Combine this page with Artist Profile page
@app.route('/MyArt')
def display_my_art():
    return render_template('my-art.html')

@app.route('/UploadArt')
def display_upload_art():
    return render_template('upload-art.html')

if __name__ == '__main__':
   app.run(debug = True)