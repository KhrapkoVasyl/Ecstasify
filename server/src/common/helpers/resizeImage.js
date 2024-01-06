import sharp from 'sharp';

export async function resizeImage(squareImageBuffer, height, weight) {
  try {
    const image = sharp(squareImageBuffer);

    return image.resize(height, weight).toBuffer();
  } catch (error) {
    console.error('Помилка генерації різних розмірів зображення:', error);
    throw error;
  }
}
