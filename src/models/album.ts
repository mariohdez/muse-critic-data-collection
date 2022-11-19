"use strict";

import { ObjectId } from "mongodb";

export default class Album {
    constructor(public name: string, public artistId: string, public overallRating: number, public ratingsCount: number, public coverArtURL: string, public id?: ObjectId) { }
}
