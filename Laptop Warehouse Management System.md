
# Laptop Warehouse Management System

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind css](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Mysql](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)


## Features 

- Login
- Dashboard
- View data on goods, incoming goods, outgoing goods, customers, and suppliers
- Adding data on goods, incoming goods, outgoing goods, customers and suppliers
- Delete data on goods, incoming goods, outgoing goods, customers and suppliers
- Scan the barcode of the goods data


## Tech

This project was created using the following technology :

- [React.js](https://react.dev/) - React.js is a popular JavaScript library for building user interfaces, primarily for single-page applications. Developed and maintained by Facebook, React allows developers to create large web applications that can update and render efficiently in response to data changes. The main concept of React is the component-based architecture, where the UI is divided into small, reusable components.
- [Node.js](https://nodejs.org/en) - Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. Developed by Ryan Dahl in 2009, Node.js allows developers to use JavaScript to write server-side scripts, producing dynamic web page content before the page is sent to the user's web browser.
- [Express.js](https://expressjs.com/) - Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It provides a robust set of features to develop web and mobile applications, making it a popular choice for building web servers and APIs.
- [Tailwind css](https://tailwindcss.com/) - Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build custom designs without any annoying opinionated styles you have to fight to override. Instead of providing predefined components like other CSS frameworks, Tailwind provides utility classes that you can use to build your components from scratch.
- [Mysql](https://www.mysql.com/) - MySQL is an open-source relational database management system (RDBMS) that uses Structured Query Language (SQL) for managing and manipulating databases. Developed by Oracle Corporation, MySQL is known for its reliability, performance, and ease of use, making it one of the most popular database systems in the world.
- [Visual Studio Code](https://code.visualstudio.com/) -Visual Studio Code (VS Code) is a free, open-source code editor developed by Microsoft, designed for building and debugging modern web and cloud applications. It combines the simplicity of a code editor with powerful developer tools, making it a popular choice among developers.

## Installation

Laptop Warehouse Management System requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies in the backend

```sh
cd backend
npm i
```

Migrate Prisma Schema

```sh
npx prisma generate
npx prisma db push
npx prisma migrate dev --name init
```

Setup File .env

```sh
APP_PORT= 5000

DATABASE_URL="mysql://root:@localhost:3306/dbgudang"

JWT_SECRET = "........"
NODE_MODULE = development
```

Run server in the backend

```sh
nodemon index
```

Install the dependencies and devDependencies in the frontend and run the server

```sh
cd frontend
npm i
npm start
```
