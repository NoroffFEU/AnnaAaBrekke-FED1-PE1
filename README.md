# FED1 Project Exam 1

"Wherever Forever" Online Travel Blog

Client

- Name: Serena, the blogger of "Wherever Forever"
- Industry: Travel and Influencer Marketing
- Business Size: Solo entrepreneur
- Location: Global
- Mission: To transform the personal travel diaries of Serena into an engaging travel blog that highlights places, activities, and unforgettable experiences.

Project Overview:
Serena has approached us to digitize her written diaries and create an online platform where her adventures can be shared with a global audience. The envisioned blog will allow her to post her stories and experiences, complete with personal recommendations and reflections.

Website Functionality Requirements:

Blog Feed Page (/index.html):

- Interactive banner carousel for 3 latest posts. ✅
- Buttons to navigate the carousel.✅
- The carousel loops around from last to first post and vice versa.✅
- Static list of 12 latest posts in a thumbnail grid.✅
- Thumbnails are clickable and lead to respective blog posts.✅

Blog Post Public Page (/post/index.html):

- Displays post details: title, date, images, and content.✅
- Unique shareable URL with a post ID.✅

Blog Post Edit Page (/post/edit.html):

- Accessible only when the owner is logged in.
- Includes a delete button that sends a DELETE request to an API.✅
- Contains an edit form to update the title, body, and image via PUT request.✅

Account Login Page (/account/login.html):

- Login form that validates and saves a token in the browser for post management.✅

Account Register Page (/account/register.html):

- Register form for creating a new account with name, email, and password. (Registration system for future team members to create accounts and post content.) ✅

For the user (public visitor), there's no need for them to log in. They will simply access the public endpoints, such as fetching posts, without authentication. For the owner (manager of the blog), they need to log in to access certain features like creating or managing posts. After logging in, they will receive an access token that they can use to authenticate their requests to protected endpoints, such as creating or updating posts.
