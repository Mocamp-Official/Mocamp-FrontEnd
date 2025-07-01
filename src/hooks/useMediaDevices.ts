import { useState, useCallback } from 'react';

export const useMediaDevices = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getMedia = useCallback(async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(media);
      setError(null);
    } catch {
      setError('카메라/마이크 권한이 필요합니다.');
    }
  }, []);

  return { stream, error, getMedia };
};
