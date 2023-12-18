from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
from os import path 
import os
import mimetypes
import random

app = Flask(__name__)
app.secret_key = 'secret_key' 

local_user_copy = "none"

@app.route('/')
def display_start_page():
    return render_template('login-page.html')

# TODO: Change this route to include the username once page is dynamic
@app.route('/ArtistProfile/', defaults={'username': None})
@app.route('/ArtistProfile/<username>')
def display_artist_profile(username):
    global local_user_copy
    if username is None:
        return render_template('artist-profile.html', user=local_user_copy, actualUser=local_user_copy)
    else:
        with open('users.json', 'r') as file:
            existing_users = json.load(file)
        user_data = existing_users[username]
        return render_template('artist-profile.html', user=user_data, actualUser=local_user_copy)

@app.route('/CreateAccount', methods=['GET','POST'])
def display_create_account():
    global local_user_copy
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
            'password': user_data['password'],
            "profile-photo": "none",
            "profile-name": "none",
            "school": "none",
            "grad-year": "none",
            "major": "none",
            "artist-bio": "none",
            "instagram-link": "none",
            "portfolio-link": "none",
            "posts": []
        }

        with open('users.json', 'w') as file:
            json.dump(existing_users, file, indent=4)

        local_user_copy = existing_users[user_data['username']]
        return jsonify({'user': existing_users[user_data['username']], 'message': 'User Successfully Created'}), 200

@app.route('/CreateProfile', methods=['GET','POST'])
def display_create_profile():
    global local_user_copy
    if request.method == 'GET':
        return render_template('create-profile.html', user=local_user_copy)
    elif request.method == 'POST':
        print("SHELBY ATTEMPTING TO UPDATE PROFILE")
        user_data = json.loads(request.form.get('userData'))

        if 'profilePic' in request.files:
            print("SHELBY PROFILE PHOTO UPLOADED IN SERVER.PY")
            file = request.files['profilePic']
            fileExtension = mimetypes.guess_extension(file.mimetype)
            print("fileExtension", fileExtension)
            print("SHELBY FILENAME", file.filename)
            file.save(os.path.join('./static/img/user-profile-pics/', user_data["username"] + fileExtension))
            user_data["profile-photo"] = user_data["username"] + fileExtension

        print("user_data", user_data)

        with open('users.json', 'r') as file:
            existing_users = json.load(file)

        existing_users[user_data['username']] = user_data
        local_user_copy = existing_users[user_data['username']]

        print("existing_users", existing_users)
        print("SHELBY", existing_users[user_data['username']])

        with open('users.json', 'w') as file:
            json.dump(existing_users, file, indent=4)

        print(jsonify({'user': existing_users[user_data['username']], 'message': 'Profile Successfuly Updated'}), 200)
        return jsonify({'user': existing_users[user_data['username']], 'message': 'Profile Successfuly Updated'}), 200
    
@app.route('/UploadArt', methods=['GET','POST'])
def display_upload_art():
    global local_user_copy
    if request.method == 'GET':
        return render_template('upload-art.html', user=local_user_copy)
    elif request.method == 'POST':
        print("SHELBY ATTEMPTING TO UPLOAD ART")
        print(local_user_copy)
        id = len(local_user_copy["posts"]) + 1
        post = {}
        if 'image' in request.files:
            file = request.files['image']
            fileExtension = mimetypes.guess_extension(file.mimetype)
            print("fileExtension", fileExtension)
            print("SHELBY FILENAME", file.filename)
            file.save(os.path.join('./static/img/posts/', local_user_copy["username"] + str(id) + fileExtension))
            post["art-photo"] = local_user_copy["username"] + str(id) + fileExtension
        title = request.form['title']
        description = request.form['description']
        tags = request.form.get('tags')
        post["title"] = title
        post["description"] = description
        post["id"] = id
        post["tags"] = json.loads(tags)

        local_user_copy["posts"].append(post)

        with open('users.json', 'r') as file:
            existing_users = json.load(file)

        existing_users[local_user_copy["username"]] = local_user_copy

        with open('users.json', 'w') as file:
            json.dump(existing_users, file, indent=4)

        print(jsonify({'user': existing_users[local_user_copy['username']], 'message': 'Profile Successfuly Updated'}), 200)
        return jsonify({'user': existing_users[local_user_copy['username']], 'message': 'Profile Successfuly Updated'}), 200




@app.route('/LandingPage', methods=['GET','POST'])
def display_landing_page():
    global local_user_copy
    return render_template('landing-page.html', user=local_user_copy)

@app.route('/Login', methods=['GET','POST'])
def display_login_page():
    global local_user_copy
    if request.method == 'GET':
        return render_template('login-page.html')
    elif request.method == 'POST':
        user_data = request.get_json()
    
        with open('users.json', 'r') as file:
            existing_users = json.load(file)
    
        if user_data['username'] in existing_users and existing_users[user_data['username']]['password'] == user_data['password']:
            local_user_copy = existing_users[user_data['username']]
            return jsonify({'user': existing_users[user_data['username']], 'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/FetchPosts', methods=['GET','POST'])
def fetch_posts():

    query = request.json.get('query')

    print("Query", query)
    with open('users.json', 'r') as file:
        existing_users = json.load(file)
    
    all_posts = []

    for user_data in existing_users.values():
        posts = user_data.get('posts', []) 
        for post in posts:
            post["username"] = user_data["username"]
            post["profile-name"] = user_data["profile-name"]
            post["profile-photo"] = user_data["profile-photo"]
            if query == "" or query in post["tags"]:
                all_posts.append(post)
    print(all_posts)
    random.shuffle(all_posts)
    return jsonify({'posts': all_posts, 'message': 'Login successful'}), 200



@app.after_request
def after_response(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, mmax-age=0"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

if __name__ == '__main__':
   app.run(debug = True)