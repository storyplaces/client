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
import {BaseCondition} from "./BaseCondition";
import {TypeChecker} from "../../utilities/TypeChecker";
import {inject} from "aurelia-framework";

@inject(TypeChecker)

export class TimeRangeCondition extends BaseCondition {

    private _variable: string;
    private _start: string;
    private _end: string;

    constructor(typeChecker: TypeChecker, data?: any) {
        super(typeChecker);

        if (data) {
            this.fromObject(data);
        }
    }

    fromObject(data = {id: undefined, type: undefined, variable: undefined, start: undefined, end: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.type = data.type;
        this.variable = data.variable;
        this.start = data.start;
        this.end = data.end;
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            variable: this.variable,
            start: this.start,
            end: this.end
        };
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Type", value);
        this.typeChecker.validateScalarValue("Type", "timerange", value);
        this._type = value;
    }

    get variable(): string {
        return this._variable;
    }

    set variable(value: string) {
        this.typeChecker.validateAsStringOrUndefined("variable", value);
        this._variable = value;
    }

    get end(): string {
        return this._end;
    }

    set end(value: string) {
        this.typeChecker.isTimePatternString("end", value);
        this._end = value;
    }

    get start(): string {
        return this._start;
    }

    set start(value: string) {
        this.typeChecker.isTimePatternString("start", value);
        this._start = value;
    }
}