"use strict";

import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Artist from "../models/artist";

export const collections: { artistsCollection?: mongoDB.Collection } = {}

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

export async function CreateArtist(artist: Artist)
{
    if (!collections.artistsCollection) return;

    var result = await collections.artistsCollection.insertOne(artist);

    console.log(`The mongodb document id of the artist is: ${result.insertedId}`);
}
