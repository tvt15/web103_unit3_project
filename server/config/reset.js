import { pool } from './database.js'
import './dotenv.js'
import { FairData } from '../data/fair.js'
import { EventData } from '../data/fair.js'

const createFairTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;

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
const createEventTable = async () => {
    const createEventQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            location_id INTEGER NOT NULL,
            image TEXT,
            FOREIGN KEY (location_id) REFERENCES locations(id)
        )
    `

    try {
        const res = await pool.query(createEventQuery)
        console.log('🎉 Events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating Events table', err)
    }
}
const seedEventsTable = async () => {
    await seedFairTable()
    await createEventTable()

    EventData.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (name, description, date, time, location_id, image) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [
            event.name,
            event.description,
            event.date,
            event.time,
            event.location_id,
            event.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }
            console.log(`✅ ${event.name} added successfully`)
        })
    })
}


seedEventsTable()
// getAllLocations()