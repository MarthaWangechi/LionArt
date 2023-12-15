from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def display_start_page():
    return render_template('login-page.html')

# TODO: Change this route to include the username once page is dynamic
@app.route('/ArtistProfile') 
def display_artist_profile():
    return render_template('artist-profile.html')

@app.route('/CreateAccount', methods=['GET','POST'])
def display_create_account():
    print("SHELBY REQUEST METHOD", request.method)
    if request.method == 'GET':
        return render_template('create-account.html')
    elif request.method == 'POST':
        print("SHELBY CREATE ACCOUNT SERVER.PY")
        user_data = request.get_json()
        print(user_data)

        with open('users.json', 'r') as file:
            existing_users = json.load(file)
        
        if user_data['username'] in existing_users:
            return jsonify({'message': 'Username already exists'}), 400

        existing_users[user_data['username']] = {
            'username': user_data['username'],
            'password': user_data['password']
        }

        with open('users.json', 'w') as file:
            json.dump(existing_users, file, indent=4)

        response_data = {'message': 'User created successfully'}
        return jsonify(response_data), 200

@app.route('/CreateProfile')
def display_create_profile():
    return render_template('create-profile.html')

@app.route('/LandingPage', methods=['GET','POST'])
def display_landing_page():
    return render_template('landing-page.html')

@app.route('/Login', methods=['GET','POST'])
def display_login_page():
    if request.method == 'GET':
        return render_template('login-page.html')
    elif request.method == 'POST':
        user_data = request.get_json()
    
        with open('users.json', 'r') as file:
            existing_users = json.load(file)
    
        if user_data['username'] in existing_users and existing_users[user_data['username']]['password'] == user_data['password']:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

# TODO: Combine this page with Artist Profile page
@app.route('/MyArt')
def display_my_art():
    return render_template('my-art.html')

@app.route('/UploadArt')
def display_upload_art():
    return render_template('upload-art.html')

if __name__ == '__main__':
   app.run(debug = True)