# Hanging ID Card (Lanyard) Implementation Analysis

## Overview

The "hanging ID card" — a draggable, physics-simulated badge dangling from a lanyard/rope — is **not a pure DOM/CSS technique**. It's a **full 3D WebGL implementation** using React Three Fiber with a real-time physics engine. The canonical open-source implementation lives in the **[react-bits](https://github.com/DavidHDev/react-bits)** library, and the pattern was popularized by **[Vercel's Ship 2024](https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber)** event badge.

> **Note on ifalf.com**: The current live site at ifalf.com does **not** expose a hanging ID card on its homepage or about page via static HTML scraping. The site's metadata references "GSAP" and "Motion" as animation libraries. The developer's GitHub repo `ifal-card` is based on the **Nikola Tesla Portfolio** Astro template and does not contain a lanyard component. The implementation below documents the canonical hanging ID card pattern that matches the described behavior.

---

## Tech Stack

| Layer | Library | Version (react-bits) | Purpose |
|-------|---------|---------------------|---------|
| 3D Renderer | `three` | ^0.167.1 | Core WebGL 3D engine |
| React Binding | `@react-three/fiber` | ^9.3.0 | Declarative Three.js for React |
| Helpers | `@react-three/drei` | ^10.7.4 | GLTF loading, textures, environment, `RenderTexture` |
| **Physics Engine** | `@react-three/rapier` | ^2.1.0 | **Rapier rigid-body physics** (ropes, joints, collisions) |
| **Lanyard Line** | `meshline` | ^3.3.1 | Shader-based thick line rendering |
| 3D Model | Blender → `.glb` | — | Card, clip, and clamp geometry |
| Lanyard Texture | `.png` | — | Repeating pattern for the lanyard strap |

### Physics Engine: `@react-three/rapier`

This is a **real physics simulation**, not spring animations or CSS transforms. It uses the [Rapier](https://rapier.rs/) rigid-body physics engine compiled to WASM. Key concepts:

- **RigidBody types**: `fixed` (immovable anchor), `dynamic` (gravity-affected), `kinematicPosition` (user-controlled)
- **Joints**: `useRopeJoint` (distance constraint with rope-like behavior), `useSphericalJoint` (allows rotation)
- **Colliders**: `BallCollider` (invisible sphere for joint segments), `CuboidCollider` (box for card hit testing)

---

## Architecture

### High-Level Component Tree

```
Lanyard (wrapper)
└── <Canvas> (React Three Fiber)
    ├── <ambientLight>
    ├── <Physics gravity=[0, -40, 0]>
    │   └── Band
    │       ├── RigidBody (fixed) — anchor point at top
    │       ├── RigidBody (j1) — joint 1, BallCollider
    │       ├── RigidBody (j2) — joint 2, BallCollider  
    │       ├── RigidBody (j3) — joint 3, BallCollider
    │       ├── RigidBody (card) — CuboidCollider + 3D mesh group
    │       │   ├── mesh (card body — meshPhysicalMaterial)
    │       │   ├── mesh (clip — metal material)
    │       │   └── mesh (clamp — metal material)
    │       └── mesh (band/lanyard line)
    │           ├── meshLineGeometry
    │           └── meshLineMaterial (textured)
    └── <Environment>
        └── <Lightformer> × 4
```

### Physics Joint Chain

```
FIXED (anchor) ──rope──> J1 ──rope──> J2 ──rope──> J3 ──spherical──> CARD
  (type: fixed)     (dynamic)  (dynamic)  (dynamic)      (dynamic/kinematic)
```

- **3 rope joints** (`useRopeJoint`) connect fixed→j1→j2→j3 with length=1 each
- **1 spherical joint** (`useSphericalJoint`) connects j3→card, allowing card rotation
- When dragged, card switches from `dynamic` to `kinematicPosition` (user controls position)

---

## DOM Structure

### CSS Wrapper (11 lines total)

```css
/* Source: react-bits/src/content/Components/Lanyard/Lanyard.css */
.lanyard-wrapper {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transform-origin: center;
}
```

**Tailwind equivalent** (from TS-TW variant):
```html
<div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
```

### DOM Output

The component renders a **single `<div>` wrapper** containing a **`<canvas>` element** managed by React Three Fiber. All the ID card, lanyard, and physics exist **inside the WebGL canvas** — there are no DOM elements for the card, rope, or joints.

```html
<div class="lanyard-wrapper">
  <canvas style="width: 100%; height: 100%; touch-action: none;">
    <!-- WebGL context — everything renders here -->
  </canvas>
</div>
```

**Key takeaway**: The card is **NOT** DOM-based. It's a 3D mesh rendered in WebGL. No CSS transforms, no absolute positioning, no DOM event delegation for the card itself.

---

## How the Drag Interaction Works

### Step-by-step:

1. **Pointer Down** on card mesh:
   - `setPointerCapture(e.pointerId)` — captures all pointer events to this element
   - Calculates offset: `e.point - card.current.translation()` — stores the 3D offset between click point and card center
   - Sets `dragged = offset Vector3` (truthy = dragging)
   - Card RigidBody type switches to `kinematicPosition`

2. **Each Frame** (`useFrame`):
   - Unprojects pointer position from screen space to 3D world space using `state.pointer` + `unproject(camera)`
   - Calculates direction from camera to the unprojected point
   - Extends the vector to camera distance
   - Applies `setNextKinematicTranslation` to card position (minus offset)
   - Calls `wakeUp()` on all rigid bodies to prevent sleeping during drag

3. **Pointer Up**:
   - `releasePointerCapture(e.pointerId)`
   - Sets `dragged = false`
   - Card RigidBody type switches back to `dynamic` (physics takes over)

### The Tilt-Back Trick

```jsx
ang.copy(card.current.angvel());
rot.copy(card.current.rotation());
card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
```

This counter-rotates the card's Y-axis angular velocity by 25% of its current Y rotation, ensuring the card always tilts **back toward the viewer** rather than spinning away. It's physically inaccurate but creates a better UX.

---

## The Lanyard/Rope Visual Effect

### Not SVG, Not Canvas 2D — It's a 3D Mesh Line

The lanyard is rendered using **`meshline`**, a shader-based thick line implementation for Three.js. It's a **3D tube-like geometry** that follows a Catmull-Rom spline curve.

### Curve Calculation (every frame):

```jsx
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(), // j3 position
  new THREE.Vector3(), // j2 position (lerped)
  new THREE.Vector3(), // j1 position (lerped)
  new THREE.Vector3(), // fixed position
]);

// In useFrame:
curve.points[0].copy(j3.current.translation());    // bottom of rope (at card)
curve.points[1].copy(j2.current.lerped);            // joint 2 (smoothed)
curve.points[2].copy(j1.current.lerped);            // joint 1 (smoothed)
curve.points[3].copy(fixed.current.translation());  // top (anchor)
band.current.geometry.setPoints(curve.getPoints(32)); // 32 interpolated points
```

### Smoothing (Lerp)

The middle joints (j1, j2) are **lerped** (linearly interpolated) to prevent jittery movement:

```jsx
const clampedDistance = Math.max(0.1, Math.min(1, 
  ref.current.lerped.distanceTo(ref.current.translation())
));
ref.current.lerped.lerp(
  ref.current.translation(),
  delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
);
```

This creates a speed-dependent smoothing: faster movement = faster tracking, slower = more lag (elastic feel).

### Lanyard Material

```jsx
<meshLineMaterial
  color="white"
  depthTest={false}           // always renders on top
  resolution={[1000, 1000]}   // texture resolution
  useMap                       // enables texture
  map={lanyardTexture}         // repeating pattern PNG
  repeat={[-4, 1]}            // horizontal repeat ×4, reversed
  lineWidth={1}               // base width
/>
```

The lanyard texture is a **repeating PNG pattern** applied with `THREE.RepeatWrapping`, creating the woven fabric look of a real lanyard strap.

---

## 3D Card Model

The card is a **Blender-exported `.glb` file** containing three meshes:

| Mesh | Material | Purpose |
|------|----------|---------|
| `card` | `meshPhysicalMaterial` (map + clearcoat + metalness) | The card body with printed design |
| `clip` | Metal material (roughness 0.3) | The metal clip that attaches to lanyard |
| `clamp` | Metal material | The transparent badge holder |

### Card Physics Properties

```jsx
const segmentProps = {
  type: 'dynamic',
  canSleep: true,         // allows physics bodies to sleep when still
  colliders: false,       // no auto-generated colliders (we define them manually)
  angularDamping: 4,      // heavy angular damping = less spinning
  linearDamping: 4,       // heavy linear damping = less sliding
};
```

The `angularDamping: 4` and `linearDamping: 4` are very high values that create a **heavy, sluggish feel** — like a real ID card on a lanyard.

### Card Collider

```jsx
<CuboidCollider args={[0.8, 1.125, 0.01]} />
```

A flat box collider (0.01 depth) matching the card dimensions, used for pointer hit testing.

---

## Rendering Technique: Canvas, SVG, or Pure DOM?

**Answer: WebGL Canvas (via React Three Fiber + Three.js)**

- **Not DOM**: No HTML elements for the card, rope, or joints
- **Not SVG**: No vector graphics involved
- **Not Canvas 2D**: Uses WebGL, not the 2D canvas context
- **Is WebGL**: Full 3D rendering pipeline with physics

The only DOM element is the wrapper `<div>` and the `<canvas>` managed by R3F.

---

## Props / Configuration

```typescript
interface LanyardProps {
  position?: [number, number, number];  // Camera position, default [0, 0, 30]
  gravity?: [number, number, number];   // Physics gravity, default [0, -40, 0]
  fov?: number;                         // Camera FOV, default 20
  transparent?: boolean;                // Transparent canvas background, default true
}
```

| Prop | Effect |
|------|--------|
| `position` | Moves camera further/closer (zoom) |
| `gravity` | `[0, 0, 0]` = zero-G, `[0, -40, 0]` = normal hanging |
| `fov` | Wider/narrower field of view |
| `transparent` | Whether canvas background is transparent |

---

## Performance Optimizations

1. **Mobile detection**: `timeStep` drops from 1/60 to 1/30 on mobile, curve resolution from 32 to 16 points
2. **DPR capping**: Mobile gets 1.5x, desktop gets 2x pixel ratio
3. **Sleep enabled**: `canSleep: true` lets physics bodies sleep when still
4. **High damping**: `angularDamping: 4, linearDamping: 4` reduces computation from oscillation
5. **Clearcoat disabled on mobile**: `clearcoat={isMobile ? 0 : 1}` saves GPU

---

## Dependencies to Install

```bash
npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline
```

Or for a portfolio site using Next.js:
```bash
npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline
npm install -D @types/three
```

---

## Source References

### react-bits Lanyard Component

**Main JSX implementation:**
[DavidHDev/react-bits/src/content/Components/Lanyard/Lanyard.jsx](https://github.com/DavidHDev/react-bits/blob/b31b23d22c6e3dd68c8208b13dfa66ba8fa35f17/src/content/Components/Lanyard/Lanyard.jsx) — 195 lines

**TypeScript + Tailwind variant:**
[DavidHDev/react-bits/src/ts-tailwind/Components/Lanyard/Lanyard.tsx](https://github.com/DavidHDev/react-bits/blob/b31b23d22c6e3dd68c8208b13dfa66ba8fa35f17/src/ts-tailwind/Components/Lanyard/Lanyard.tsx) — 244 lines

**CSS styles:**
[DavidHDev/react-bits/src/content/Components/Lanyard/Lanyard.css](https://github.com/DavidHDev/react-bits/blob/b31b23d22c6e3dd68c8208b13dfa66ba8fa35f17/src/content/Components/Lanyard/Lanyard.css) — 11 lines

**Demo/usage:**
[DavidHDev/react-bits/src/demo/Components/LanyardDemo.jsx](https://github.com/DavidHDev/react-bits/blob/b31b23d22c6e3dd68c8208b13dfa66ba8fa35f17/src/demo/Components/LanyardDemo.jsx)

**Live demo:** https://www.reactbits.dev/components/lanyard

### Vercel Ship 2024 Blog Post

**Full implementation walkthrough:**
https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber

### Physics Engine

**@react-three/rapier** (Rapier WASM physics):
https://github.com/pmndrs/react-three-rapier

**Meshline** (thick line rendering):
https://github.com/pmndrs/meshline

---

## Summary

| Question | Answer |
|----------|--------|
| DOM structure? | Single `<div>` wrapper + `<canvas>` — everything is WebGL |
| CSS positioning? | Wrapper uses flexbox centering; card is 3D, no CSS positioning |
| Physics library? | **@react-three/rapier** (Rapier WASM rigid-body engine) |
| How does drag work? | Pointer events → 3D unprojection → kinematic body positioning |
| Lanyard visual? | `meshline` thick line following Catmull-Rom spline with textured material |
| Canvas/SVG/DOM? | **WebGL** via React Three Fiber + Three.js |
| Card model? | Blender-exported `.glb` with `meshPhysicalMaterial` |
| Total code? | ~80 lines of declarative JSX + ~30 lines of frame logic |
