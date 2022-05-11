# Shopper API

A basic shopping api to show skills.

### Resources

Insomnia Collection: [Clique here to get the insomnia collecton](./resources/shopper-insomnia.json)

### Prerequisites

To run on docker you only need to have `docker version 20.10.5` or greather and `docker-compose version 1.29.0` or greather installed, but if you wanna to run locally, will need aditionally to have Node installed in version v12.x.x or v14.x.x.

### Phases

To run the application on your machine, follow these steps:

#### Docker

1. git clone [https://github.com/devbarba/shopper](https://github.com/devbarba/shopper)

2. `cd shopper` to access the project folder.

3. `docker-compose up -d --build` it will run all necessary things.

#### Local

1. git clone [https://github.com/devbarba/shopper](https://github.com/devbarba/shopper)

2. `cd shopper` to access the project folder.

3. `yarn` or `npm install` to performs installation of dependencies.

4. `cp .env.example .env` to copy environment variables.

5. `yarn build` or `npm run build` to build the application.

6. `yarn start` or `npm run start` to run the application.

*PS: `yarn dev` or `npm run dev` to run on dev mode.*

*PS: If you wanna to run local without docker, go to created `.env` file and change the value for `127.0.0.1` or `0.0.0.0`: from this env: `MONGO_HOST`*

## CURL to test API


```shell
curl --request GET --url http://0.0.0.0:9004
```

## Tests

Code coverage: `86.88%`.

To run the integration and unit tests run the following command: `yarn test` or `npm run test`

### What could be improved?
1. Improve the basket removals scheduling some job for example to remove depending the basket age.
2. Improve discount coupons to really works with registered coupons, doing the discount at the final price.
3. Improve unit and unitary test to achieve at least 98% of coverage.
4. Add authentication and link the logged user to the basket.
5. Add orders api to make the user able to finish the basket.
6. Improve basket creation logic.
7. Can be added a pipeline using git actions to run tests automatically and deploy on Heroku or AWS for example if all are passing.
