[![Heroku](http://heroku-badge.herokuapp.com/?app=viet-gram)](https://viet-gram.herokuapp.com/)

# SEI Project 3 - Vietgram
A social networking site for explorers, bringing together hidden gems reviews and comment all in one place.
Visit the website at https://viet-gram.herokuapp.com/

![Ga Logo](images/GA-logo.png)

### Timeframe & Team
> 7 days, group project

### The Brief
Build a MERN stack application in a group and to have automated tests for at least one RESTful resource on the back-end.

### Technologies
- HTML5 & ES6 JavaScript
- React.js, Webpack, Babel, Axios & Yarn
- CSS3, CSS Animations, Sass CSS & Spectre
- Express.js, Mongoose & MongoDB
- Insomnia, Mocha & Chai
- Yandex (translate), emoji-mart (React widget)
- Heroku

___

## Project Summary
Vietgram was the third project during the General Assembly Software Engineering Immersive course. The project was made in collaboration with David https://github.com/davt49 and Mia https://github.com/MiaLearnsToCode.

We had just over a week to create an app that had a custom made backend by building a RESTful API and using React to render the front end. We created Vietgram, a social networking site for explorers, bringing together hidden gems reviews and comment all in one place. We also implemented a real-time chat widget with automatic translation into the local language. 

My part in the project included building the models in Node.js, building the MongoDB database models, API endpoints and other frontend components.

## Login
![Login Screen](./src/assets/login.png)
___

## Process & Approach

### Task Management and Communication
The project was delivered in a group of three. We managed the project with an agile methodology with a clear timeframe for us to deliver as much of the scope as possible. To assist this process we used an Kanban Board in the form of Trello to plan and manage our task, utilising daily stand-ups to track progress and understand blockers.

To start the project wireframes were produced to capture a high level user journey and the layout of the application prior to any development taking place. This gave us a clear understanding of how each page would interact and a basic layout that we could apply consistently across the application. David, Mia and I were happy to share the whole experience moving from back-end to front-end avoinding give a specific task for each other for the 7 days project.

### Development
Planning was an integral part the process as our focus was to produce a backend API which could corehently work in the React front-end. We first began creating wireframes to work out this structure and general content placement of the website. It was clear our application would revolve around three elements: Users, Chats and Gems. We established early that the user could choose to be a local or a traveler and also chosse between two language to use: English or Vietnames.

### Backend
The backend of the application was built using Express.js with a NoSQL MongoDB database. Models and Controllers were created for 'Gems', 'Chats' and 'User'. For both 'Gems' and 'Chats' CRUD routes were created to allow users to update 'Gems' and 'Chats' they had created. The User route included Register and Login to allow a user to create a profile to view and manage their 'Gems' or 'Chats'. User follow functionality was later added to the 'User' route.

To begin the database, we created a seeds file to add the data for all the Chats and a handful of Gems, which served two purposes: to create routes in the back-end which allowed the front-end to work with the data and as a visual tool, to help populate data when making adjustments to our API, using Insomnia as our client. 


#### Authentication
In order to carry out the authentication process, we used BCrypt to hash passwords in the backend and store it in the database so that BCrypt could compare it against the password given when logging in. We also used JSON Web Token to embed JSON into an encrypted token. This was incorporated in our login and register controller and is sent to the client when the users successfully authenticate. 

### Frontend
The frontend of the application was built using React.js. The application was styled using Spectre which was customised using Scss to add a branded style across the application.

Frontend setup
* setting up components and pages
* setting up forms
* connecting API requests to the front end.

### Challenges
This was my first experience using Git workflows which provided some challenges at the beginning of the project. As a team we developed all features on individual branches before merging with the 'development' branch. Conflicts had to be closely managed to ensure the correct version of the code was pushed to the 'development' branch. As a team we had a rigorous process which we followed as conflicts emerged. We also reduced the potential for conflicts by proactively managing task at the beginning of the day and understanding where conflicts could occur.

### Wins
A feature that was added later in the project was to allow users to follow other users. A follow route was added to the backend application which added a 'follows' array in the 'User' schema. An AJAX request is made from the frontend when a user follows another user. The current user is found in the database by the ID supplied with the AJAX request. The user being followed is then pushed to the array of 'follows' stored in the 'User' record. The user is then saved to the database before being populated via the User schema and returned as part of the response to the frontend. This response is used to update state and display the user has now been followed.

 ### Future Improvements
 - Give the change to the users to choose more then a language to chat
 - Add the use of emojis on the comments area
 - Add private messages
 - Add Nodemailer to send an email to the users email which includes a link to verify the email they have registered with. The users are notified on the front-end by a flash message. 
 
___

## Install

`brew install pipenv`

`pipenv install`

`yarn install`

### Initialize the PostgreSQL database

`yarn seed`

### Run the app

Start the backend server

`yarn serve:back`

Starts the frontend server

`yarn serve:front`

## Deploy

With heroku, automatically deploys from new code is pushed to `master`
