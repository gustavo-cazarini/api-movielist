const pool = require('../DB/Connection');

class Genre {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    // Private methods
    #selectQuery(id) {
        let query = `SELECT * FROM genre `;
        if (id) query += `WHERE id = ${id}`;

        return query;
    }

    #postQuery() {
        if (!this.title) return false;

        let query = `INSERT INTO genre (title) 
            VALUES ('${this.title}')`;

        return query;
    }

    #putQuery() {
        if (!this.title && !this.id) return false;

        let query = `UPDATE genre SET title = '${this.title}'
            WHERE id = ${this.id}`;

        return query;
    }

    #removeQuery() {
        if (!this.id) {
            console.log(`Error: id doesn't have a value\n(genre remove query)`);
            return false;
        }
        return `DELETE FROM genre WHERE id = ${this.id}`;
    }

    // Public methods
    async get(id) {
        try {
            const strQuery = this.#selectQuery(id);
            const connection = await pool.connect();
            const queryResult = await connection.query(strQuery);
            return queryResult.rows;
        } catch (err) {
            console.log(`Error: genre get method\n${err}`);
            return false;
        }
    }

    async post() {
        const strQuery = this.#postQuery();
        if (!strQuery) return false;
        try {
            const connection = await pool.connect();
            const queryResult = await connection.query(strQuery);
            return queryResult;
        } catch (err) {
            console.log(`Error: genre post method\n${err}`);
            return false;
        }
    }

    async put() {
        const strQuery = this.#putQuery();

        if (!strQuery) {
            console.log(`Error on genre put query`);
            return false;
        }

        try {
            const connection = await pool.connect();
            const queryResult = await connection.query(strQuery);
            return queryResult;
        } catch (err) {
            console.log(`Error: genre put method\n${err}`);
            return false;
        }
    }

    async remove() {
        const strQuery = this.#removeQuery();

        if (!strQuery) {
            console.log("Error: genre remove query returned false");
            return false;
        }

        try {
            const connection = await pool.connect();
            const queryResult = await connection.query(strQuery);
            return queryResult;
        } catch (err) {
            console.log(`Error: genre remove method\n${err}`);
            return false;
        }
    }
}

module.exports = { Genre };