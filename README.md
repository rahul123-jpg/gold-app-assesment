#  Golf Score & Charity Draw App

A full-stack web application where users can add their scores, participate in a random draw, and contribute a percentage to charity.

---

##  Features

*  User Authentication (Signup/Login)
*  Add & Track Scores
*  Random Draw System
*  Charity Contribution System
*  Admin Panel Access
*  Fully Responsive UI

---

## Tech Stack

### Frontend:

* React (Vite)
* Tailwind CSS
* Axios

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (Atlas)

---

##  Project Structure

```
Golf-app/
│
├── client/        # Frontend (React + Vite)
├── server/        # Backend (Node + Express)
├── .gitignore
└── README.md
```

---

##  Installation & Setup

###  Clone the repository

```
git clone https://github.com/your-username/golf-app.git
cd golf-app
```

---

###  Setup Backend

```
cd server
npm install
npm start
```

---

###  Setup Frontend

```
cd client
npm install
npm run dev
```

---

##  Environment Variables

Create a `.env` file in the **server** folder and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

##  Deployment

### Frontend (Netlify)

* Base Directory: `client`
* Build Command: `npm run build`
* Publish Directory: `dist`

### Backend (Render)

* Root Directory: `server`
* Build Command: `npm install`
* Start Command: `npm start`

---

##  How It Works

1. User signs up and selects a charity + percentage.
2. User logs in and adds scores.
3. User runs a random draw.
4. Based on matches → result is generated.
5. Charity contribution is tracked.

---

##  Future Improvements

*  Charts for score analytics
*  Real donation calculation system
*  Notifications
*  JWT Authentication

---

##  Author

* Rahul Singh

---



---
