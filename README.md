# Overview
*Task Manager Frontend* is a task management web application built around the idea of organizing tasks by a combination of user created tags and deadlines. This frontend is designed to be used with [task-manager-backend](https://github.com/stephencz/task-manager-backend). The frontend is designed using React and React Redux, while the backend is a REST API built on NodeJS, ExpressJS, and MySQL.

## How to Build
Before you can make use of the frontend you have to build and serve the backend. Please read task-manager-backend's README. The instructions for building the frontend are as follow:

1. `git clone https://github.com/stephencz/task-manager-frontend`
2. `cd task-manager-frontend`
3. Create a `.env` file in root directory and add the following variable: `PROXY=http://localhost:PORT`. Make sure to change the port number to whatever you are running the backend on.
4. `npm run build`
5. Once it builds successfully you have to serve it in some way. You can install `serve` using `npm install serve -g`, and serve the application using `serve -s build/`. Or you can find a more dedicated solution such as `pm2` depending on your requirements and set up.

## Background
In college, I found I was most productive when I organized all of my assignments into one giant spreadsheet. I made a column for describing the assignments, a column stating which class it belonged to, and a column representing the deadline. 

After college, I tried writing daily to-do lists and they just didn't work for me. I like big, monstrous lists, compared to small lists. That was the idea behind this application. A single web page where I can dynamically create, edit, and remove tasks, and organize them via their tags and deadlines.

## Screenshots
![Screenshot showing a collection of tasks within the program, some organized via tags and/or deadlines](/screenshots/screenshot-1.png?raw=true)

![The applications tag manager which allow users to edit tag text, text color, and background color.](/screenshots/screenshot-2.png?raw=true)
