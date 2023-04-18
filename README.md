
# Swift Ecommerce Store

This is Swift a MERN stack Ecommerce Store


## Tech Stack

**Client:** React, Redux, React Router, Axios

**Server:** Node, Express, Mongoose, JSON Web token, Multer


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Run Locally

Clone the project

```bash
  git clone https://github.com/CalebLindelien/Swift-App.git
```

Go to the project directory

```bash
  cd <repo-name>
```

Install client dependencies

```bash
  cd frontend
  npm install
```

Install server dependencies
```bash
  cd ../backend
  npm install
```

Create a .env file (see section below to add variables)
```bash
  cd backend
  touch .env
```

Start the server
```bash
  cd backend
  npm start
```

Start the client
```bash
  cd ../frontend
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`

`JWT_SECRET`

`PORT`

`PAYPAL_CLIENT_ID`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

&nbsp; 
1. Go to [mongodb](https://www.mongodb.com/) to register and log in to create MongoDB database.
2. After the last step, copy your MongoDB link address and replace the `.env` file `MONGO_URL` field, please replace `<password>` with the correct password you set.
3. Then set your own `JWT_SECRET` String.
4. Then set `PORT=3001`.
5. Then set up a PAYPAL_CLIENT_ID with [PayPal](https://developer.paypal.com/).
6. Lastly set up the three [cloudinary](https://cloudinary.com) variables (Cloud Name), (API Key), (API Secret)