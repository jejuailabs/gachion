# Mindora detail and Axle ambient motion

The Mindora composition uses the existing original sea-glass artwork, an independently rendered H3 image-to-video clip, large Korean serif typography, and a dedicated 11 people / 4 weeks / 3 teams footer. On mobile, the artwork follows the introduction vertically. The page continues the green glass palette through project details, photographs, and participation links.

## Pipeline verification

Read the prompt project's actual H3 workflow builder, RunPod client, preset definitions, and earlier successful render records. Both configured H3 health endpoints returned HTTP 200. Credentials remain server-side and are never included in this site.

The first Blackwell job stayed queued during worker initialization and was cancelled successfully before switching to the existing primary H3 route. No endpoint configuration was changed.

Input: `dist/assets/mindora-glass.png`. Requested clip: 6 seconds, H3 standard20, 24 fps, 832×480, seed 92731. The actual frame count follows the existing H3 workflow's temporal alignment rule.

Prompt: Locked-off camera, no camera movement, no zoom. A monumental translucent pale aqua sea-glass ribbon sculpture in a luminous white gallery. The intertwined ribbons very slowly and gracefully flex and unfurl in place, maintaining their elegant loop structure. Soft sunlight travels over curved glass edges; delicate refracted caustic patterns glide slowly across the white floor. Luxurious photorealistic material, quiet continuous organic motion, subtle shifting specular highlights. Preserve the composition, pale aqua palette and empty white left third. No new objects, no people, no text, no logos. Restrained sophisticated motion, no melting, no sudden transitions.

## Axle

The original city image remains the source texture. A masked fragment shader moves the central sky very slowly and adds subpixel movement to wet-paving reflections. The architecture is outside the animated region; the two rail centerlines are protected. Existing independently animated tram sprites and their reflections remain above this layer. This is a local image distortion effect, not a generated city video or a fluid simulation.

Both editions stop animation when paused, hidden, or offscreen and honor reduced-motion preferences. Mindora keeps its original still image as a loading/error fallback.

Rollback: previous complete version 10, commit `87e8ae68457871068a5ad3317e952fa9d4abe516`, also archived at `../tmp/before-mindora-detail.zip`.

## Completed output

Primary H3 job completed successfully: 158 frames, 832×480, 24 fps, 6.583 seconds. Provider execution time 67.946 seconds; worker queue time is separate. First/middle/last imagery inspected. The published clip uses forward/reverse playback with duplicate endpoint frames removed, H.264/yuv420p and faststart, no audio. Final asset: dist/assets/mindora-h3.mp4. Original generated output: ../tmp/mindora-h3.mp4.

