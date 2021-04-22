# FansEat (Backend)

## Table of contents

- [Description](#description)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Route management](#route-management)
- [Database structure](#database-structure)

## Description

This is backend code of FansEat project which is built with Express and Sequelize. This web app would help those homemaker (including myself) to save lots of time for think of what to have for breakfast, lunch, or dinner. You can browser what breakfast or dinner that other people have. Also, when you find what you want, you can go to the iPrice page to check the average price of ingredients (vegetable).

## Technologies

FansEat is created with:

- Node.js: 12.18.1
- Sequelize: 6.5.0
- express: 4.17.1
- aws-sdk: 2.848.0
- jsonwebtoken: 8.5.1

## Setup

To run this project, install it locally using npm:

```
$ npm run dev
```

## API document

```
/auth
```

| Desc          | Method | Path      |
| ------------- | ------ | --------- |
| register      | POST   | /register |
| log in        | POST   | /login    |
| log out       | POST   | /logout   |
| get user info | GET    | /me       |

```
/users
```

| Desc          | Method | Path |
| ------------- | ------ | ---- |
| update user   | PATCH  | /:id |
| get user info | GET    | /:id |

```
/posts
```

| Desc             | Method | Path     |
| ---------------- | ------ | -------- |
| create a post    | POST   |          |
| get all posts    | GET    |          |
| get all own post | GET    | /all/:id |
| get post count   | GET    | /count   |

```
/likes
```

| Desc         | Method | Path |
| ------------ | ------ | ---- |
| create like  | POST   |      |
| get all like | GET    |      |

```
/admin/users
```

| Desc              | Method | Path   |
| ----------------- | ------ | ------ |
| get all user info | GET    |        |
| get user count    | GET    | /count |
| update user auth  | PATCH  |        |

## Database structure

![Imgur](https://i.imgur.com/fDRUx7d.png)
