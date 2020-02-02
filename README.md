# WIP social network.

## TODO:

- overall app structure and ui.
- jest testing and ESlint usage.
- client form validation.
- client style and animations.
- code tyding-up, modularizing.
- multipart/form request handling.
- profile modification form and server side.
- websocket integration for live feed refresh.
- loading state for profile picture uploading.
- posts have to carry user id, and then from client make an array of seen users in home page, fetching and
  mapping nickname and photo into the posts map function.
- profile pages for users, using query strings with user id.
- user posts in profile page.
- image in posts.
- search functionality, using nickname, and description.

### Usage (dev):

- Start server first `cd server && npm start or npm run dev` **default port is 4000**
- Then start react app `cd client && npm start`

### Usage (heroku hosted)

- Temporary user, `nickname: admin | password: password`
