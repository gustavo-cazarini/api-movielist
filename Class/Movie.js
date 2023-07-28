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
        if (id) query += `WHERE id = ${id}`;

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

    #putQuery() {
        let query = `UPDATE movie SET `;

        let allVal = {
            title: Boolean(this.title) ? this.title : null,
            plot: Boolean(this.plot) ? this.plot : null,
            year: Boolean(this.year) ? this.year : null,
            runtime: Boolean(this.runtime) ? this.runtime : null,
            imdbRating: Boolean(this.imdbRating) ? this.imdbRating : null,
            poster: Boolean(this.poster) ? this.poster : null
        }

        Object.keys(allVal).forEach(key => {
            if (Boolean(allVal[key])) {
                query += `${key} = '${allVal[key]}', `;
            }
        });

        query = query.slice(0, -2) + query.slice(-1);
        query += `WHERE id = ${this.id}`

        return query;
    }

    #removeQuery() {
        if (this.id) return `DELETE FROM movie WHERE id = ${this.id}`;
        return;
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

    async put() {
        const strQuery = this.#putQuery();
        const connection = await pool.connect();
        const query = await connection.query(strQuery);
        return query;
    }

    async remove() {
        const strQuery = this.#removeQuery();
        if (strQuery) {
            try {
                const connection = await pool.connect();
                const query = await connection.query(strQuery);
                return query;
            } catch (err) {
                console.log(`Error: ${err}`);
            }
        } else console.log('Error on remove/delete query');
    }
}

module.exports = { Movie };