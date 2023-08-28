const { query } = require('express');
const pool = require('../DB/Connection');
const { Movie } = require('./Movie');

// class Image extends Movie
class Image {
    constructor(id, url, movieId) {
        this.id = id;
        this.url = url;
        this.movieId = movieId;
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

    #postQuery() {
        if (!this.url?.length && !this.movieId) return false;
        let query = `INSERT INTO image (url, fk_movie_id) VALUES `;
        this.url.forEach(fileurl => {
            query += `('${fileurl}', ${this.movieId}), `;
        });
        query = query.slice(0, -2) + query.slice(-1);
        return query;
    }

    #deleteQuery() {
        if (!this.id) {
            console.log("Error: id is missing\nAt Image Class, deleteQuery private method");
            return false;
        }
        return `DELETE FROM image WHERE id = ${this.id}`;
    }

    async getImage(fields) {
        const strQuery = this.#getQuery(fields);
        const connection = await pool.connect();
        const queryResult = await connection.query(strQuery);
        return queryResult.rows;
    }

    async postImage() {
        const strQuery = this.#postQuery();
        if (!strQuery) return false;
        const connection = await pool.connect();
        const queryResult = await connection.query(strQuery);
        return queryResult;
    }

    async deleteImage() {
        const strQuery = this.#deleteQuery();
        if (!strQuery) {
            console.log("Error: deleteImage method at Image class\nQuery is missing");
            return false;
        }
        try {
            const connection = await pool.connect();
            const queryResult = await connection.query(strQuery);
            return queryResult;
        } catch (err) {
            console.log(`Error: deleteImage method at Image class\n${err}`);
            return false;
        }
    }
}

module.exports = { Image };