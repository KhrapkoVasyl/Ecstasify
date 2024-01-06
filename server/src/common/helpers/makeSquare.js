import sharp from 'sharp';

export async function makeSquareImage(inputBuffer) {
  try {
    const image = sharp(inputBuffer);

    const { width, height } = await image.metadata();

    const newSize = Math.max(width, height);

    const left = (width - newSize) / 2;
    const top = (height - newSize) / 2;

    await image
      .extract({ left, top, width: newSize, height: newSize })
      .resize(newSize, newSize);

    return await image.toBuffer();
  } catch (error) {
    console.error('Помилка обробки зображення:', error);
    throw error;
  }
}
