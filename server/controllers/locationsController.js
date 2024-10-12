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

export const getLocationById = async(req,res)=>{
    const locationid = req.params.id;
    try{
        const result = await pool.query(`SELECT * FROM locations WHERE id= $1`, [locationid]);
        if (result.rows.length===0){
            return res.status(404).send("Location not found");
        }
        return res.json(result.rows[0])
    }catch(error){
        res.status(500).send('Server error');
    }
}

// export default{
//     getAllLocations
// }
