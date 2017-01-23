/*!*****************************************************************
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
import {Router, RouterConfiguration} from "aurelia-router";
import {autoinject,computedFrom} from "aurelia-framework";
import {Authenticator} from "./resources/auth/Authenticator";
import {UserConfig} from "./resources/store/UserConfig";

@autoinject()
export class App {
    router: Router;

    constructor(private authenticator: Authenticator, private userConfig: UserConfig) {
    }

    attached() {
        this.authenticator.login();
    }

    @computedFrom('router.currentInstruction.config.name')
    get readingAStory():boolean {
        console.log("get reading a story");

        if (!this.router.currentInstruction) {
            return false;
        }

        return this.router.currentInstruction.config.name == 'story-reading' || this.router.currentInstruction.config.name == 'page-read';
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'StoryPlaces';

        config.map([
            {route: '/', name: 'home', moduleId: 'pages/story-overview-page', title: 'Story List'},
            {route: '/help', name: 'help', moduleId: 'pages/help-page', title: 'Help'},
            {route: '/about', name: 'about', moduleId: 'pages/about-page', title: 'About'},
            {route: '/tag/:tag', name: 'tag', moduleId: 'pages/story-overview-page', title: 'Story List'},
            {route: '/story/:storyId', moduleId: 'pages/story-detail-page', title: 'Story', name: 'story-detail'},
            {route: '/story/:storyId/:readingId', moduleId: 'pages/story-reading-page', title: 'Reading', name: 'story-reading'},
            {route: '/story/:storyId/:readingId/:pageId', moduleId: 'pages/page-read-page', title: 'Page', name: 'page-read'}
        ]);

        this.router = router;
        console.log(this.router);
    }

}
