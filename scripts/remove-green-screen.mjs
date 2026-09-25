import sharp from "sharp";

const [source, destination] = process.argv.slice(2);

if (!source || !destination) {
  throw new Error("Usage: node scripts/remove-green-screen.mjs source.png destination.png");
}

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let offset = 0; offset < data.length; offset += info.channels) {
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  const greenExcess = green - (red + blue) / 2;
  const alpha = Math.max(0, Math.min(1, (200 - greenExcess) / 180));

  data[offset + 3] = Math.round(alpha * 255);

  if (alpha > 0 && alpha < 1) {
    const background = [10, 247, 10];
    for (let channel = 0; channel < 3; channel++) {
      const corrected =
        (data[offset + channel] - (1 - alpha) * background[channel]) / alpha;
      data[offset + channel] = Math.max(0, Math.min(255, Math.round(corrected)));
    }
  }

  if (data[offset + 3] > 0 && data[offset + 1] > Math.max(data[offset], data[offset + 2]) + 3) {
    data[offset + 1] = Math.round((data[offset] + data[offset + 2]) / 2);
  }
}

await sharp(data, { raw: info }).png().toFile(destination);
