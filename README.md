# CodeAlpha Social Media Platform

A full-stack Social Media Platform built using the MERN Stack as part of the CodeAlpha Internship.

## Features

- User Signup & Login
- Create, Edit & Delete Posts
- Upload Images using Cloudinary
- Like & Comment on Posts
- User Profile
- Responsive UI

## Tech Stack

### Frontend
- React.js
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary
- Multer

## Project Structure

```
client/
server/
```

## Installation

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the `server` folder and add:

```env
MONGO_URI=your_mongodb_uri
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## Author

**Anushka Soni**

Developed as part of the **CodeAlpha Internship**.
