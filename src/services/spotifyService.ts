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

    var authValue = 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64');

    const data = {
        grant_type: "client_credentials",
    };

    var httpOptions = {
        url: spotifyTokenUrl,
        data: qs.stringify(data),
        method: 'post',
        headers: { 'Authorization': authValue }
    };

    await axios(httpOptions).then((resp: {data: {
        access_token: string,
        token_type: string,
        expires_in: number
    }}) => {
        console.log(resp.data);
    }).catch((err) => {
        console.log(err);
    });
}
