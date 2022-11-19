"use strict";

// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { artistsCollection?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();

    if (!process.env.DB_CONN_STRING) {
        throw new Error("Please set DB_CONN_STRING in the .env file.");
    }

    if (!process.env.ARTISTS_COLLECTION_NAME) {
        throw new Error("Please set DB_CONN_STRING in the .env file.");
    }

    const dbConnectionString: string = process.env.DB_CONN_STRING;
    const artistsCollectionName: string = process.env.ARTISTS_COLLECTION_NAME;

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConnectionString);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const artistsCollection: mongoDB.Collection = db.collection(artistsCollectionName);

    collections.artistsCollection = artistsCollection;
}
