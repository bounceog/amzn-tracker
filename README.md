<p align="center">
  <a href="" rel="noopener">
 <img width=500 height=392px src="https://i.imgur.com/RjMLWwW.png" alt="Project logo"></a>
</p>

<h3 align="center">AMZN-Track</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://amzn-track3r.herokuapp.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 🧐 About <a name = "about"></a>

I wanted to know how prices change over a year, especially the time around black friday and christmas.
This is a little WebUI which presents the captured data from the AMZN-Scraper.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

- `git clone https://github.com/bounceog/amzn-track.git`

Create a .env in project directory

```
MONGO_URI=<YOUR-DB_URL>
PORT=<A PORT>
REDIS_PORT=<YOUR-REDIS_PORT>
NODE_ENV=development
```

- `npm install`

to install the dependencies.

And

- `npm start`

to start the server.

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJS](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - MongoDB client
- [Redis](https://redis.io/) - Database cache
- [Node Redis](https://github.com/NodeRedis/node-redis) - Redis client

## ✍️ Authors <a name = "authors"></a>

- [@bounceog](https://github.com/bounceog) - Idea & Initial work
