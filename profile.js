// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// Must require https module
const https = require('https');

// const username = "chalkers";

// Reuire http module for status codes
const http = require('http');

// Input will be our students' user names 
// Output will be badge count and points
// Steps will be:
// 1.) Connect to the API URL (http://teamtreehouse.com/username.json)
// 2.) Read the data
// 3.) Parse the data
// 4.) Print the data


// Print error messages
function printError(error) {
    console.error(error.message);
};

// Function to print message to console
function printMessage (username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
};

// Function to getProfile information
function get(username) {
    try {
        // Connect to the API URL (https://teamtreehouse.com/username.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        // console.log(response.statusCode);
                        if (response.statusCode === 200) {
                            let body = "";
                            // Read the data
                            response.on('data', data => {
                              body += data.toString();
                            });
  
                            response.on('end', () => {
                                try {
                            // Parse the data        
                                const profile = JSON.parse(body);
                            // Print the data
                                printMessage(username, profile.badges.length, profile.points.JavaScript);
                                } catch (error) {
                                    printError(error);
                                };
                            });
                        } else {
                            const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                            const statusCodeError = new Error(message);
                            printError(statusCodeError);
                        };
                    });

        request.on('error', printError);                 
        } catch(error) {
            printError(error);
          };
};

module.exports.get = get;

//getProfile("chalkers");
//getProfile("alanasmith");

//const users = ["chalkers", "alanasmith", "davemcfarland"];

//users.forEach(username => {
//  getProfile(username);
//});

// Because the getProfile function takes one parameter and forEach passes one in, we can shorten our code to this:

//users.forEach(getProfile);

//console.dir(process.argv); // to see what's available on the process object
//console.log(process.argv);

// Notes: 
// The response object has a data event that gets emitted when a piece of data comes in 
// You would think the data handler would run once, once all the data comes in 
// But that is not the case, it's run several times with fragments of the body
// It's also not in string form, its a buffer...a common data type emitted by the node network and file  events
// To convert a buffer to a string, use the toString method on the buffer
// We can construct the body of the response by concatenating each piece of data to the end of a variable called body (let body = "";); we can add the chunks of data as they come in
// But how do you know when the data ends? Whenever you see the data event in node.js, there'll be
// an end event when its completed reading the data in 
// Implement the end handler on the response, line 34
// Right now, the body is just a string, not an object. If you're ever unsure of the type of an object, // you can use the typeOf keyword
// What you should see now is the body of the object, and the type of object, which is a string
// Next, we'll make this into an object by parsing the string
// The process of converting a string into a data structure is called parsing 
// Next, we'll implement the feature of getting information from multiple treehouse students from the 
// command line as arguments to our script 
// Our code isn't flexible at the moment because it's fixed to the username "chalkers"
// What we want to do is have a getProfile function that can take a username
// Now, we can cycle over each of the members of the array with the forEach method 
// forEach iterates over the array and passes each member into a callback function (each member would
// be a username) 
// Process.argv Notes: Gives us the node binary, our app.js, and the users... we don't want the first 
// two so we could use the slice method for a slice of the array starting at the index we want to start 
// at which is the number 2 (the third member in the array) 
// Now we are going to deal with the errors emitted by asynchronous calls 
// Many asynchonous Node.js APIs give you an error event to listen to and if you don't 
// implement the error callback, bad things can happen, for example, your application
// could terminate unexpectedly 
// It's always best to handle the error, even it's just to log it 
// You can create an error state by changing the URL to https://wwww with no dot after it
// and before the site name
// Handling Parsing Errors with Try and Catch: 
// Handling Status code Errors : Handling http errors
// Organzing Your Code with "require" : All of our code is in our app.js file 
// and this isn't ideal. When our app grows it may be difficult to see what's
// going on. We'll create our own module to compartmentalize our code.

