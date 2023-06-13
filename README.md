# Overlook

### Abstract:
Have you been searching for a reliable hotel to book a room at? The Hotel Jonesy is the app you've been looking for! I built this web-based application that allows the user to log in to find a dashboard where they're allowed to create new bookings for a specific date and they can even filter the type of room they'd like to stay in! The "All Bookings" section displays the users confirmed bookings and some information about those. Once the user is logged in, the greeting is changed to address them by name! The total spent is changed to represent the total price of all their confirmed bookings thus far, it also accumulates anytime a new booking is made. You're gonna love your stay at the Hotel Jonesy!
### Installation Instructions:
In order to run this application:
1. Clone down the [backend server repository](https://github.com/turingschool-examples/overlook-api).
2. `cd` into that project and run `npm install`
3. Run `npm start` Keep this running in the background when viewing the website.
3. After, clone this repository using the SSH key into your local machine
4. `cd` into the project
5. Run `npm install`
6. Once that is finished run `npm start`. You will see a local host link in your terminal
7. Copy and paste that local host link into web browser.
8. Once you reach the login page, you will need to input a username which will be `customer` then any number from 1 to 50 (e.g `customer1`). The password will always be`overlook2021`. 

### Preview of App:
![preview](https://github.com/fernandorobles97/overlook/assets/123911055/134b01da-8847-4fa3-a043-f7a7383af025)
### Context:
I am currently in the final week of mod 2 in the Turing FE program, and recieved this project during the 5th week.  A total of 30 hours were spent working on this project.
### Contributors:
- Fernando Robles - [Github](https://github.com/fernandorobles97)
### Learning Goals:
- Use object and array prototype methods to perform data manipulation
- Create a clear and accessible user interface 
- Make network requests to retrieve data 
- Implement a robust testing suite using TDD
- Write DRY, reusable code that follows SRP and trends toward function purity 

### Tech Stack
- JavaScript, CSS, HTML, Webpack, Mocha/Chai, FETCH and POST API's

### Wins and Challenges
Wins:
- Honing my skills with fetch and post APIs
- Being able to locate where my booking functionality was not filtering correctly and adjusting to be more clear
- Organizing my files to be in a linear order of when code is used as well as some comments to help understand what section you're in

Challenges:
- Getting lost in the logic of how exactly the findAvailableRooms function should work, I found that good naming convention clears up confusion
- Getting the username input to only work for the 50 possibilities it could be
- Having the proper error handling display for if a room type is unavailable versus if there are no rooms for the date
