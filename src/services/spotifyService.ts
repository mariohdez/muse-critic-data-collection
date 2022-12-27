"use strict";

import * as dotenv from "dotenv";
import axios from 'axios';
import * as qs from "querystring";
import Artist from "../models/artist";
import { networkInterfaces } from "os";

const spotifyTokenUrl: string = "https://accounts.spotify.com/api/token";

var authToken: string = "";;

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

    await axios(httpOptions).then((resp: {
        data: {
            access_token: string,
            token_type: string,
            expires_in: number
        }
    }) => {
        console.log("Got access otken successfully.")
        authToken = resp.data.access_token;
    }).catch((err) => {
        console.log(err);
    });
}

export async function getArtistId(artistName: string): Promise<Artist> {
    var nameComponents = artistName.split(' ');

    var nameQueryParameter = nameComponents[0];

    for (var i = 1; i < nameComponents.length; ++i) {
        nameQueryParameter += "+" + nameComponents[i];
    }

    console.log(`nameQueryParameter: ${nameQueryParameter}`);

    const spotifySearchUrl: string = `https://api.spotify.com/v1/search?q=${nameQueryParameter}&type=artist&limit=5`;

    var httpOptions = {
        url: spotifySearchUrl,
        method: 'get',
        headers: { 'Authorization': `Bearer ${authToken}` }
    };
    var artist: Artist;

    await axios(httpOptions).then((response: { data: IData, status: number }) => {
        console.log("[getArtistId]: " + response.data.artists.items[0].name)
        artist = {
            biography: '',
            name: response.data.artists.items[0].name,
            profilePictureURL: response.data.artists.items[0].name,
        };
        return artist;
    }).catch((err) => {
        console.log("err: " + err);
        return null;
    });
}

interface IData {
    artists: {
        items: { id: string, name: string, images: { url: string }[] }[]
    }
}
