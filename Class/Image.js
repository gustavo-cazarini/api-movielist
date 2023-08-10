const pool = require('../DB/Connection');

// class Image extends Movie
class Image {
    constructor(id, url, movieId) {
        this.id = id;
        this.url = url;
        this.movieId = movieId
    }

    #getQuery(fields) {
        let query = `SELECT `;
        if (!fields?.length) query += `* `;
        else {
            fields.forEach(value => {
                query += `${value}, `;
            });
            query = query.slice(0, -2) + query.slice(-1);
        }
        query += `FROM image `;
        if (this.id) query += `WHERE id = ${this.id}`;
        else if (this.movieId) query += `WHERE id = ${this.movieId}`;

        return query;
    }

    async getImage(fields) {
        const strQuery = this.#getQuery(fields);
        const connection = await pool.connect();
        const queryResult = await connection.query(strQuery);
        return queryResult.rows;
    }
}

module.exports = { Image };