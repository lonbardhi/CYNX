import { Effect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import "./PixelBlast.css";

type PixelVariant = "square" | "circle" | "triangle" | "diamond";

type PixelBlastProps = {
  antialias?: boolean;
  autoPauseOffscreen?: boolean;
  className?: string;
  color?: string;
  edgeFade?: number;
  enableRipples?: boolean;
  liquid?: boolean;
  liquidRadius?: number;
  liquidStrength?: number;
  liquidWobbleSpeed?: number;
  noiseAmount?: number;
  patternDensity?: number;
  patternScale?: number;
  pixelSize?: number;
  pixelSizeJitter?: number;
  rippleIntensityScale?: number;
  rippleSpeed?: number;
  rippleThickness?: number;
  speed?: number;
  style?: CSSProperties;
  transparent?: boolean;
  variant?: PixelVariant;
};

type TouchPoint = {
  age: number;
  force: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type TouchTexture = {
  addTouch: (norm: { x: number; y: number }) => void;
  canvas: HTMLCanvasElement;
  radiusScale: number;
  size: number;
  texture: THREE.Texture;
  update: () => void;
};

type PixelBlastState = {
  camera: THREE.OrthographicCamera;
  clickIx: number;
  composer?: EffectComposer;
  liquidEffect?: Effect;
  material: THREE.ShaderMaterial;
  quad: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  raf: number;
  renderer: THREE.WebGLRenderer;
  resizeObserver?: ResizeObserver;
  scene: THREE.Scene;
  startTime: number;
  timeOffset: number;
  touch?: TouchTexture;
  uniforms: {
    uClickPos: { value: THREE.Vector2[] };
    uClickTimes: { value: Float32Array };
    uColor: { value: THREE.Color };
    uDensity: { value: number };
    uEdgeFade: { value: number };
    uEnableRipples: { value: number };
    uPixelJitter: { value: number };
    uPixelSize: { value: number };
    uResolution: { value: THREE.Vector2 };
    uRippleIntensity: { value: number };
    uRippleSpeed: { value: number };
    uRippleThickness: { value: number };
    uScale: { value: number };
    uShapeType: { value: number };
    uTime: { value: number };
  };
};

type PassWithEffects = {
  effects?: Array<{ uniforms?: Map<string, THREE.Uniform> }>;
};

const createTouchTexture = (): TouchTexture => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context not available");

  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const trail: TouchPoint[] = [];
  let last: { x: number; y: number } | null = null;
  const maxAge = 64;
  let radius = 0.1 * size;
  const speed = 1 / maxAge;

  const clear = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawPoint = (p: TouchPoint) => {
    const pos = { x: p.x * size, y: (1 - p.y) * size };
    const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);
    const easeOutQuad = (t: number) => -t * (t - 2);
    let intensity = 1;

    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));
    else intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;

    intensity *= p.force;

    const color = `${((p.vx + 1) / 2) * 255}, ${((p.vy + 1) / 2) * 255}, ${intensity * 255}`;
    const offset = size * 5;

    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius;
    ctx.shadowColor = `rgba(${color},${0.22 * intensity})`;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const addTouch = (norm: { x: number; y: number }) => {
    let force = 0;
    let vx = 0;
    let vy = 0;

    if (last) {
      const dx = norm.x - last.x;
      const dy = norm.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / (d || 1);
      vy = dy / (d || 1);
      force = Math.min(dd * 10000, 1);
    }

    last = { x: norm.x, y: norm.y };
    trail.push({ age: 0, force, vx, vy, x: norm.x, y: norm.y });
  };

  const update = () => {
    clear();

    for (let i = trail.length - 1; i >= 0; i--) {
      const point = trail[i];
      const f = point.force * speed * (1 - point.age / maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > maxAge) trail.splice(i, 1);
    }

    for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);
    texture.needsUpdate = true;
  };

  return {
    addTouch,
    canvas,
    texture,
    update,
    set radiusScale(v: number) {
      radius = 0.1 * size * v;
    },
    get radiusScale() {
      return radius / (0.1 * size);
    },
    size
  };
};

const createLiquidEffect = (texture: THREE.Texture, opts?: { freq?: number; strength?: number }) => {
  const fragment = `
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);
      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
  `;

  return new Effect("LiquidEffect", fragment, {
    uniforms: new Map<string, THREE.Uniform>([
      ["uTexture", new THREE.Uniform(texture)],
      ["uStrength", new THREE.Uniform(opts?.strength ?? 0.025)],
      ["uTime", new THREE.Uniform(0)],
      ["uFreq", new THREE.Uniform(opts?.freq ?? 4.5)]
    ])
  });
};

const SHAPE_MAP: Record<PixelVariant, number> = {
  circle: 1,
  diamond: 3,
  square: 0,
  triangle: 2
};

const VERTEX_SRC = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;

  vec3 srgbColor = mix(
    color * 12.92,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, color)
  );

  fragColor = vec4(srgbColor, M);
}
`;

const MAX_CLICKS = 10;

const disposeState = (state: PixelBlastState, container?: HTMLDivElement | null) => {
  state.resizeObserver?.disconnect();
  cancelAnimationFrame(state.raf);
  state.quad.geometry.dispose();
  state.material.dispose();
  state.composer?.dispose();
  state.touch?.texture.dispose();
  state.renderer.dispose();
  state.renderer.forceContextLoss();

  if (container && state.renderer.domElement.parentElement === container) {
    container.removeChild(state.renderer.domElement);
  }
};

export default function PixelBlast({
  antialias = true,
  autoPauseOffscreen = true,
  className,
  color = "#B497CF",
  edgeFade = 0.5,
  enableRipples = true,
  liquid = false,
  liquidRadius = 1,
  liquidStrength = 0.1,
  liquidWobbleSpeed = 4.5,
  noiseAmount = 0,
  patternDensity = 1,
  patternScale = 2,
  pixelSize = 3,
  pixelSizeJitter = 0,
  rippleIntensityScale = 1,
  rippleSpeed = 0.3,
  rippleThickness = 0.1,
  speed = 0.5,
  style,
  transparent = true,
  variant = "square"
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibilityRef = useRef({ visible: true });
  const speedRef = useRef(speed);
  const threeRef = useRef<PixelBlastState | null>(null);
  const prevConfigRef = useRef<{ antialias: boolean; liquid: boolean; noiseAmount: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    speedRef.current = speed;

    const cfg = { antialias, liquid, noiseAmount };
    const mustReinit =
      !threeRef.current ||
      !prevConfigRef.current ||
      prevConfigRef.current.antialias !== cfg.antialias ||
      prevConfigRef.current.liquid !== cfg.liquid ||
      prevConfigRef.current.noiseAmount !== cfg.noiseAmount;

    if (mustReinit) {
      if (threeRef.current) {
        disposeState(threeRef.current, container);
        threeRef.current = null;
      }

      const canvas = document.createElement("canvas");
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias,
        canvas,
        powerPreference: "high-performance"
      });

      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      if (transparent) renderer.setClearAlpha(0);
      else renderer.setClearColor(0x000000, 1);

      const uniforms: PixelBlastState["uniforms"] = {
        uClickPos: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)) },
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },
        uColor: { value: new THREE.Color(color) },
        uDensity: { value: patternDensity },
        uEdgeFade: { value: edgeFade },
        uEnableRipples: { value: enableRipples ? 1 : 0 },
        uPixelJitter: { value: pixelSizeJitter },
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
        uResolution: { value: new THREE.Vector2(0, 0) },
        uRippleIntensity: { value: rippleIntensityScale },
        uRippleSpeed: { value: rippleSpeed },
        uRippleThickness: { value: rippleThickness },
        uScale: { value: patternScale },
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
        uTime: { value: 0 }
      };

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const material = new THREE.ShaderMaterial({
        depthTest: false,
        depthWrite: false,
        fragmentShader: FRAGMENT_SRC,
        glslVersion: THREE.GLSL3,
        transparent: true,
        uniforms,
        vertexShader: VERTEX_SRC
      });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(quad);

      const setSize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
        threeRef.current?.composer?.setSize(renderer.domElement.width, renderer.domElement.height);
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
      };

      setSize();

      const ro = new ResizeObserver(setSize);
      ro.observe(container);

      const randomFloat = () => {
        if (window.crypto?.getRandomValues) {
          const u32 = new Uint32Array(1);
          window.crypto.getRandomValues(u32);
          return u32[0] / 0xffffffff;
        }
        return Math.random();
      };

      const timeOffset = randomFloat() * 1000;
      const startTime = performance.now();
      let composer: EffectComposer | undefined;
      let touch: TouchTexture | undefined;
      let liquidEffect: Effect | undefined;

      if (liquid) {
        touch = createTouchTexture();
        touch.radiusScale = liquidRadius;
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        liquidEffect = createLiquidEffect(touch.texture, {
          freq: liquidWobbleSpeed,
          strength: liquidStrength
        });
        const effectPass = new EffectPass(camera, liquidEffect);
        effectPass.renderToScreen = true;
        composer.addPass(effectPass);
      }

      if (noiseAmount > 0) {
        if (!composer) {
          composer = new EffectComposer(renderer);
          composer.addPass(new RenderPass(scene, camera));
        }

        const noiseEffect = new Effect(
          "NoiseEffect",
          "uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} ",
          {
            uniforms: new Map<string, THREE.Uniform>([
              ["uTime", new THREE.Uniform(0)],
              ["uAmount", new THREE.Uniform(noiseAmount)]
            ])
          }
        );
        const noisePass = new EffectPass(camera, noiseEffect);
        noisePass.renderToScreen = true;
        composer.passes.forEach((pass) => {
          pass.renderToScreen = false;
        });
        composer.addPass(noisePass);
      }

      composer?.setSize(renderer.domElement.width, renderer.domElement.height);

      const mapToPixels = (event: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const scaleX = renderer.domElement.width / rect.width;
        const scaleY = renderer.domElement.height / rect.height;
        const fx = (event.clientX - rect.left) * scaleX;
        const fy = (rect.height - (event.clientY - rect.top)) * scaleY;

        return {
          fx,
          fy,
          h: renderer.domElement.height,
          w: renderer.domElement.width
        };
      };

      const onPointerDown = (event: PointerEvent) => {
        const { fx, fy } = mapToPixels(event);
        const ix = threeRef.current?.clickIx ?? 0;
        uniforms.uClickPos.value[ix].set(fx, fy);
        uniforms.uClickTimes.value[ix] = uniforms.uTime.value;
        if (threeRef.current) threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!touch) return;
        const { fx, fy, h, w } = mapToPixels(event);
        touch.addTouch({ x: fx / w, y: fy / h });
      };

      renderer.domElement.addEventListener("pointerdown", onPointerDown, { passive: true });
      renderer.domElement.addEventListener("pointermove", onPointerMove, { passive: true });

      let raf = 0;
      const animate = () => {
        if (autoPauseOffscreen && !visibilityRef.current.visible) {
          raf = requestAnimationFrame(animate);
          if (threeRef.current) threeRef.current.raf = raf;
          return;
        }

        uniforms.uTime.value = timeOffset + ((performance.now() - startTime) / 1000) * speedRef.current;
        if (liquidEffect) liquidEffect.uniforms.get("uTime")!.value = uniforms.uTime.value;

        if (composer) {
          touch?.update();
          composer.passes.forEach((pass) => {
            (pass as PassWithEffects).effects?.forEach((effect) => {
              const uniform = effect.uniforms?.get("uTime");
              if (uniform) uniform.value = uniforms.uTime.value;
            });
          });
          composer.render();
        } else {
          renderer.render(scene, camera);
        }

        raf = requestAnimationFrame(animate);
        if (threeRef.current) threeRef.current.raf = raf;
      };

      raf = requestAnimationFrame(animate);

      threeRef.current = {
        camera,
        clickIx: 0,
        composer,
        liquidEffect,
        material,
        quad,
        raf,
        renderer,
        resizeObserver: ro,
        scene,
        startTime,
        timeOffset,
        touch,
        uniforms
      };

      renderer.domElement.addEventListener("webglcontextlost", (event: Event) => event.preventDefault());
    } else {
      const state = threeRef.current;
      if (!state) return undefined;
      state.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;
      state.uniforms.uPixelSize.value = pixelSize * state.renderer.getPixelRatio();
      state.uniforms.uColor.value.set(color);
      state.uniforms.uScale.value = patternScale;
      state.uniforms.uDensity.value = patternDensity;
      state.uniforms.uPixelJitter.value = pixelSizeJitter;
      state.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;
      state.uniforms.uRippleIntensity.value = rippleIntensityScale;
      state.uniforms.uRippleThickness.value = rippleThickness;
      state.uniforms.uRippleSpeed.value = rippleSpeed;
      state.uniforms.uEdgeFade.value = edgeFade;

      if (transparent) state.renderer.setClearAlpha(0);
      else state.renderer.setClearColor(0x000000, 1);

      const strengthUniform = state.liquidEffect?.uniforms.get("uStrength");
      if (strengthUniform) strengthUniform.value = liquidStrength;

      const freqUniform = state.liquidEffect?.uniforms.get("uFreq");
      if (freqUniform) freqUniform.value = liquidWobbleSpeed;

      if (state.touch) state.touch.radiusScale = liquidRadius;
    }

    prevConfigRef.current = cfg;

    return () => {
      if (!threeRef.current) return;
      disposeState(threeRef.current, container);
      threeRef.current = null;
    };
  }, [
    antialias,
    autoPauseOffscreen,
    color,
    edgeFade,
    enableRipples,
    liquid,
    liquidRadius,
    liquidStrength,
    liquidWobbleSpeed,
    noiseAmount,
    patternDensity,
    patternScale,
    pixelSize,
    pixelSizeJitter,
    rippleIntensityScale,
    rippleSpeed,
    rippleThickness,
    speed,
    transparent,
    variant
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      visibilityRef.current.visible = entry.isIntersecting;
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label="PixelBlast interactive background"
      className={`pixel-blast-container ${className ?? ""}`}
      ref={containerRef}
      style={style}
    />
  );
}
