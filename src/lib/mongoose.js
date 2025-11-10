
// export default connectionToDatabase
import mongoose from 'mongoose';

// Ensure the MONGODB_URI is available in your Next.js environment variables (.env.local)
const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

/**
 * Global is used here to maintain a cached connection across hot-reloads
 * in development. This prevents connections growing during development.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        // Log the connected database name when using the cached connection
        console.log(`Using cached connection to DB: ${cached.conn.connections[0].name}`);
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Recommended setting
            maxPoolSize: 10,       // Max number of sockets
        };

        // Connect to MongoDB
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
    // Log the connected database name for verification
    console.log(`MongoDB connected successfully to DB: ${cached.conn.connections[0].name}`);
    return cached.conn;
}

export default dbConnect;

// const { MongoClient } = require('mongodb');
// let dbConnection;

// module.exports = {
//     connectToDb: (cb) => {
//         MongoClient.connect(
//             process.env.MONGODB_URI
//         )
//             .then((client) => {
// Choose the learning_platform database
//                 dbConnection = client.db(process.env.MONGODB_DB);
//                 console.log('====================================');
//                 console.log("Connection successful");
//                 console.log('====================================');
//                 return cb();
//             })
//             .catch(err => {
//                 console.log(err);
//                 return cb(err);
//             });
//     },
// Always returns the learning_platform database connection
//     getDb: () => dbConnection
// };
