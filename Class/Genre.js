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
}

module.exports = { Genre };