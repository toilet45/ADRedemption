"use strict";

const BezTestData = {
  P0: new Vector(300, 300),
  scale: 100,
  rate: Math.log(2) / (2 * Math.PI),
  t0: 0,
  t1: Math.PI / 2,
  offset: 10,
};

function cubicBezierArrayToPath(a, initialCommand = "M") {
  const prefix = `${initialCommand} ${a[0].p0.x} ${a[0].p0.y}\n`;
  const parts = a.map(b => `C ${b.p1.x} ${b.p1.y} ${b.p2.x} ${b.p2.y} ${b.p3.x} ${b.p3.y}\n`);
  return prefix + parts.join("");
}

function svgRingPath(rMajor, rMinor, gapDeg = 60, gapCenterDeg = 0) {
  const edge0 = Math.PI / 180 * (gapCenterDeg + gapDeg / 2);
  const c0 = Math.cos(edge0), s0 = Math.sin(edge0);
  const edge1 = Math.PI / 180 * (gapCenterDeg - gapDeg / 2);
  const c1 = Math.cos(edge1), s1 = Math.sin(edge1);
  return `M ${c0 * rMajor - 1e-3 * s0} ${s0 * rMajor + 1e-3 * c0}
A ${rMajor} ${rMajor} 0 1 0 ${c1 * rMajor + 1e-3 * s1} ${s1 * rMajor - 1e-3 * c1}
l 8 ${rMajor - rMinor}
a ${rMinor} ${rMinor} 0 1 1 -4 0
z`;
}

Vue.component("celestial-navigation", {
  components: {
    "navigation-node": {
      components: {
        "progress-connector": {
          props: {
            complete: Number,
            completeWidth: {
              type: Number,
              default: 8
            },
            incompleteWidth: {
              type: Number,
              default: 6,
            },
            fill: {
              type: String,
              default: "#4EF",
            },
            filterName: String,
            path: Curve,
            pathStart: Number,
            pathEnd: Number,
            pathPadStart: {
              type: Number,
              default: 0,
            },
            pathPadEnd: {
              type: Number,
              default: 0,
            },
          },
          computed: {
            unpaddedSpan() {
              return (this.pathEnd - this.pathPadEnd) - (this.pathStart + this.pathPadStart);
            },
            incompleteStart() {
              return this.complete >= 1
                ? this.pathEnd
                : this.pathStart + this.pathPadStart + this.unpaddedSpan * this.complete;
            },
            incompleteStartShape() {
              return this.shapeAt(this.incompleteStart);
            },
            completeStartShape() {
              return this.shapeAt(this.pathStart);
            },
            incompleteTransform() {
              const shape = this.incompleteStartShape;
              return `${shape.position.asTranslate()} ${shape.direction.asRotate()}`;
            },
            pathEndShape() {
              return this.shapeAt(this.pathEnd);
            },
            // In order to support gradients that fill along a completed path,
            // we render in a coordinate system that's scaled to be 0..1 from start to end
            totalPathOffsetPx() {
              return this.pathEndShape.position.minus(this.completeStartShape.position);
            },
            completeTransform() {
              const shape = this.completeStartShape;
              const scale = this.totalPathOffsetPx.length;
              return `${shape.position.asTranslate()} ${shape.direction.asRotate()} scale(${scale})`;
            },
            incompleteFadeEnd() {
              const shape = this.incompleteStartShape;
              const fadeLength = 12 / shape.derivative.length;
              return this.pathEnd > this.pathStart
                ? Math.min(this.incompleteStart + fadeLength, this.pathEnd)
                : Math.max(this.incompleteStart - fadeLength, this.pathEnd);
            },
            incompleteFadePath() {
              return this.generateIncompletePath(this.incompleteStart, this.incompleteFadeEnd);
            },
            incompleteSolidPath() {
              return this.generateIncompletePath(
                this.incompleteFadeEnd - 1e-3 * (this.pathEnd - this.incompleteFadeEnd), this.pathEnd);
            },
            completePath() {
              const startShape = this.completeStartShape;
              const scale = 1 / this.totalPathOffsetPx.length;
              const tform = AffineTransform
                .translation(startShape.position.negative)
                .rotated(-startShape.direction.angle)
                .scaled(scale);
              const tStart = this.pathStart, tEnd = this.incompleteStart;
              const w = this.completeWidth;
              const insetPath = this.getOffsetPath(-w / 2, tStart, tEnd).transformedBy(tform);
              const outsetPath = this.getOffsetPath(w / 2, tEnd, tStart).transformedBy(tform);
              const endVector = this.incompleteStartShape.direction.transformedBy(tform.withoutTranslation);
              const inEnd = insetPath.path[insetPath.path.length - 1];
              const outStart = outsetPath.path[0];
              const capCP0 = inEnd.position(1).plus(endVector.times(w / 2));
              const capCP1 = outStart.position(0).plus(endVector.times(w / 2));
              const cap = `C ${capCP0.x} ${capCP0.y} ${capCP1.x} ${capCP1.y} ${outStart.p0.x} ${outStart.p0.y}\n`;
              return insetPath.toSVG("M") + cap + outsetPath.toSVG("L");
            },
            hasIncompleteSolidPath() {
              return this.incompleteFadeEnd !== this.pathEnd;
            },
            filter() {
              return `url(#${this.filterName})`;
            },
          },
          methods: {
            generateIncompletePath(tStart, tEnd) {
              const inset = this.getOffsetPath(-this.incompleteWidth / 2, tStart, tEnd);
              const outset = this.getOffsetPath(this.incompleteWidth / 2, tEnd, tStart);
              const s0 = this.incompleteStartShape;
              const tform = AffineTransform.translation(s0.position.negative).rotated(-s0.direction.angle);
              return inset.transformedBy(tform).toSVG("M") + outset.transformedBy(tform).toSVG("L");
            },
            getOffsetPath(offset, tStart, tEnd) {
              if (this.path instanceof LinearPath) {
                return new PiecewisePath([this.path.createOffsetLine(offset, tStart, tEnd)]);
              }
              const offsetPath = new OffsetCurve(this.path, offset);
              return PiecewisePath.cubicBezierFitToCurveSection(offsetPath, tStart, tEnd);
            },
            shapeAt(t) {
              const shape = this.path.shapeAt(t);
              if (this.pathStart > this.pathEnd) {
                shape.direction = shape.direction.negative;
                shape.derivative = shape.derivative.negative;
              }
              return shape;
            }
          },
          template: `
            <g>
              <g :transform="incompleteTransform">
                <path :d="incompleteFadePath"
                      fill="url(#incompleteFade)" />
                <path v-if="hasIncompleteSolidPath"
                      :d="incompleteSolidPath"
                      fill="#888" />
              </g>
              <g :filter="filter">
                <path :transform="completeTransform"
                    :fill="fill" stroke="none" :d="completePath" />
              </g>
            </g>
          `
        },
        "node-ring": {
          props: {
            complete: Number,
            position: Vector,
            rMajor: Number,
            rMinor: {
              type: Number,
              default: 0,
            },
            legend: Object,
            symbol: {
              type: String,
              default: "",
            },
            symbolScale: {
              type: Number,
              default: 1.4
            },
            completeClass: String,
            incompleteClass: String,
            fill: String,
          },
          computed: {
            LEGEND_FONT_SIZE: () => 16,
            baseTransform() {
              return this.position.asTranslate();
            },
            pathData() {
              return svgRingPath(this.rMajor, this.rMinor);
            },
            hasLegend() {
              return Boolean(this.legend);
            },
            legendArrowPoints() {
              const dir = Vector.unitFromDegrees(this.legend.angle);
              const pts = [dir.times(this.rMajor + 2)];
              pts.push(pts[0].plus(dir.times(this.legend.diagonal)));
              pts.push(pts[1].plus(Vector.horiz(this.legend.horizontal * Math.sign(dir.x))));
              return pts;
            },
            legendArrowPointString() {
              return this.legendArrowPoints.join(" ");
            },
            legendTransform() {
              const pts = this.legendArrowPoints;
              const xDir = Math.sign(pts[2].x - pts[0].x);
              return pts[2].plus(Vector.horiz(xDir * 4)).asTranslate();
            },
            ringClass() {
              return this.complete >= 1 ? this.completeClass : this.incompleteClass;
            },
            legendTextAnchor() {
              const angle = (this.legend.angle + 360) % 360;
              return angle > 90 && angle < 270 ? "end" : "start";
            },
            legendLines() {
              const data = typeof (this.legend.text) === "function"
                ? this.legend.text(this.complete) : this.legend.text;
              return typeof (data) === "string" ? [data] : data;
            },
            symbolFontSize() {
              return this.rMajor * this.symbolScale;
            },
            ringFilter() {
              return this.complete >= 1 ? "url(#completeGlow)" : "";
            },
          },
          methods: {
            legendLineY(idx) {
              const spacing = Math.round(this.LEGEND_FONT_SIZE * 1.25 / 2);
              const num = this.legendLines.length;
              return (2 * idx - (num - 1)) * spacing;
            }
          },
          template: `
          <g :transform="baseTransform">
            <path :class="ringClass"
                  :d="pathData"
                  stroke="black" :fill="fill" :filter="ringFilter" />
            <text v-if="symbol"
                  class="o-celestial-nav__symbol o-no-mouse"
                  fill="#000"
                  dominant-baseline="middle"
                  :font-size="symbolFontSize">{{symbol}}</text>
            <g v-if="hasLegend" class="tooltiptext">
              <polyline :points="legendArrowPointString"
                        class="o-celestial-nav__legend-arrow"/>
              <g :transform="legendTransform">
                <text class="o-celestial-nav__legend-text"
                      :text-anchor="legendTextAnchor"
                      dominant-baseline="middle" :font-size="LEGEND_FONT_SIZE">
                  <tspan v-for="(line, idx) in legendLines" :key="idx"
                         x="0" :y="legendLineY(idx)">{{line}}</tspan>
                </text>
              </g>
            </g>
          </g>
          `
        },
      },
      props: {
        nodeId: String,
      },
      data: () => ({
        complete: 0,
      }),
      computed: {
        config() {
          return GameDatabase.celestials.navigation[this.nodeId];
        },
        hasConnector() {
          return this.config.connector !== undefined;
        },
        testPath() {
          return new LogarithmicSpiral(new Vector(300, 300), 100, 0.25);
        },
        forceHoverClass() {
          return this.config.node.alwaysShowLegend ? "o-celestial-nav__force-hover" : "";
        },
        ringBackgroundTransform() {
          return this.config.node.position.asTranslate();
        },
        ringBackgroundPath() {
          const rMinor = this.config.node.rMinor || 0;
          return svgRingPath(this.config.node.rMajor, Math.max(0, rMinor));
        }
      },
      methods: {
        update() {
          this.complete = this.config.complete();
        }
      },
      template: `
      <g class="o-celestial-nav__hoverable" :class="forceHoverClass">
        <path :transform="ringBackgroundTransform" :d="ringBackgroundPath" fill="black" stroke="none" filter="url(#completeGlow)" />
        <progress-connector v-if="hasConnector"
          :complete="complete"
          v-bind="config.connector"
          filterName="completeGlow" />
        <!-- node should be drawn on top of connector -->
        <node-ring :complete="complete" v-bind="config.node" />
      </g>
      `
    },
  },
  data: () => ({
    visibleNodes: [],
    bezTest: BezTestData,
  }),
  computed: {
    derp() {
      return new Vector(100, 100);
    },
    db: () => GameDatabase.celestials.navigation,
  },
  mounted() {
    this.panZoom = svgPanZoom(this.$el, {
      controlIconsEnabled: true,
      dblClickZoomEnabled: false,
      center: false,
      fit: false,
    });
  },
  beforeDestroy() {
    if (this.panZoom) {
      this.panZoom.destroy();
      delete this.panZoom;
    }
  },
  methods: {
    update() {
      const visibleNodes = [];
      for (const key of Object.keys(this.db)) {
        if (this.db[key].visible()) visibleNodes.push(key);
      }
      visibleNodes.sort((a, b) => (this.db[a].drawOrder || 0) - (this.db[b].drawOrder || 0));
      this.visibleNodes = visibleNodes;
    },
    vec(x, y) {
      return new Vector(x, y);
    }
  },
  template: `
<svg height="600" width="960">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
    <linearGradient id="incompleteFade" x1="0" x2="8" gradientUnits="userSpaceOnUse">
      <stop offset="0" style="stop-color: #888; stop-opacity: 0"/>
      <stop offset="8" style="stop-color: #888; stop-opacity: 1.0"/>
    </linearGradient>
    <linearGradient id="fadeGrad" y2="0" x2="1">
      <stop offset="0.5" stop-color="white" stop-opacity="0"/>
      <stop offset="1" stop-color="white" stop-opacity=".5"/>
    </linearGradient>
    <linearGradient id="gradTeresaEffarig" y2="0" x2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#4EF"/>
      <stop offset="1" stop-color="#5151ec"/>
    </linearGradient>
    <linearGradient id="gradEffarigEnslaved" y2="0" x2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7131ec"/>
      <stop offset="1" stop-color="#ffa337"/>
    </linearGradient>
    <mask id="fade" maskContentUnits="objectBoundingBox">
      <rect width="1" height="1" fill="url(#fadeGrad)"/>
    </mask>
    <filter id="completeGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feFlood result="flood" flood-color="#7d26cd" flood-opacity="1" />
      <feComposite in="SourceGraphic" result="mask" in2="SourceGraphic" operator="in" />
      <feMorphology in="SourceGraphic" result="dilated" operator="dilate" radius="1" />
      <feGaussianBlur in="SourceGraphic" result="blurred" stdDeviation="2" />
      <feMerge>
        <feMergeNode in="blurred" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <navigation-node v-for="nodeId in visibleNodes" :key="nodeId" :nodeId="nodeId" />
</svg>
  `
});