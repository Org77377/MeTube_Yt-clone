# MeTube YT-Clone Documentation

Welcome to **MeTube**, a YouTube clone built using **Express**, **MongoDB**, and **Cloudinary**. This project replicates essential features of YouTube, allowing users to upload videos, comment, like/dislike, subscribe/unsubscribe to channels, and much more.

This guide will walk you through setting up the project locally and explain its main features, components, and how to use them.

---

## Table of Contents
- [Project Setup](#project-setup)  
  - [Unzipping the Project](#unzipping-the-project)  
  - [Dependencies](#dependencies)  
- [Database Setup](#database-setup)  
  - [MongoDB Setup](#mongodb-setup)  
  - [Cloudinary Setup](#cloudinary-setup)  
- [Features Overview](#features-overview)  
- [API Endpoints](#api-endpoints)  
  - [User Routes](#user-routes-user)  
  - [Video Routes](#video-routes-video)  
  - [Channel Routes](#channel-routes-channel)  
  - [Comment Routes](#comment-routes-comment)  
  - [View Routes](#view-routes-view)  
- [Video Views](#video-views)  
- [GitHub Repository](#github-repository)  
- [Final Notes](#final-notes)

---

## Project Setup

### Unzipping the Project
1. Download the project zip file.  
2. Extract the zip file to your preferred directory.  
3. Open a terminal and navigate to the project folder.  

### Dependencies
After unzipping and navigating to the project folder, install required dependencies:


---

## Database Setup

### MongoDB Setup
This project uses **MongoDB** as its database. You need to create a **MongoDB Atlas account** or set up a **local MongoDB instance**.  

1. Create a `.env` file in the root directory.  
2. Add the following variables:  

>MONGO_URL=your_mongodb_connection_url<br/>
>JWT_SECRET=your_jwt_secret_key``<br/>
>CLOUDINARY_URL=your_cloudinary_url<br/>

Replace these values with your actual **MongoDB connection string**, **JWT secret**, and **Cloudinary credentials**.

### Cloudinary Setup
1. Sign up on **Cloudinary**.  
2. Get credentials (cloud name, API key, API secret).  
3. Add the `CLOUDINARY_URL` to your `.env` file.  

---

## Features Overview
- **User Authentication**: Sign up, log in, and access restricted features like uploading videos and commenting.  
- **Video Management**: Upload, update, delete, like, and dislike videos.  
- **Comment System**: Add, update, and delete comments.  
- **View Tracking**: Views tracked only for logged-in users.  
- **Channel Management**: Create, delete, subscribe, and unsubscribe from channels.  
- **Database**: MongoDB stores users, videos, comments, and channel data.  
- **Cloud Storage**: Videos/images stored on Cloudinary.  

---

## API Endpoints

### User Routes (/user)
- **POST** `/login` – Logs in the user.  
- **POST** `/signup` – Registers a new user.  
- **GET** `/` – Fetch logged-in user’s data (auth required).  

### Video Routes (/video)
- **POST** `/upload` – Upload new video (auth required).  
- **PUT** `/:videoId` – Update video details (auth required).  
- **DELETE** `/:videoId` – Delete a video (auth required).  
- **PUT** `/like/:videoId` – Like a video (auth required).  
- **PUT** `/dislike/:videoId` – Dislike a video (auth required).  

### Channel Routes (/channel)
- **POST** `/create` – Create a new channel (auth required).  
- **DELETE** `/delete/:channelId` – Delete a channel (auth required).  
- **PUT** `/subscribe/:channelId` – Subscribe to a channel (auth required).  
- **PUT** `/unsubscribe/:channelId` – Unsubscribe from a channel (auth required).  
- **GET** `/:id` – View channel details.  

### Comment Routes (/comment)
- **POST** `/:videoId` – Add a comment (auth required).  
- **PUT** `/:commentId` – Update a comment (auth required).  
- **DELETE** `/:commentId` – Delete a comment (auth required).  

### View Routes (/view)
- **PUT** `/:videoId` – Increment video view (logged-in users only).  
- **GET** `/:videoId` – Get video details, comments, suggestions, and user info.  

---

## Video Views
- Video views are tracked only for **logged-in users**.  
- Each video view increments count by `+1`.  
- User is added to `viewedBy` list to avoid duplicate counts.  

**Note:** There’s also an *untracked* view option in the database where views increment with access, but not tied to logged-in users.  

---

## GitHub Repository
You can find the full source code here:  
**MeTube GitHub Repository**
>#### https://github.com/Org77377/MeTube_Yt-clone
---

## Final Notes
- Ensure proper `.env` setup for MongoDB and Cloudinary.  
- Configure CORS as per your environment.  
- All authentication-required routes (upload, comments, subscriptions) use **JWT-based authentication**.  
