"use strict";

import * as dotenv from "dotenv";
import axios from 'axios';
const qs = require("qs");

const spotifyTokenUrl: string = "https://accounts.spotify.com/api/token";

export async function getSpotifyAuthenticationToken() {
    dotenv.config();

    if (!process.env.SPOTIFY_CLIENT_ID) {
        throw new Error("Please set SPOTIFY_CLIENT_ID in the .env file.");
    }

    if (!process.env.SPOTIFY_CLIENT_SECRET) {
        throw new Error("Please set SPOTIFY_CLIENT_SECRET in the .env file.");
    }

    const clientId: string = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET;

    var authValue = 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64');

    const data = {
        grant_type: "client_credentials",
    };

    const options = {
        headers: {
            'Authorization': authValue
        },
        data: qs.stringify(data),
        spotifyTokenUrl,
    };

    var response: any = await axios.post(spotifyTokenUrl, options)

    console.log(response);
}
