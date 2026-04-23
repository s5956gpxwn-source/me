/**
 * Aurora WebGL shader — animated multi-color gradient that flows like an aurora.
 * Cheap 2D fragment shader; no three.js. Runs on a single fullscreen triangle.
 *
 * Usage:
 *   mountAuroraShader(canvas, { palette: [...] });
 *
 * The returned function stops the loop and releases resources.
 */

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ palette?: string[], intensity?: number, speed?: number }} [opts]
 */
export function mountAuroraShader(canvas, opts = {}) {
  const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
  if (!gl) return () => {};

  const palette = opts.palette ?? ["#a855f7", "#3b82f6", "#ec4899", "#10b981"];
  const intensity = opts.intensity ?? 1;
  const speed = opts.speed ?? 0.3;

  const vert = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
  `;

  const frag = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_intensity;
    uniform vec3 u_c1;
    uniform vec3 u_c2;
    uniform vec3 u_c3;
    uniform vec3 u_c4;

    // Smooth noise
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p); vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0,0.0));
      float c = hash(i + vec2(0.0,1.0));
      float d = hash(i + vec2(1.0,1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
    }
    float fbm(vec2 p){
      float v = 0.0; float a = 0.5;
      for (int i=0;i<5;i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
      return v;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = uv * 3.0 - 1.5;
      p.x *= u_resolution.x / u_resolution.y;

      float t = u_time * 0.12;

      // Flowing field
      vec2 q = vec2(fbm(p + t), fbm(p - t*1.3 + 5.2));
      vec2 r = vec2(fbm(p + q*1.5 + t*0.8 + 1.7), fbm(p + q*1.5 + t*1.1 + 8.3));
      float n = fbm(p + r*1.8);

      // Bands
      float band = sin(p.y*2.0 + r.x*3.5 + t*2.0) * 0.5 + 0.5;
      float aurora = pow(n * band, 1.4);

      vec3 col = mix(u_c1, u_c2, smoothstep(0.0, 0.55, n));
      col = mix(col, u_c3, smoothstep(0.4, 0.85, band));
      col = mix(col, u_c4, smoothstep(0.7, 1.0, aurora));

      // Darken edges + fade top/bottom for cleaner hero
      float vignette = smoothstep(0.0, 0.55, 1.0 - length(uv - 0.5));
      col *= vignette * u_intensity;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  const vs = compile(gl.VERTEX_SHADER, vert);
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return () => {};

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  // Fullscreen triangle
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );
  const posLoc = gl.getAttribLocation(prog, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "u_resolution");
  const uTime = gl.getUniformLocation(prog, "u_time");
  const uInt = gl.getUniformLocation(prog, "u_intensity");
  const uC = [
    gl.getUniformLocation(prog, "u_c1"),
    gl.getUniformLocation(prog, "u_c2"),
    gl.getUniformLocation(prog, "u_c3"),
    gl.getUniformLocation(prog, "u_c4"),
  ];
  const colors = palette.map(hexToRgb);

  gl.useProgram(prog);
  colors.slice(0, 4).forEach((c, i) => gl.uniform3f(uC[i], c[0], c[1], c[2]));
  gl.uniform1f(uInt, intensity);

  let running = true;
  let raf = 0;
  const start = performance.now();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { clientWidth: w, clientHeight: h } = canvas;
    const targetW = Math.floor(w * dpr);
    const targetH = Math.floor(h * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }

  function frame() {
    if (!running) return;
    resize();
    gl.uniform1f(uTime, ((performance.now() - start) / 1000) * speed);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteBuffer(buf);
  };
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n =
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : h;
  const r = parseInt(n.slice(0, 2), 16) / 255;
  const g = parseInt(n.slice(2, 4), 16) / 255;
  const b = parseInt(n.slice(4, 6), 16) / 255;
  return [r, g, b];
}
