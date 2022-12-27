"use strict";

import { connectToDatabase } from './repository/artistRepository';
import { getSpotifyAuthenticationToken, getArtistId } from "./services/spotifyService";

connectToDatabase()
    .then(async () => {
        console.error("Connected to the DB successfully.");
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

getSpotifyAuthenticationToken()
    .then(async () => {
        console.log("got spotify auth token.")
        getArtistId('Kendrick Lamar').then(async () => {
            
        })
    }).catch((error: Error) => {
        console.error("Spotify auth token failed", error);
        process.exit();
    });
