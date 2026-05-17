/**
 * Draws an image onto a canvas using "contain" fit strategy.
 * The image is scaled to fit within the canvas while preserving its aspect ratio,
 * and centered on the canvas.
 */
export function drawImageContain(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
): void {
  const imgAspect = image.naturalWidth / image.naturalHeight;
  const canvasAspect = canvasWidth / canvasHeight;

  let drawWidth: number;
  let drawHeight: number;

  if (imgAspect > canvasAspect) {
    // Image is wider relative to canvas — fit by width
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgAspect;
  } else {
    // Image is taller relative to canvas — fit by height
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgAspect;
  }

  const offsetX = (canvasWidth - drawWidth) / 2;
  const offsetY = (canvasHeight - drawHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}
