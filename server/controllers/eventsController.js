import { pool } from '../config/database.js'
import '../config/dotenv.js'

export const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM events`);
        res.json(result.rows);
        //console.log(result.rows)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// export default{
//     getAllEvents
// }

