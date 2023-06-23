![Ecstasify banner](./client/public/banner.png)

# What is Ecastasify🎵

This project is the implementation of an online platform for listening to music by many users through a web client. The user can register on the site, choose a subscription plan, create playlists of tracks, receive notifications about the release of new tracks and even become an author.

# Preview

![preview](https://user-images.githubusercontent.com/71723893/212487021-98b976c7-ab2c-46e0-882c-459024ba6bfb.png)

# Main features:

- USER:
  - [x] Create personal account
  - [x] Choose a subscription plan
  - [x] Listen to music
- ADMIN:
  - [x] Manage and create new users
  - [x] Manage and create authors
  - [x] Manage and create tracks with some metadata
  - [x] Manage and create playlists <br>

# Who worked on the project

This project is implemented by a team of 3 developers:

### Backend:

- Khrapko Vasyl <br>
  (khrapko2002@gmail.com, https://github.com/KhrapkoVasyl) <br>
  Implemented: 'subscriptions', 'files', 'notifications' services

- Zinovyj Bogdan <br>
  (bogdanolexandrov@gmail.com, https://github.com/Bogdan-Zinovij) <br>
  Implemented: 'users(+auth)', 'authors' services

### Frontend:

- Matiushenko Artem <br>
  (artom.matyushenko@gmail.com, https://github.com/artemmatiushenko1) <br>
  Implemented: web client <br>

# Installation

1. Clone the repo:

```sh
git clone https://github.com/KhrapkoVasyl/Ecstasify.git
```

2. Install NPM packages:

   ```sh
   cd client
   npm install
   ```

   Create the configuration file `.env.local` as shown in the [example](https://github.com/KhrapkoVasyl/Ecstasify/blob/main/client/env/.env.example).

   And start the client:

   ```sh
   npm run dev
   ```

3. Install NPM packages for the server:

   ```sh
   cd server
   npm install
   ```

   Create the configuration file `.env` as shown in the [example](https://github.com/KhrapkoVasyl/Ecstasify/blob/main/server/.env.example).

   And start the server:

   ```sh
   npm start:dev
   ```

4. Open http://127.0.0.1:5173 to view the app in your browser.

# Deployments

- Client - https://ecstasify.azurewebsites.net/
- Server - https://ecstasify-api.azurewebsites.net/
