# Fresh hero composition v2

Mode: built-in image-generation tool. Use case: photorealistic-natural.

Final asset: `public/tattoo-images/hero-models-studio-v2.png`.
Generated source: `public/tattoo-images/hero-models-studio-v2-source.png`.

The entire three-person scene was newly generated. The three supplied photographs served as the middle person's identity references, not cutout or compositing sources. The first generation used only those photographs. The final generation used those photographs plus the fresh first generation to correct the middle person's body angle. Neither the original hero nor the rejected face replacement was supplied as an image input.

## Final generation prompt

Generate a new coherent full studio photograph using the three real-person photos as identity references for the CENTER adult man, and the most recent three-model generated image as the fresh composition direction. Crucial pose correction: the center model must NOT face straight toward camera. Rotate his torso about 45 degrees toward the LEFT EDGE of the image. His LEFT shoulder and LEFT tattooed arm must be closest to camera, appearing on the RIGHT side of his chest in the picture. His chest appears in three-quarter profile on the LEFT of that visible arm, and his head tilts downward looking toward his shoulder/arm. His visible arm hangs relaxed straight down. Keep left model facing left in a black T-shirt, right model facing right shirtless with arms crossed. All three remain in same tightly grouped, slightly overlapping standing composition, from full heads to upper thighs, anchored to bottom. Center man has the natural facial identity of the real reference man with thin mustache, wavy tousled hair, matching nose and jaw; newly synthesize all anatomy and shading naturally, no pasted face or preservation of source-photo lighting. Same single shared soft studio key light and fill, consistent natural skin texture and sharpness on all three. Center visible shoulder-to-forearm tattoo is spiky abstract blackwork; left model forearm compass tattoo; right model geometric sleeve. All people monochrome black-and-white. Flat vivid solid chroma-green background #0AF70A, no green spill. Landscape 1536x1024. Preserve likeness and regenerate naturally, do not cut out or composite faces.

## Background-only processing

Used the existing background-removal script with the user's prior explicit approval. No facial cutouts, face compositing, or face retouching were performed after generation. Earlier assets are preserved.

```sh
node scripts/remove-green-screen.mjs public/tattoo-images/hero-models-studio-v2-source.png public/tattoo-images/hero-models-studio-v2.png
```
