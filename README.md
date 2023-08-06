# Shiroplane Backend RestAPI Documentation

## Introduction
This repository contains the API documentation for the Shiroplane service. The API allows users to perform various actions related to image handling and authentication. It is built using Express.js and MongoDB.

## Getting Started
To use the Shiroplane API, you need to have Node.js and MongoDB installed on your machine. Make sure to set up the required environment variables in a `.env` file.

```shell
# Clone the repository
git clone https://github.com/darkRihito/shiroplane_backend.git

# Install dependencies
cd shiroplane-api
npm install
```
## Setup
Create a .env file in the root of the project and add the following environment variables:<br>
MONGOOSE_CONNECT_URL = <br>
PASS_SEC = <br>
JWT_SEC = <br>
REACT_APP_YOUR_PRESET_NAME=<br>
REACT_APP_YOUR_CLOUD_NAME=<br>
REACT_APP_YOUR_API_KEY=8<br>
REACT_APP_YOUR_API_SECRET=<br>

## Start the server:
`npm run dev` or `npm run start-dev` or `npm run start`

# API Endpoints
## Auth Routes
- POST /auth/register: Register a new user.
- POST /auth/login: Log in an existing user.
- POST /auth/logout: Log out a user.
## Image Routes
- GET /images: Get all images.
- GET /images/:id: Get an image by ID.
- POST /images: Insert a new image (protected route, requires authentication).
- DELETE /images/:id: Delete an image by ID (protected route, requires authentication).
## Cloudinary Routes
- GET /cloudinary: Get all images from Cloudinary.
- POST /cloudinary: Insert a new image to Cloudinary.

# Screenshoots:
## Mongodb Dashboard
![Screenshot 2023-08-06 143334](https://github.com/darkRihito/shiroplane_backend/assets/133903731/9d05d110-6334-4d79-a38f-ded3e85a6cb7)

## Cloduinary Dashboard and Media Explorer
![Screenshot 2023-08-06 143614](https://github.com/darkRihito/shiroplane_backend/assets/133903731/41a2fddf-d42c-4568-bef7-08f595703a67)
![Screenshot 2023-08-06 143500](https://github.com/darkRihito/shiroplane_backend/assets/133903731/eeb12129-8693-40d1-8874-e7d250d397e9)

