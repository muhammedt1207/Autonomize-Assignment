import mongoose from 'mongoose'

export default async () => {
    try {
        const mongouri = process.env.MONGOURI

        if (!mongouri) {
            throw new Error("MongoURI not found");
        }
        mongoose.connect(mongouri?.trim())
        console.log(`🍃 MongoDB connected successfully 🍃`);
        

    } catch (error) {
        console.log(error);
        
    }
}
