import { pool } from '../config/database.js'
import '../config/dotenv.js'

export const getAllLocations = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM locations`);
        res.json(result.rows);
        //console.log(result.rows)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// export default{
//     getAllLocations
// }
