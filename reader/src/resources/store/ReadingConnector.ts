import {AbstractConnector} from "./AbstractConnector";
import {inject, NewInstance, computedFrom} from 'aurelia-framework';
import {Reading} from "../models/Reading";
import {ReadingAPI} from "./ReadingAPI";

import {ReadingCollection} from "../collections/ReadingCollection";

import moment = require('moment');
/**
 * Created by andy on 09/12/16.
 */

@inject(ReadingCollection, NewInstance.of(ReadingAPI))
export class ReadingConnector extends AbstractConnector<Reading> {

    constructor(private readingCollection : ReadingCollection, private storyplacesAPI: ReadingAPI){
        super();
        this.storyplacesAPI.path = "/reading/";
    }

    get all(): Array<Reading> {
        return this.readingCollection.all;
    }

    byId(id: string): Reading {
        return this.readingCollection.get(id);
    }

    byIdOrFetch(id: string): Promise<Reading> {
        return new Promise(complete => {
            if (this.readingCollection.get(id)) {
                complete(this.readingCollection.get(id));
                return;
            }

            complete(this.fetchById(id).then(() => this.readingCollection.get(id)));
        });
    }

    fetchAll(): Promise<undefined> {
        return this.storyplacesAPI.getAll()
            .then(readings => readings.json() as any)
            .then(readings => {
                this.readingCollection.saveMany(readings);
                return;
            });
    }

    fetchById(id: string): Promise<undefined> {
        return this.storyplacesAPI.getOne(id)
            .then(reading => reading.json() as any)
            .then(reading => {
                this.readingCollection.save(reading);
                return;
            });
    }

    fetchForUserAndStory(userId: string, storyId: string): Promise<undefined> {
        return this.storyplacesAPI.getAllForStoryAndUser(storyId, userId)
            .then(readings => readings.json() as any)
            .then (readings => {
                this.readingCollection.saveMany(readings);
                return;
            });
    }

    save(object: Reading): Promise<undefined> {
        object.timestamp = moment().unix();
        return this.storyplacesAPI.save(object)
            .then(reading => reading.json())
            .then (reading => {
                this.readingCollection.save(reading);
                return;
            });
    }

    remove(id: string): Promise<boolean> {
        return new Promise((success) => {
            return success(true);
        });
    }

    byStoryId(storyId: string): Array<Reading> {
        return this.all.filter(reading => reading.storyId == storyId);
    }
}