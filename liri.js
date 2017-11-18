//set the requires up here?
var request = require("request");

var key = process.argv[2];
//var input1 = process.argv[3];
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



switch (key) {
	case "my-tweets":
	tweets();
	break;

	case "spotify-this-song":
	spotify(input1);
	break;

	case "movie-this":
	movie(input1);
	break;

	case "do-what-it-say":
	whatSay();
	break;

	default:
	console.log("What are you doing? You must spell like Jill. Try again.")
}


//create tweet function to call last 20 tweets and when they were created
//function tweets(input1) {
//}
//create spotify function to return Artist, song name, preview link of sond, album, if nothing was is entered, creat default song (the sign?)

//create movie funtion to return title, year, rating, rotten tomato rating, country produced, language, plot, actors, if no movie, show Mr. Nobody info


// Then run a request to the OMDB API with the movie specified
function movie() {
request("http://www.omdbapi.com/?t=" + input1 + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the items needed
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Produced in: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);//.split(",")  ?
    //console.log(JSON.parse(body));

  }
});
}
//create whatSay function to use fs node package to take text inside of random.txt file and use it to call a command

//Bonus: write the output to a .txt file called log.txt

