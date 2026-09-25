# Hero image regeneration

Generated with the built-in image-generation tool using the original hero composition and three user-supplied photographs as the center subject's identity references. No face was cut out or composited from those photographs.

Final asset: `public/tattoo-images/hero-models-regenerated.png`.
Generated chroma-key source: `public/tattoo-images/hero-models-regenerated-source.png`.
The previous hero remains at `public/tattoo-images/hero-models-transparent.png`.

## Generation prompt

Use case: identity-preserve. Regenerate the existing three-man tattoo website hero as one coherent photorealistic photograph, NOT a pasted face collage. Input images 1, 2, and 3 are facial identity references of the SAME adult man, showing his front/three-quarter/profile: match his natural face shape, nose and jaw profile, eyes, lips, thin mustache, and natural wavy dark hair faithfully. Image 4 is the existing hero COMPOSITION/POSE reference. Recreate image 4: exactly three adult men, same left-to-right order, same overlapping positions, same camera framing, same clothing and tattoos, same body shapes, same lighting. Left man in black T-shirt faces left with tattooed forearm, center shirtless man with tattooed left-facing arm and black trousers looks down, right shirtless tattooed man faces right with arms crossed. Change ONLY the CENTER man's facial identity to the man in references 1–3, naturally regenerated in the existing downward-looking head pose with coherent anatomy, lighting and skin texture. Preserve the left and right men's faces and all three body poses. Do not import the phone, earphones, red T-shirt, gym background or cafe. Keep the same realistic monochrome black-and-white treatment, no beauty retouching or exaggerated curly hair for the middle man. Landscape 3:2 composition, full original framing from heads to upper thighs, all three heads entirely visible, figures anchored to bottom edge. Output a real transparent-background PNG with alpha outside the people so website typography can show behind them. The green in image 4 is only a background mask: remove it completely. No green, no checkerboard pattern, no solid background, no text, no additional people. Preserve identity accuracy of the center subject and the exact overall composition as closely as possible.

## Final background correction prompt

Change ONLY the gray-and-white checkerboard background to a perfectly flat uniform vivid chroma green RGB(10,247,10), hex #0AF70A. Fill ALL background including gaps between bodies and around hair. Keep every part of the three people unchanged: identical newly regenerated CENTER MAN's face and mustache, left and right faces, their poses, tattoos, clothes, body proportions, lighting, exact positions, monochrome black and white appearance. The people must remain black-and-white, with no green cast. Do not change any face or hairstyle or regenerate the subjects. Keep the same 1536x1024 landscape framing and crop. Clean natural silhouette edges, no checkerboard, no transparency, no shadows on the green. This is a background-only edit for chroma-key removal.

## Background removal

The generator returned opaque PNGs despite transparency requests. The user explicitly approved using the existing background-removal script. Only the background was removed; the generated faces were not composited.

```sh
node scripts/remove-green-screen.mjs public/tattoo-images/hero-models-regenerated-source.png public/tattoo-images/hero-models-regenerated.png
```
