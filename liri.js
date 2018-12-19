require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var command = process.argv.slice(0);
var input = process.argv.slice(2);
var keys = require("./keys");

fs.appendFile("random.txt ", + command + ", " + input, function (err, data) {

})
var nodeArgs = process.argv;
var query = [];
for (var i = 2; i < nodeArgs.length; i++) {
    query.push(nodeArgs[i]);

}

var argOne = query.splice(0, 1);
var argTwo = query.join(" ");
var input = String(argOne);
var value = String(argTwo);

switch (command) {
    case "concert-this": {
        concertThis(input);
        break;
    }
    case "spotify-this-song": {
        spotifyThis(input);
        break;

    }
    case "movie-this": {
        movieThis(input);
        break;
    }
    case "do-what-it-says": {
        dowhatItsays();
    }
}
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

spotify.search({ type: "track", query: value }, function (err, data) {
    if (err) {
        console.log("Error occurred: " + err);
        return;
    }
    if (value === "") {
        console.log("###############~~~~~~~~~~~~~~~~~ LIRI SAYS ~~~~~~~~~~~~~~~~~###################")
        console.log("Artist: Ace of Base");
        console.log("Song: The Sign");
        console.log("Song Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
        console.log("Album: The Sign");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    }

    else {
        for (i = 0; i < 5; i++) {
            var results = data.tracks.items[i];
            var artist = results.artists[0].name;
            var songName = results.name;
            var songLink = results.external_urls.spotify;
            var album = results.album.name;

            //     * Artist
            //     * The song's name
            //     * A preview link of the song from Spotify
            //     * The album that the song is from
            //     * If no song is provided then your program will default to "The Sign" by Ace of Base.
            //     Need: artist(s), song's name, preview link of song, album//

            console.log("###############~~~~~~~~~~~~~~~~~ LIRI SAYS ~~~~~~~~~~~~~~~~~###################")
            console.log("Artist: " + artist);
            console.log("Song: " + songName);
            console.log("Song Link: " + songLink);
            console.log("Album: " + album);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

        }

    }
});
