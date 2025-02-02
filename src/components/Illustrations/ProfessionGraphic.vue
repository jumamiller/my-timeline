<template>
    <span class="profession_graphic">
        <svg
            class="profession_graphic__text_layer"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <foreignObject
                :x="coords.text.x"
                :y="coords.text.y"
                :style="{ opacity: as.textOpacity }"
                height="500"
                class="profession_graphic__text"
            >
                <h2 ref="title" class="profession_graphic__title" xmlns="http://www.w3.org/1999/xhtml">
                    Which I made my profession!
                </h2>
                <main class="profession_graphic__main">
                    <p>{{this.mainText}}</p>
                </main>
            </foreignObject>
        </svg>
        <svg
            class="profession_graphic__upper_layer"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <AnimationPath
                :drawPercentage="as.timeline"
                :d="timelinePath"
                stroke="#FFFFFF"
                stroke-width="20"
                fill="none"
            />
        </svg>
        <RainbowBackground
            class="profession_graphic__rainbow"
            :animationPercentage="0.4"
            effectType="stretch"
        />
        <svg
            class="profession_graphic__lower_layer"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <AnimationPath
                :drawPercentage="as.timeline"
                :d="timelinePath2"
                stroke="#FFFFFF"
                stroke-width="20"
                fill="none"
            />
            <AnimationPath
                :drawPercentage="as.timeline"
                :d="timelinePath3"
                stroke="#FFFFFF"
                stroke-width="20"
                fill="none"
            />
            <AnimationPath
                :drawPercentage="as.timeline"
                :d="timelinePath4"
                stroke="#FFFFFF"
                stroke-width="20"
                fill="none"
            />
            <AnimationPath
                :drawPercentage="as.timeline"
                :d="timelinePath5"
                stroke="#FFFFFF"
                stroke-width="20"
                fill="none"
            />
        </svg>
    </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import formatDistance from 'date-fns/formatDistance';
import GraphicMixin from '@/mixins/GraphicMixin';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import RainbowBackground from '@/components/Molecules/RainbowBackground.vue';

@Component({
    components: {
        AnimationPath,
        RainbowBackground,
    },
})
export default class ProfessionGraphic extends GraphicMixin {
    titleElementWidth: number;
    mainText: string;

    constructor() {
        super();
        this.graphicLayout = {
            text: {
                desktop: new Point({ x: 22, y: 50 }),
                mobile: new Point({ x: 4, y: 40 }),
            },
        };
        this.timeline = [
            { key: 'timeline', start: 0, end: 1 },
            { key: 'textOpacity', start: 0.2, end: 0.4 },
        ];
        this.titleElementWidth = 600;
        const timeSinceFeedbackCompany = formatDistance(new Date(2017, 9, 11), Date.now());
        this.mainText = `And I started working at Feedback Company ${timeSinceFeedbackCompany} ago. Building the frontend for a large scale web app in Vue, basically on my own!`;
    }

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }
    get timelinePath():string {
        const endX:number = this.end.x;
        const path = new Path({
            points: [
                new Point({ x: this.start.x, y: -1 }),
                new Point({ x: this.start.x, y: 0 }),
                new Point({ x: 50, y: 100 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    get timelinePath2():string {
        const endX:number = this.end.x;
        const path = new Path({
            points: [
                new Point({ x: 20, y: -1 }),
                new Point({ x: 20, y: 0 }),
                new Point({ x: 29, y: 30 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    get timelinePath3():string {
        const endX:number = this.end.x;
        const path = new Path({
            points: [
                new Point({ x: 10, y: -1 }),
                new Point({ x: 10, y: 0 }),
                new Point({ x: 12, y: 30 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    get timelinePath4():string {
        const endX:number = this.end.x;
        const path = new Path({
            points: [
                new Point({ x: 80, y: -1 }),
                new Point({ x: 80, y: 0 }),
                new Point({ x: 50, y: 85 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    get timelinePath5():string {
        const endX:number = this.end.x;
        const path = new Path({
            points: [
                new Point({ x: 35, y: -1 }),
                new Point({ x: 35, y: 0 }),
                new Point({ x: 45, y: 40 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .profession_graphic
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
    .profession_graphic__rainbow
        position: absolute
        z-index: 2
        top: 0
        width: 100vw
    .profession_graphic__upper_layer
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: absolute
        z-index: 3
    .profession_graphic__lower_layer
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: absolute
        z-index: 1
        opacity: 0.2
    .profession_graphic__title
        @extend %headline2_style
        display: inline-block
        margin-top: 16px
        color: main.$white
        text-shadow: 4px 4px 0px #3A5F6B
        max-width: 100vw
        @media (max-width: 1068px)
            font-size: 70px
        @media (max-width: 620px)
            font-size: min(70px, 11vw)
            margin-top: min(10px, 11vw)
            text-shadow: 3px 3px 0px #3A5F6B
    .profession_graphic__main
        @extend %body1_style
        color: main.$white
        font-size: max(min(1.5em, 8vw), 12px)
        line-height: 1.5em
        margin-top: max(min(10px, 11vw), 16px)
        width: 100%
        text-shadow: 2px 2px 0px #3A5F6B
        @media (max-width: 620px)
            font-size: max(min(1.3em, 5vw), 12px)
    .profession_graphic__text
        width: 600px
        @media (max-width: 620px)
            padding: 0 12px
            width: 92vw
            font-size: max(min(1.3em, 5vw), 12px)
    .profession_graphic__text_layer
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: absolute
        z-index: 5
</style>
