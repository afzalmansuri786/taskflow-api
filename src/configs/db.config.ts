import mongoose from 'mongoose';

const mongo_uri = process.env.MONGO_URI ?? "undefined";
const db_name = process.env.DB_NAME ?? 'undefined';

export const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri, {
            dbName: db_name
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};
