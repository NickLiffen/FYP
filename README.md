# Project

[![Build Status](https://travis-ci.com/NickLiffen/project.svg?token=nTmoVpHsSx6vLW8egSuy&branch=master)](https://travis-ci.com/NickLiffen/project)

This project is based around a school attendance system primaryly focused on secondary schools. (But can also be used for primary schools etc).

# Install

1. Download the latest stable version of Node.Js [Download Here](https://nodejs.org/en/).
2. Download the latest stable version of MySQL [Download Here](http://dev.mysql.com/downloads/mysql/). Set up MySQL to your specs. 
3. Git Clone this repo (https://github.com/NickLiffen/project.git)

# Set Up

1. Run `npm install` to install all the node dependicies.
2. Use .env-sample to create your own .env
3. Run `npm run db-build` to create the database.
4. Run `npm run db-seed` to seed the database with data.

# Run

1. Run `npm start` to run the application

# Extras

1. If at any time you need to flush the database run `npm run db-remove` to remove the database. Then run steps 3 & 4 of the install to 
  create the database from scratch again.
1. Any known issues with this project can be found here: [Issues](https://github.com/NickLiffen/project/issues)
