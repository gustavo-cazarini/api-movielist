const pool = require('../DB/Connection');

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

    // Private methods
    #selectQuery(field, id) {
        // The 'field' param needs to be an array, that specifies
        // which fields we need to bring from the database
        let query = `SELECT `;
        let fields = ``;

        if (field?.length) {
            field.forEach(value => {
                fields += `${value}, `;
            });
            fields = fields.slice(0, -2) + fields.slice(-1);
        } else fields += `* `;

        query += fields + `FROM movie `;
        if (id) query += `WHERE id = ${this.id}`

        return query;
    }

    #postQuery() {
        let query = "";
        if (this.title && this.plot && this.year && this.runtime && this.imdbRating && this.poster) {
            query = `INSERT INTO movie (title, plot, year, runtime, imdbRating, Poster)
            VALUES ('${this.title}', '${this.plot}', '${this.year}', '${this.runtime}', '${this.imdbRating}', '${this.poster}')`;
        }
        else return null;
        return query;
    }

    // Public methods
    async get(field, id) {
        const strQuery = this.#selectQuery(field, id);
        const connection = await pool.connect();
        const query = await connection.query(strQuery);

        return query.rows;
    }

    async post() {
        const strQuery = this.#postQuery();
        if (strQuery) {
            const connection = await pool.connect();
            const query = await connection.query(strQuery);
            return query;
        }
        return;
    }
}

module.exports = { Movie };