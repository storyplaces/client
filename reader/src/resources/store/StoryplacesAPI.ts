/**
 * Created by andy on 25/11/16.
 */

import {HttpClient} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';
import {Identifiable} from "../interfaces/Identifiable";
import {Config} from "../../config/Config";

@autoinject()
export class StoryPlacesAPI {
    protected _path;

    constructor(protected client: HttpClient, protected config: Config) {
        let headers = {};

        headers['X-Auth-Token'] = this.config.read('server_auth_password');
        headers['Content-Type'] = "application/json";

        this.client.configure(config => {
            // TODO: Put these in a config file
            config
                .withBaseUrl(this.config.read('server'))
                .withDefaults({
                    headers: headers
                })

        })
    }

    set path(path: string) {
        // Add the trailing / if there is not one already
        if (path.slice(-1) == "/"){
            this._path = path;
        } else {
            this._path = path.concat("/");
        }
    }

    get path(): string {
        return this._path;
    }

    getAll(): Promise<Response> {
        return this.client.fetch(this._path);
    }

    getOne(id: String): Promise<Response> {
        return this.client.fetch(this._path + id);
    }

    save(object: Identifiable): Promise<Response> {
        let method;
        if (typeof object.id !== 'undefined') {
            method = 'put';
        } else {
            method = 'post';
        }
        return this.client.fetch(this._path, {
            method: method,
            body: JSON.stringify(object)
        });
    }
}
