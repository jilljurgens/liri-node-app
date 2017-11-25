var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var twitKeys = require("./keys.js");
var fs = require("fs");

//This uses the first piece they entered as the command
var command = process.argv[2];

//This is to concatinate the song/movie titles to a string
function conCatArgs(input){
var args = [];
for(i = 3; process.argv.length > i; i++){
    args.push(input[i]);
}
return args.join(" ");
}
var input1 = conCatArgs(process.argv);
console.log(input1);

//wrapping the switch statement in a function to use if do-what-it-says is selected 
//so I can run it back through the function with the populated info from the random.txt file
function wrapper() {

	switch (command) {
		case "my-tweets":
		tweets();
		break;

		case "spotify-this-song":
		spotify(input1);
		break;

		case "movie-this":
		movie(input1);
		break;

		case "do-what-it-says":
		whatSay();
		break;

		default:
		console.log("What are you doing? You must spell like Jill. Try again.")
	}

};
//call the function
wrapper();

//create tweet function to call last 20 tweets and when they were created
function tweets() {
	var client = new Twitter(twitKeys);
	var params = {screen_name: "HelloWorldJill"};
	client.get("statuses/user_timeline", params, function(error, tweets, response){
		if (error) {
			console.log('Error occurred: ' + error);
		}
		else {
			for (i = 0; i < 20; i++) {
			console.log("Created: " + (tweets[i].created_at));
			console.log("Tweeted: " + (tweets[i].text));
			};
		}
	})
};

//create spotify function to return Artist, song name, preview link of sond, album, if nothing was is entered, creat default song (the sign?)
function spotify(input1){
	if (input1 == false){
		  	input1 = "Purple Rain";
		  }
	var spotify = new Spotify({
 		id: "f756107cfef44d209b5ee2854fd6be9c",
    	secret: "caabc9b2d8434eb8af40eb3af819361f"
	});

	spotify.search({type: 'track', query: input1}, function(err, data) {
		if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
		  else {
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song name: " + data.tracks.items[0].name);
			console.log("Link: " + data.tracks.items[0].external_urls.spotify);
			console.log("Album: " + data.tracks.items[0].album.name);
		  }	
	});
}	

//create movie funtion to return title, year, rating, rotten tomato rating,
// country produced, language, plot, actors, if no movie, show Mr. Nobody info

// Then run a request to the OMDB API with the movie specified
function movie() {
	  if (input1 == false){
  		input1 = "Mr.Nobody";
  	  }
request("http://www.omdbapi.com/?t=" + input1 + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

      if (error) {
  			console.log('Error occurred: ' + error);
  }

      else  {
		    // Parse the body of the site and recover just the items needed
		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Produced in: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);

		  }

});
}
//create whatSay function to use fs node package to take text inside of random.txt file and use it to call a command
function whatSay() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		}
		else {
			//split the data up so it know the command vs input1
			input = data.split(", ");
			command = input[0];
			input1 = input[1];
			//call the funtion again
			wrapper();
		};
	})
}