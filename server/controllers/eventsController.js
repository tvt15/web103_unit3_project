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

export const getEventById = async(req,res)=>{
    const location_id = req.params.id
    try{
        const result = await pool.query(`SELECT * FROM events WHERE location_id = $1`,[location_id])
        if (result.rows.length===0){
            return res.status(404).send("Event not found");
        }
        return res.json(result.rows)
    }
    catch(error){}
}

// export default{
//     getAllEvents
// }

