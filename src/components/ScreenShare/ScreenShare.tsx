import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { ScreenShareElement } from './types';
import { cx } from '../../utils/cx';

export const ScreenShare = forwardRef<ScreenShareElement, React.VideoHTMLAttributes<HTMLVideoElement>>(
  ({ className, ...props }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const start = useCallback(async (options: DisplayMediaStreamOptions) => {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia(options);

        if (videoRef?.current) videoRef.current.srcObject = screenStream;

        setStream(screenStream);
      } catch (err) {
        console.error('Erro ao tentar compartilhar a tela:', err);
      }
    }, []);

    const stop = useCallback(() => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setStream(null);
        if (videoRef.current) videoRef.current.srcObject = null;
      }
    }, [stream]);

    useImperativeHandle(ref, () => {
      return {
        start,
        stop,
      };
    }, [start, stop]);

    return (
      <video
        ref={videoRef}
        autoPlay
        controls
        onClick={(event) => event.preventDefault()}
        controlsList="nodownload noremoteplayback"
        className={cx('w-full aspect-video', className)}
        {...props}
      />
    );
  },
);
