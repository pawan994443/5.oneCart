import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;

        if (!mongoUrl) {
            throw new Error("MONGODB_URL is not defined");
        }

        await mongoose.connect(mongoUrl);

        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDb;
