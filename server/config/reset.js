import { pool } from './database.js'
import './dotenv.js'
import FairData from '../data/fair.js'

const createFairTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            image TEXT NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 Fair table created successfully')
    } catch (err) {
        console.error('⚠️ error creating Fair table', err)
    }
}

const seedFairTable = async () => {
    await createFairTable()

    FairData.forEach((fair) => {
        const insertQuery = {
            text: 'INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [
            fair.name,
            fair.address,
            fair.city,
            fair.state,
            fair.zip,
            fair.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting fair', err)
                return
            }
            console.log(`✅ ${fair.name} added successfully`)
        })
    })
}
// const getAllLocations = async () => {
//     try {
//         const result = await pool.query(`SELECT * FROM locations`);
//         //res.json(result.rows);
//         console.log(result.rows)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// };

seedFairTable()
// getAllLocations()