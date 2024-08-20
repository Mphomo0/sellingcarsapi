# Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the API](#running-the-api)
4. [API Documentation](#api-documentation)
5. [Environment Variables](#environment-variables)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [Contact](#contact)

## Introduction

This is a RESTful API built with Node.js and Express for managing a simple car management system. It allows admin user to create, read, update, and delete tasks, as well as manage user authentication.

## Features

- User Authentication(JWT)
- CRUD operations for cars
- Role-based access control( can be extended to handle this one)
- Input Validation and error handling
- Pagination

## Getting Started

## Prerequisites

- node.js >=v20
- mongoDB

## Installation

```
# Clone the repo

git clone https://github.com/Mphomo0/sellingcarsapi.git

# Navigate to the project directory

cd sellingscarsapi

# Install dependencies

npm install

```

## Running the API

```
# Start the development server

npm run server

# Start the production server

npm run start

```

The server should now be running at `http://localhost:5000`

## API DOCUMENTATION

## Authentication

- `POST /api/users - Register New User`
- `POST /api/users/login - Login User`

## Car Management

- `GET /api/cars/ - Get all cars`
- `GET /api/cars/:id - Get a specific car`
- `POST /api/cars/ - Create a car`
- `PUT /api/cars/:id - Update a car`
- `DELETE /api/cars/:id - Delete a car`
- `GET /api/cars/featured - Get all featured cars`
- `GET /api/cars/makes - Get all car makes`
- `GET /api/cars/models?make=make - Get all model from a specific make`
- `GET /api/cars/years?make=make&&model=model - Get all years from a specific make/model`
- `GET /api/cars/prices?make=make&&model=model&&year=year - Get all prices from a specifi make/model/year`
- `GET /api/cars/search?make=make&&model=model&&year=year&&price=price - Get all cars from the search`

## Environment Variables

```
PORT = 5000
MONGODB_URI=YOUR MONGODB URI
JWT_SECRET=YOUR SECRET

```

## TESTING

```
# Run unit tests
npm test

```

## DEPLOYMENT

I used Render to deploy you can use anything you like Vercel, Netlify etc

## CONTRIBUTING

- Fork the repo
- Create a feature branch (`git checkout -b feature-name`)
- Commit your changes (`git commit -m "Add Feature`)
- Push to the branch(`git push origin feature-name`)
- Open a pull request

## Contact

- Email: mphomoipolai1@gmail.com
- Website: www.mpho-moipolai.co.za
