[![Build Status](https://travis-ci.org/atiquzzaman/Campaign.svg?branch=master)](https://travis-ci.org/atiquzzaman/Campaign)
[![codecov](https://codecov.io/gh/atiquzzaman/Campaign/branch/master/graph/badge.svg)](https://codecov.io/gh/atiquzzaman/Campaign)

# Campaign

Campagin is a react application that demonstrates a list of campaigns.

## Development environment setup

- [Node.js](https://nodejs.org/en/download/) - using [node version manager](https://github.com/creationix/nvm) is also useful for installing node.
- [Yarn](https://yarnpkg.com/lang/en/docs/install)

Then clone the repo. Run `yarn` to install dependencies. Run `yarn start` to start the application.

That's it. Application can be found running at the following URL: http://localhost:3000/

## How does it work

After running the application, open browser console. For instance, on chrome press `F12`. Invoke the method `AddCampaigns`

##### Example of input parameter

`AddCampaigns` expect an array as parameter that should follow the following format.

```json
[
  {
    "id": 1, "name": "Campagin 1", "startDate": "3/9/2017", "endDate": "4/12/2017", "Budget": 882
  }
]
```

## How to run unit test
There are couple of ways to run unit tests:

1. `yarn test` will run tests with coverage
2. `yarn test:watch` will run test with watch mode
3. `yarn open:cov` will open coverage report on browser

## Deployment

Deployment can be done usng `yarn deploy`.

## Working Demo

[Here](http://atiquzzaman.github.io/campaign/index.html) is the demo.

[MIT](https://choosealicense.com/licenses/mit/)
