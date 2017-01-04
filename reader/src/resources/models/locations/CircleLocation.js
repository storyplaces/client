"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) 2016
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
var TypeChecker_1 = require("../../utilities/TypeChecker");
var aurelia_framework_1 = require("aurelia-framework");
var BaseLocation_1 = require("./BaseLocation");
var CircleLocation = (function (_super) {
    __extends(CircleLocation, _super);
    function CircleLocation(typeChecker, data) {
        _super.call(this, typeChecker);
        if (data) {
            this.fromObject(data);
        }
    }
    CircleLocation.prototype.fromObject = function (data) {
        if (data === void 0) { data = { id: undefined, type: undefined, lon: undefined, lat: undefined, radius: undefined }; }
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.type = data.type;
        this.lon = data.lon;
        this.lat = data.lat;
        this.radius = data.radius;
    };
    CircleLocation.prototype.toJSON = function () {
        return {
            id: this.id,
            type: this.type,
            lat: this.lat,
            lon: this.lon,
            radius: this.radius
        };
    };
    Object.defineProperty(CircleLocation.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this.typeChecker.validateAsStringOrUndefined("Type", value);
            this.typeChecker.validateScalarValue("Type", "circle", value);
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleLocation.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this.typeChecker.validateAsNumberOrUndefined("Radius", value);
            this._radius = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleLocation.prototype, "lon", {
        get: function () {
            return this._lon;
        },
        set: function (value) {
            this.typeChecker.validateAsNumberOrUndefined("Lon", value);
            this._lon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleLocation.prototype, "lat", {
        get: function () {
            return this._lat;
        },
        set: function (value) {
            this.typeChecker.validateAsNumberOrUndefined("Lat", value);
            this._lat = value;
        },
        enumerable: true,
        configurable: true
    });
    CircleLocation = __decorate([
        aurelia_framework_1.inject(TypeChecker_1.TypeChecker)
    ], CircleLocation);
    return CircleLocation;
}(BaseLocation_1.BaseLocation));
exports.CircleLocation = CircleLocation;
