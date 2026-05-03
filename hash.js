const bcrypt = require("bcrypt");

const password = "squall84z";

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log("HASH:", hash);
});