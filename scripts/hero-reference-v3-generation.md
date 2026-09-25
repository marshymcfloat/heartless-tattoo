# Hero reference correction v3

Mode: built-in image generator, edit using selected hero and hero-1.jpg, hero-2.jpg, hero-3.jpg as tattoo references. Previous selected image is preserved. Only the green background was removed with the previously approved script after generation. Tattoos are generated approximations, not exact reproductions of portfolio artwork.

Final: `public/tattoo-images/hero-models-reference-v3.png`
Source: `public/tattoo-images/hero-models-reference-v3-source.png`

## Prompt

Edit image 1, the selected three-man website hero. Images 2 (hero-1), 3 (hero-2), and 4 (hero-3) are exact tattoo design references for LEFT, CENTER, RIGHT respectively. Preserve image 1's layout, all three poses, framing 1536x1024, clothing, lighting, and especially CENTER man's approved face, hair, expression and likeness. Change only left and right facial naturalism and all three tattoos. LEFT and RIGHT faces: believable ordinary adult men, less fashion-model perfection, softer non-sculpted jaw contours, natural uneven skin texture, subtle pores, faint blemishes, modest under-eye texture, slight facial asymmetry and irregular stubble, not exaggerated aging or scarring. Keep same head direction, hairstyle, ethnicity and age range, coherent photographed anatomy, no pasted heads. TATTOOS: faithfully reconstruct the actual reference designs on their respective arms with perspective following skin; these are portfolio artworks, NOT opportunities to invent substitute designs. LEFT replace compass/forest with image 2's realistic large eye and eyelashes above clock hands and Roman numeral clock framework, shaded rose below toward wrist, matching reference's proportions and gray shading; no compass or forest. CENTER remove all circular scratchy compass-like motifs; reproduce image 3's sparse long black cyber-sigil thorn branch, curved fork encircling shoulder and descending jagged spine down outer upper arm to elbow/upper forearm, sharp thin branching tips and open bare skin, no full dense sleeve, lower forearm largely bare as in reference. RIGHT replace dense generic Polynesian full sleeve with image 4's exact upper-arm half-sleeve: prominent large pale three-petal fan/flower at shoulder framed by black arch, diagonal bold black bands, broad geometric triangle panels and fine parallel-line patterns beneath, ends ABOVE elbow, forearm bare. Do not add compass rose or tiny dense repeating scales; copy the photographed geometric organization. Render all people monochrome, natural ink under real skin with shared lighting and natural detail. Maintain flat green background #0AF70A including between bodies for already approved background-only removal. No green spill, no text, no new props. Do not alter middle face or poses.

## Background preparation

```sh
node scripts/remove-green-screen.mjs public/tattoo-images/hero-models-reference-v3-source.png public/tattoo-images/hero-models-reference-v3.png
```
