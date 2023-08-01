# Interview for Junior Full-Stack developer

Dear reader,

this repo is a test project using 
- an Angular 16 frontend application with a form component to search for cities and a table component for displaying the results 
- a NestJS 10 backend application for returning the list of the cities which is matching the entry submitted from the frontend.

## What are additional features?
1. The backend matches and recognizes umlauts and written out umlauts: 'Muenchen' is recognized as 'München' and vice versa
2. Implemented E2E testing with Cypress in addition to Jasmin/Karma component testing
3. The frontend table for displaying the cities has sorting functionality
4. Information is displayed if no results are found or an error occurred
5. Used Angular Material for styling and theming

## How to test?
Make sure you have Nodejs and Angular installed
1. In the Terminal, go to the 'interview-backend' folder and run the command npm i 
2. Run the command npm run start
3. In the Terminal, go to the 'interview-frontend' folder and run the command npm i
4. Run the command ng serve
5. Visit http://localhost:4200/
6. You should now be able to test the app and search for cities

