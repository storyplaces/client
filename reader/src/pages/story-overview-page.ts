/**
 * Created by andy on 28/11/16.
 */
import {StoryConnector} from "../resources/store/StoryConnector";
import {autoinject, BindingEngine, computedFrom} from "aurelia-framework";
import {Story} from "../resources/models/Story";

@autoinject()
export class StoryOverviewPage {
    constructor(private storyConnector: StoryConnector,
                private bindingEngine: BindingEngine) {
    }

    tag: string;
    tags: Array<string>;

    audiences = [{id: "family", name: "Family Friendly"}, {id: "general", name: "General Audience"}, {id: "advisory", name: "Advisory Content"}];
    selectedAudiences: Array<string> = [];
    selectedTags: Array<string> = [];

    @computedFrom('storyConnector.all')
    get stories(): Array<Story> {
        console.log(this.storyConnector.all);
        return this.storyConnector.all;
    }

    @computedFrom('selectedTags.length', ' selectedAudiences.length')
    get filtersApplied(): boolean {
        console.log("get filter");
        return (this.selectedTags.length != this.tags.length) || (this.selectedAudiences.length != this.audiences.length)
    }

    activate(params) {
        this.tag = params.tag;
        this.selectedTags = [];
        console.log("tag ", this.tag);
        return this.refresh().then(() => {
            this.tags = [];

            this.storyConnector.all.forEach(story => {
                this.addUniqueTags(story);
            });

            if (params.tag) {
                let index = this.tags.indexOf(params.tag);
                if (index != -1) {
                    this.selectedTags.push(this.tags[index]);
                }
            }

            if (this.selectedTags.length == 0) {
                this.selectAllTags();
            }

            this.selectAllAudiences();
        });
    }

    clearFilters() {
        this.selectAllTags();
        this.selectAllAudiences()
    }

    private selectAllTags() {
        this.selectedTags = Array.from(this.tags);
    }

    private selectAllAudiences() {
        this.selectedAudiences = [];
        this.audiences.forEach(audience => {
            this.selectedAudiences.push(audience.id);
        });
    }

    refresh() {
        return this.storyConnector.fetchAll();
    }

    private addUniqueTags(story: Story) {
        story.tags.forEach(tag => {
            if (this.tags.indexOf(tag) == -1) {
                this.tags.push(tag);
            }
        });
    }

}