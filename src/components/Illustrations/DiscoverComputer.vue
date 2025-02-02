<template>
    <div>
        <svg class="discover_computer" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <AnimationPath :drawPercentage="as.timeline" :d="timelineSVGPath" id="general_path" stroke="#056CF2" stroke-width="16" fill="none"/>
            <g id="rainbows">
                <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(0)" class="rainbow" id="rainbow-1" stroke="#5EBD3E" stroke-width="16" fill="none"/>
                <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(1)" class="rainbow" id="rainbow-2" stroke="#FFB900" stroke-width="16" fill="none"/>
                <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(2)" class="rainbow" id="rainbow-3" stroke="#F78200" stroke-width="16" fill="none"/>
                <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(3)" class="rainbow" id="rainbow-4" stroke="#E23838" stroke-width="16" fill="none"/>
                <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(4)" class="rainbow" id="rainbow-5" stroke="#973999" stroke-width="16" fill="none"/>
                <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(5)" class="rainbow" id="rainbow-6" stroke="#009CDF" stroke-width="16" fill="none"/>
            </g>
            <g id="computer_group" ref="computer" :transform="coords.computer.transform">
                <defs>
                    <path d="M29,0 C29,0 28,14.6666667 26,44 L0,44 L0,57 L138,57 L138,44 L112,44 L109,0 C55.6666667,0 29,0 29,0 Z" id="computer_path"></path>
                </defs>
                <g id="computer" transform="translate(-182, 0)">
                    <g id="stand" transform="translate(113.000000, 314.000000)">
                        <mask id="mask-2" fill="white">
                            <use xlink:href="#computer_path"></use>
                        </mask>
                        <use fill="#9BAFB9" xlink:href="#computer_path"></use>
                        <polygon id="stand_shadow" fill="#77909E" opacity="0.364932106" mask="url(#mask-2)" points="28 2 28 10 110 10 110 2"></polygon>
                    </g>
                    <path id="computer_frame--top" fill="#E5EBEF" d="M16,0 L348,0 C356.836556,-1.623249e-15 364,7.163444 364,16 L364,52 L364,52 L0,52 L0,16 C-1.082166e-15,7.163444 7.163444,1.623249e-15 16,0 Z"></path>
                    <path id="computer_frame--bottom" fill="#E5EBEF" d="M0,264 L364,264 L364,300 C364,308.836556 356.836556,316 348,316 L16,316 C7.163444,316 1.082166e-15,308.836556 0,300 L0,264 L0,264 Z"></path>
                    <rect id="computer_screen" :data-screen-on="screenOn" fill="#263239" x="0" y="52" width="364" height="212"></rect>
                    <rect id="computer_logo" fill="#BECDD4" x="176" y="283" width="12" height="12"></rect>
                </g>
            </g>
            <foreignObject
                :x="coords.text.x"
                :y="coords.text.y"
                :width="textWidth"
                height="300"
                :style="textStyle"
            >
                <h2 ref="title" class="discover_computer__title">
                    Because I discovered computers!
                </h2>
            </foreignObject>
        </svg>
        <canvas class="confetti_canvas"></canvas>
    </div>
</template>

<script lang="ts">
import {
    Component, Watch,
} from 'vue-property-decorator';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import GraphicMixin from '@/mixins/GraphicMixin';
import easingFunctions from '@/helpers/easingFunctions';
import ConfettiGenerator from 'canvas-confetti';
import minMax from '@/helpers/minMax';

@Component({
    components: {
        AnimationPath,
    },
})
export default class SchoolDoodle extends GraphicMixin {
    constructor() {
        super();
        this.graphicLayout = {
            computer: new Point({ x: 80, y: 28 }),
            text: {
                mobile: new Point({ x: 10, y: 33 }),
                desktop: new Point({ x: 30, y: 28 }),
            },
        };
        this.timeline = [
            { key: 'timeline', start: 0, end: 0.5 },
            { key: 'rainbow', start: 0.55, end: 1 },
            { key: 'textTransform', start: 0.5, end: 0.8 },
        ];
    }

    get textWidth():number {
        const padding = (this.windowWidth / 100) * 20;
        const width = this.windowWidth - padding;
        return minMax({
            number: width,
            min: 0,
            max: 600,
        });
    }
    get smallModeEngaged():boolean {
        return this.windowWidth < 1000;
    }
    get timelineSVGPath():string {
        const computerCoords = this.graphicLayout.computer as Point;
        const path = new Path({
            points: [
                new Point({ x: this.start.x, y: -1 }),
                new Point({ x: this.start.x, y: 0 }),
                new Point({ x: 80, y: 25 }),
                new Point({ x: computerCoords.x, y: computerCoords.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    get screenOn():boolean {
        return (this.animationPercentage > 0.5);
    }
    get confettiActivated():boolean {
        return (this.animationPercentage > 0.58);
    }
    get textStyle():Record<string, string|number> {
        const percentage = easingFunctions.easeOutQuad(this.as.textTransform);
        const translateTopBase = 65;
        const translateTop = translateTopBase + (120 * percentage);
        const translateLeft = 0;

        return {
            opacity: percentage,
            transform: `translate(${translateLeft}px, ${translateTop}px)`,
        };
    }
    get textAnchor():string {
        return this.smallModeEngaged ? 'middle' : 'end';
    }

    @Watch('windowSizeSum')
    private getRainbowPath(index: number):string {
        const relativeLineHeight = 16 / this.windowHeight * 100;
        const relativeLineWidth = 16 / this.windowWidth * 100;
        const computerCoords = this.graphicLayout.computer as Point;
        const start = computerCoords.y + 14;
        const endPointX = this.end.x + (index * relativeLineWidth);
        const endPoint = new Point({ x: endPointX, y: this.end.y - 1 });
        const path = new Path({
            points: [
                new Point({ x: computerCoords.x - 8, y: start }),
                new Point({ x: 50, y: start - 22 + (index * relativeLineHeight) }),
                new Point({ x: 50, y: start - 22 + (index * relativeLineHeight) }),
                new Point({ x: this.end.x - 10 - (index * relativeLineWidth), y: start }),
                new Point({ x: this.end.x - 10 - (index * relativeLineWidth), y: start + 1 }),
                endPoint,
                new Point({ x: endPoint.x, y: endPoint.y + 1 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }

    @Watch('confettiActivated')
    private fireConfettiCanon(val: boolean):void {
        if (!val) return;
        const computerCoords = this.graphicLayout.computer as Point;
        const computerElement = this.$refs.computer as SVGElement;
        const confettiTop = (
            (computerElement.getBoundingClientRect().height / 2)
            / this.windowHeight
        );
        this.shootConfetti({
            spread: 20,
            angle: 150,
            // Bonus points if you know where these colours are from ;)
            colors: ['#5EBD3E', '#FFB900', '#F78200', '#E23838', '#973999', '#009CDF'],
            startVelocity: this.smallModeEngaged ? 30 : 60,
            particleCount: this.smallModeEngaged ? 100 : 200,
            origin: {
                x: computerCoords.x / 100,
                y: ((computerCoords.y) / 100) + confettiTop,
            },
        });
    }

    // Gets replaced in mounted, library has a poor API.
    // eslint-disable-next-line
    private shootConfetti({}) {}

    mounted():void {
        this.shootConfetti = ConfettiGenerator.create(
            document.querySelector('.confetti_canvas') as HTMLCanvasElement,
            { resize: true },
        );
        this.fireConfettiCanon(true);
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .discover_computer
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        z-index: 2
    #computer_screen
        fill: #263239
        transition: all 200ms
    #computer_screen[data-screen-on='true']
        fill: main.$primary
    .confetti_canvas
        position: absolute
        top: 0px
        left: 0px
        width: 100%
        height: 100%
    .discover_computer__title
        @extend %headline3_style
        text-align: left
        font-weight: 800
        font-size: 44px
        text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.5)

    @media (max-width: 1000px)
        #computer
            transform: scale(0.6) translate(-136.5px, -0px)
</style>
