# Live scene direction and asset record

Reference study: MotionSites public videos, observed at multiple playback moments (approximately seven-second demos). The demos are video previews; the source implementations are not available through the public previews. No paid source or video was copied into this Site.

- Axle Journey: independent tram movement along parallel routes; mostly fixed camera, edge-docked metrics, low-left title. Our scene uses original real-time 3D city geometry, three independently travelling trams, eight vehicles, reflected objects, an opening camera move and smooth alternate viewpoints. Architectural visualization, not a photographic replica of the original.
- Ayush / Future 3D Portfolio: stable upper title, wide moving background typography, hovering glass screen and playful objects below. Original 3D machine, mug, orbiting shapes, projection beam, floating HTML window, separately generated sky. Title enters first, supporting copy second.
- Mindora: stable white reading panel, small bottom data cards, continuously rotating pale glass on the right. Original transmission-material glass loops rotate around independent axes. Mobile places the sculpture beneath the reading panel.
- Frontier: stable upper title, botanical edges, project window appears later. Two generated transparent plant sprites grow on staggered timelines and bend independently; falling petals and pollen; project window enters at 1.7 seconds.

Reduced motion and the existing pause button are supported. The render loop stops outside the hero and in a hidden tab. Static background images remain as the WebGL-unavailable fallback. Existing five modes and site content remain.

## Built-in imagegen assets

- `dist/assets/flower-sprite.png`: ONE beautiful coral-orange cosmos/poppy-like flower, one full slender green stem and exactly two elegant green leaves. Open bloom with delicate slightly ruffled petals, golden center, front three-quarter face. Portrait centered whole plant with transparent margins. Photorealistic botanical studio lighting. Actual alpha transparency; no ground, pot, shadow, other blooms, text, watermark or checkerboard.
- `dist/assets/flower-violet.png`: ONE violet-pink dahlia with intricate layered petals, full slender green stem and exactly two leaves. Photorealistic front three-quarter botanical cutout. Portrait, entire plant centered with transparent margins, bloom upper third. Soft studio lighting. Actual alpha; no ground, pot, shadows, other plants, text or watermark.
- `dist/assets/studio-sky.png`: Landscape 3:2 dreamy photorealistic 3D environment. Saturated cobalt blue open sky upper half; lush pastel pink/lavender volumetric clouds at lower corners and bottom. Center and center-lower airy for separate machine overlay. Luminous cinematic lighting and cloud scattering. No objects, machines, buildings, people, text, logos or watermarks.

## Rollback

Previous deployed version 8 source: ac616244ffd9169cb8a28e192cbb45d5fbaf2bb1.
Backup: ../tmp/before-live-scenes.zip. Older rollback records remain in ROLLBACK.md.

Three.js 0.170.0 and official Reflector/BufferGeometryUtils modules are vendored under dist/vendor with MIT license.
