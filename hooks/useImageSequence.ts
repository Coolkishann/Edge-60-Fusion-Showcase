"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseImageSequenceResult {
  images: HTMLImageElement[];
  isLoaded: boolean;
  progress: number;
  totalFrames: number;
  error: string | null;
}

/**
 * Hook to preload an entire image sequence for canvas rendering.
 * Returns the loaded images, loading state, and progress percentage.
 */
export function useImageSequence(
  basePath: string,
  filenamePattern: (index: number) => string,
  totalFrames: number,
  startLoading: boolean = true
): UseImageSequenceResult {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedRef = useRef(false);

  const progress = totalFrames > 0 ? Math.round((loadedCount / totalFrames) * 100) : 0;

  const loadImages = useCallback(async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let count = 0;
    let hasError = false;

    // Load images in parallel batches for performance
    const batchSize = 20;

    for (let batchStart = 0; batchStart < totalFrames; batchStart += batchSize) {
      const batchEnd = Math.min(batchStart + batchSize, totalFrames);
      const batchPromises: Promise<void>[] = [];

      for (let i = batchStart; i < batchEnd; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `${basePath}/${filenamePattern(i)}`;

          img.onload = () => {
            loadedImages[i] = img;
            count++;
            setLoadedCount(count);
            resolve();
          };

          img.onerror = () => {
            // Create a placeholder for failed frames
            console.warn(`Failed to load frame ${i}: ${img.src}`);
            loadedImages[i] = img; // Still store it
            count++;
            setLoadedCount(count);
            if (!hasError) {
              hasError = true;
              setError(`Some frames failed to load`);
            }
            resolve();
          };
        });

        batchPromises.push(promise);
      }

      await Promise.all(batchPromises);
    }

    setImages(loadedImages);
    setIsLoaded(true);
  }, [basePath, filenamePattern, totalFrames]);

  useEffect(() => {
    if (startLoading) {
      loadImages();
    }
  }, [loadImages, startLoading]);

  return { images, isLoaded, progress, totalFrames, error };
}
