# Mongo-Tango

[![License Badge](https://img.shields.io/badge/License-Apache-purple)](https://www.apache.org/licenses/LICENSE-2.0)

## Table of Contents

- [Visuals](#visuals)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contact](#contact)

  ## Visuals
    - `GET`, `PUT`, `POST` for Users and Friends

    <img src='./assets/2023-10-11 14.25.19.gif'>
    
    - `GET`, `PUT`, `POST`, `DELETE` for Thoughts, reactions and also showing when a User is deleted so is their Thoughts.
  
    <img src='./assets/2023-10-11 14.30.46.gif'>

  ## Description

  This application is a foundation for a database structure using MongoDB to create a social network with Users, Thoughts, Friends, and Reactions.

  ## Installation

  This application needs mongoose and express installed using `npm i` to have it work and also nodemon is added into the `package.JSON` to help with having the server run with hot changes and you can use it by running `npm run dev`.

  ## Usage

  To use the application you will need to use a API testing platform of your choice, i.e. Postman or Insomnia, and enter in the proper request into the http routes found in the routes folder.
    - for `GET`, `POST`, `DELETE`, and `PUT` of Users 

        ```http://localhost:3001/api/users``` for `GET` all users
        and with `POST` with the `req.body` for the created User to look like: 
        >{
            >
            > "username": "[your UserName]",
            >
            >"email": "[your email@email.com]"
            >
        > }

        ```http://localhost:3001/api/users/:userId``` to `DELETE` a User, edit a username or email with `PUT`, or `GET` a single User
    - for `POST` and `DELETE` of friends

        ```http://localhost:3001/api/users/:userId/friends/:friendId``` for `POST` to add that friend to that User and for `DELETE` of that friend from that User
    - for `GET`, `CREATE`, `DELETE` and `PUT` of Thoughts

        ```http://localhost:3001/api/thoughts``` The `GET` for all users and also the `POST` to create a thought with the `req.body` to look like:
        >{
            >
            > "thoughtText": "[your Thought]",
            >
            >"username": "[your username]"
            >
            >"userId": "[the associated _id with the username]"
            >
        > }

       ```http://localhost:3001/api/thoughts/:thoughtId``` for the `DELETE` of that thought or the `PUT` edit of the thoughts with the `req.body` that looks like:
       >{
            >
            >"thoughtText": "[edited thought insert here]"
            >
       >}

    - for `POST` and `DELETE` of reactions

        ```http://localhost:3001/api/thoughts/:thoughtId/reactions``` on a `POST` route to create a reaction to a specific thought and also must include a `req.body` that looks like:
        >{
            >
            > "reactionBody": "[your reaction to the Thought]",
            >
            >"username": "[your username]"
            >
            >"userId": "[the associated _id with the username]"
            >
        > }

        ```http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId``` on a `DELETE` route to delete a specific reaction to that associated Thought.
    
  ## Credits

  Joshua Nichols

  UTSA Bootcamp Module 18

  ## License

  For more info about this License go to https://www.apache.org/licenses/LICENSE-2.0

  ## Contact

  You can contact me through:

  Email: [n/a](mailto:n/a)

  GitHub: [PROFILE](https://github.com/JoshON5)
