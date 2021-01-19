import { Vue, Component, Prop } from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';
import Point from '@/classes/Point';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import drawPercentageListGenerator from '@/helpers/drawPercentageListGenerator';
import GraphicLocation from '@/classes/GraphicLocation';

@Component({
    components: {
        AnimationPath,
    },
    mixins: [vueWindowSizeMixin],
})
export default class GraphicMixin extends Vue {
    @Prop({ default: 0 }) readonly animationPercentage: number
    @Prop({ required: true }) readonly start: Point
    @Prop({ required: true }) readonly end: Point

    isMounted = false;
    graphicLayout = {};
    timeline: { key: string; start: number; end: number }[];

    get coords():Record<string, GraphicLocation> {
        const graphicsLocations:Record<string, GraphicLocation> = {};
        Object.entries(this.graphicLayout).forEach((entry) => {
            const key = entry[0];
            const value = entry[1] as Point|Record<'desktop'|'mobile', Point>;
            if (value.constructor.name === 'Object') {
                const pointList = value as Record<'desktop'|'mobile', Point>;
                let point = pointList.desktop;
                if (this.windowWidth < 769) point = pointList.mobile;
                graphicsLocations[key] = this.getGraphicsLocation(point);
            } else {
                const percentagePoint = value as Point;
                graphicsLocations[key] = this.getGraphicsLocation(percentagePoint);
            }
        });
        return graphicsLocations;
    }
    // Animation Steps
    get as(): { [key: string]: number; } {
        const { animationPercentage, timeline } = this;
        return drawPercentageListGenerator({
            parentPercentage: animationPercentage,
            timeline,
        });
    }

    public createPixelPoint({ x, y }: Point): Point {
        return this.getPixelFromPercentagePoint(new Point({ x, y }));
    }
    public getPixelFromPercentagePoint(point: Point): Point {
        return new Point({
            x: Math.round((this.windowWidth / 100) * point.x),
            y: Math.round((this.windowHeight / 100) * point.y),
        });
    }
    public getPercentageFromPixelPoint({ x, y }: Point): Point {
        return new Point({
            // +8 because the line is always 16px wide.
            x: ((Math.round(x) + 8) / this.windowWidth) * 100,
            y: ((Math.round(y)) / this.windowWidth) * 100,
        });
    }
    private getGraphicsLocation(percentagePoint: Point): GraphicLocation {
        const pixelPoint = this.createPixelPoint(percentagePoint);
        const transform = `translate(${pixelPoint.x}, ${pixelPoint.y})`;
        return new GraphicLocation({
            x: pixelPoint.x,
            y: pixelPoint.y,
            transform,
        });
    }

    mounted():void {
        this.isMounted = true;
    }
}
