# Simple Expressjs Demo

This project is maintained by fullStackOasis at [Github](https://github.com/fullStackOasis/expressjs-demo-mongodb)

## Mongodb

You must have Mongodb installed and running in order for this demo to work. [Instructions for installing Mongodb on Ubuntu are here.](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

You can start Mongodb on Ubuntu by running `sudo systemctl start mongod`.

## Run Expressjs

Use node 14.16.0 by running `nvm use 14.16.0`. If there's an error, follow the output instructions, or search online.

Checkout the repo if needed: `git clone git@github.com:fullStackOasis/expressjs-demo-mongodb.git`

Install using `npm install`.

Run using `node index.js`.

You should be able to navigate to http://localhost:3000/ and see "Hello World!" in your web browser.

## Example POST

```
curl -vs --header "Content-Type: application/json" \
  --request POST --data \
  '{"user" : {"email":"tester@example.com","username":"testuser"} }' \
  http://localhost:3000/api/users
```

Example failure output:

```
{"success":false,"error":"This email address has already been registered"}
```

Successful output:

```
{"success":true,
 "user":{"_id":"6118622c772a7f9ed9dbc1ab","email":"tester3@example.com","username":"testuser","__v":0}}
```

## Continuous Integration

This project was created purely to test continuous integration using Github Actions.
