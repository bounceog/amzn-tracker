const { resolveInclude } = require("ejs");
const redis = require("redis");

class RedisHandler {

    constructor(port) {
        this.client = redis.createClient(port);

        this.client.on("error", (error) => {
            console.error(error);
        });
    }

    set(key, expiry, value) {
        this.client.setex(key, expiry, value);
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, data) => {
                if (err) reject(err);
                if(data) resolve(data);
                else reject();
            });
        });
    }

}

module.exports = RedisHandler;