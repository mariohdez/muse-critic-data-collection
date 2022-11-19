"use strict";

import { ObjectId } from "mongodb";

export default class Artist {
    constructor(public name: string, public biography: string, public profilePictureURL: string, public id?: ObjectId) { }
}
