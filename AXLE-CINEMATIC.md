# Axle cinematic edition

Focused redesign of Axle Journey. Other eight modes retain their existing scenes.

City architecture is a generated still, with two separately composited transparent tram sprites moving in opposite directions. Canvas draws a soft contact shadow and compressed wet-ground reflection. This is layered 2D animation, not a full 3D city simulation.

The five selectable story chapters connect problem discovery, definition, Markdown planning, AI-assisted development, and demonstration. Motion stops when paused, offscreen, hidden, or reduced motion is requested. Mobile stacks the 11 people / 4 weeks / 3 teams panels above the city.

Assets: dist/assets/axle-cinematic-city.png and dist/assets/axle-tram.png.
Previous deployment: version 9, source commit 191abbfd52655e5e8671377d1243191365d784c5. Recoverable backup: ../tmp/before-axle-cinematic.zip.

## Image generation prompts

BUILT-IN IMAGEGEN — CITY

Use case: photorealistic-natural
Asset type: architectural photographic background for a luxury futuristic Jeju urban mobility dashboard, landscape 3:2.
Primary request: breathtaking highly realistic architectural visualization of an elegant contemporary Jeju innovation district after rain at blue-grey dusk. Near-frontal elevated architectural camera. A beautiful LOW BROAD CURVING GLASS innovation hall is centered, with a refined sweeping roof, structural glass and warm amber interior light. Sophisticated white modern midrise buildings recede on BOTH sides, plus a few slender elegant towers. Lush realistic trees belong only behind the plaza beside buildings.
Composition: dramatic layered cloud sky upper 30%; architecture middle distance; expansive wet silver-grey paved plaza lower 45%. EXACTLY TWO EMPTY tram trackways cross horizontally left edge to right edge, centered near 70% and 84% image height. Each trackway has a realistic pair of steel rails; the trackways run absolutely straight, near-horizontal and parallel, like a side-on view of a tram route. Rails do not converge toward the architecture. Both tracks must remain visible and fully unobstructed across the frame. Broad clear horizontal space for subsequently compositing a moving tram.
Style: premium professional photorealistic archviz / editorial architectural photography, rich physically realistic materials, finely detailed stone pavers, subtle rain reflections, realistic foliage, refined glass mullions, atmospheric depth, elegant restrained futuristic design. Large scale inhabited-city architecture but nobody visible. Cool blue-grey atmosphere, beautiful warm interior illumination.
No vehicles, NO TRAMS, no cars, no buses, no people, no foreground trees, no shrubs or bollards in foreground, no objects obstructing rails. No UI, text, labels, logos, watermark. No toy look, no lowpoly, no blocky gaming render.

BUILT-IN IMAGEGEN — TRANSPARENT TRAM

Use case: product-mockup
Asset type: genuinely transparent PNG tram sprite for compositing over a photorealistic blue-grey dusk city background.
Primary request: ONE high-end modern white streamlined articulated urban tram with exactly THREE connected carriages. Thin copper-orange horizontal accent stripe, large dark glass windows showing subtle warm amber interior lighting. Premium realistic engineering and materials, crisp high detail, elegant restrained futuristic design.
Composition: exact pure SIDE ELEVATION, nose pointing RIGHT, whole tram fully contained with generous clear margins. Vehicle runs absolutely horizontally; wheels level along a horizontal baseline. Camera perpendicular to vehicle broadside, almost orthographic, with just a very slight elevated viewing angle to see a thin sliver of the roof. NO three-quarter perspective, no foreshortening. Realistic long low urban tram proportions. Wide landscape composition; actual vehicle occupies central horizontal strip.
Lighting: subtle cool blue-grey soft daylight reflections on white body and glass, tiny warm amber cabin highlights, natural realistic material finish, professional high-end automotive catalog photography quality.
Background: TRUE TRANSPARENT ALPHA BACKGROUND, clean isolated cutout. Every pixel outside tram must be transparent, including beneath wheels and above roof. No checkerboard pattern baked into image. No colored or white background.
Constraints: one single tram only, precisely 3 connected articulated carriages, no tracks, no ground, no floor, NO shadows, NO reflections below vehicle, no people, no labels, no UI, no text, no logos, no watermark. No illustration, no toy, no low-poly, no schematic.
