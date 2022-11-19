"use strict";

import { ObjectId } from "mongodb";
import { connectToDatabase, collections } from './repository/artistRepository';


connectToDatabase()
    .then(async () => {
        const query = { _id: new ObjectId("637707a10e18a58d74d86fcb") };
        const test = await collections.artistsCollection!.findOne(query);

        console.log(test);
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
