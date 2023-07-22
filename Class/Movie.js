class Movie {
    constructor(id, title, plot, year, runtime, imdbRating, poster) {
        this.id = id;
        this.title = title;
        this.plot = plot;
        this.year = year;
        this.runtime = runtime;
        this.imdbRating = imdbRating;
        this.poster = poster;
    }
}

module.exports = { Movie };