require("dotenv").config();
var request = require("request");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv.slice(3).join("+");

fs.appendFile("random.txt ", + command + ", " + input, function (err, data) {

});

commandSwitch(command, input);
//main command switch statement function
function commandSwitch(command, input) {
    switch (command) {
        case 'concert-this':
            concertThis(input);
            break;
        case 'spotify-this-song':
            spotifyThis(input);
            break;
        case 'movie-this':
            movieThis(input);
            break;
        case 'do-what-it-says':
            doWhatItSays(input);
            break;
    }
}

// movie-this function
function movieThis(input) {
    var movieSearch = input;
    var Url = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
    // This line is just to help us debug against the actual URL.
    // console.log(Url);
    axios.get(Url).then(
        function (response) {
            //  * Title of the movie.
            //  * Year the movie came out.
            //  * IMDB Rating of the movie.
            //  * Rotten Tomatoes Rating of the movie.
            //  * Country where the movie was produced.
            //  * Language of the movie.
            //  * Plot of the movie.
            //  * Actors in the movie.
            //   var result = {
            console.log("#######################~~~~~~~ LIRI SAYS: HERE IS THE MOVIE!!! ~~~~~~~~############################")
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Production: " + response.data.Country);
            console.log("Movie Language: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Movie Actors: " + response.data.Actors);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        }
    );
}


// spotify-this function
function spotifyThis(input) {
    var value = input;
    var nodeArgs = process.argv;
    var query = [];
    for (var i = 2; i < nodeArgs.length; i++) {
        query.push(nodeArgs[i]);
    }
    var argOne = query.splice(0, 1);
    var argTwo = query.join(" ");
    var input = String(argOne);
    var value = String(argTwo);
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: "track", query: value }, function (err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }

        if (value === "") {
            console.log("####################~~~~~~~~ LIRI SAYS: HERE'S A RECOMMENDED SONG ~~~~~~~~~~~########################")
            console.log("Artist: Ace of Base");
            console.log("Song: The Sign");
            console.log("Song Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
            console.log("Album: The Sign");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

        }

        else {
            for (i = 0; i < 5; i++) {
                var results = data.tracks.items[i];
                var artist = results.artists[0].name;
                var songName = results.name;
                var songLink = results.external_urls.spotify;
                var album = results.album.name;

                //     * Artist(s)
                //     * The song's name
                //     * A preview link of the song from Spotify
                //     * The album that the song is from
                //     * If no song is provided then your program will default to "The Sign" by Ace of Base.
                //     Need: artist(s), song's name, preview link of song, album//

                console.log("###############~~~~~~~~~~~~~~~~~ LIRI SAYS: HERE ARE THE SONGS!!! ~~~~~~~~~~~~~~~~~###################")
                console.log("Artist: " + artist);
                console.log("Song: " + songName);
                console.log("Song Link: " + songLink);
                console.log("Album: " + album);
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            }

        }
    });
}

//concert-this function
function concertThis(input) {
    var artist = input;
    var Url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&tracker_count=10";
    request(Url, function (error, response, data) {
        if (!error && response.statusCode === 200) {
            data = JSON.parse(data);
            for (var event in data) {
                console.log("#######################~~~~~~~ LIRI SAYS: HERE ARE THE CONCERTS!!! ~~~~~~~~############################")
                console.log("Venue: ", data[event].venue.name);
                console.log("Location: ", data[event].venue.city + ", " + data[event].venue.region + ", " + data[event].venue.country);
                var m = moment(data[event].datetime).format('MM/DD/YYYY, h:mm a').split(", ");
                console.log("Date: ", m[0]);
                console.log("Time: ", m[1]);
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            }
        }
    });
}