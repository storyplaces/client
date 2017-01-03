/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) $today.year
 University of Southampton
 Charlie Hargood, cah07r.ecs.soton.ac.uk
 Kevin Puplett, k.e.puplett.soton.ac.uk
 David Pepper, d.pepper.soton.ac.uk

 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * The name of the University of Southampton nor the name of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE ABOVE COPYRIGHT HOLDERS BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import {autoinject, BindingEngine} from "aurelia-framework";
import {Gps, GpsState} from "./Gps";
import {LocationInformation} from "./LocationWithHeading";

export enum LocationSource {
    GPS = 1,
    Map = 2
}


@autoinject()
export class LocationRepository {

    ok: boolean = false;
    gpsPermissionDenied: boolean = false;
    gpsUnavailable: boolean = false;
    gpsUnsupported: boolean = false;

    location: LocationInformation ={latitude: 0, longitude:0, heading:0, accuracy:0};
    source: LocationSource = LocationSource.GPS;

    constructor(private gps: Gps, private bindingEngine: BindingEngine) {
        this.updateStateFromGps(gps.state);

        this.bindingEngine.propertyObserver(this.gps, 'state')
            .subscribe((newState: GpsState) => {
                this.updateStateFromGps(newState);
            });

        this.bindingEngine.propertyObserver(this.gps, 'position')
            .subscribe((newPosition: Position) => {
                this.updatePositionFromGps(newPosition)
            });
    }

    private updateStateFromGps(newState: GpsState) {
        if (this.source == LocationSource.GPS) {
            this.ok = (newState == GpsState.INITIALISING || newState == GpsState.OK);
            this.gpsPermissionDenied = (newState == GpsState.PERMISSION_DENIED);
            this.gpsUnavailable = (newState == GpsState.ERROR);
            this.gpsUnsupported = (newState == GpsState.POSITION_UNSUPPORTED);
        }
    }

    private updatePositionFromGps(newPosition: Position) {
        if (this.source == LocationSource.GPS && this.ok) {
            this.location = {
                latitude: newPosition.coords.latitude,
                longitude: newPosition.coords.longitude,
                heading: newPosition.coords.heading,
                accuracy: newPosition.coords.accuracy
            };
        }
    }
}