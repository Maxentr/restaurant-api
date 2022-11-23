# Restaurant API

## Pre-requisites

- Node.js (I use v16.17.1)
- MongoDB (I use v6.0.1)
- ssh-keygen

## Installation

After cloning the repository, run the following commands:

```
pnpm run init
```

It will install all the dependencies and create a jwt folder with keys in it (used for authentication).

Then create a .env file in the root directory and add the variables.

## Usage

To start the server, run the following command:

```
pnpm run start
```

## API Documentation

The API documentation uses Swagger. To access it, go to http://localhost:3000/api/v1/docs/.

## Convention

This project use the following convention:

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
