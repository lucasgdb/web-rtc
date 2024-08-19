import { useRef } from 'react';
import { Button } from '../components/Button';
import { ScreenShare, ScreenShareElement } from '../components/ScreenShare';
import { Title } from '../components/Title';

export function ScreenSharingPage() {
  const screenShareRef = useRef<ScreenShareElement>(null);

  const startScreenShare = () => {
    screenShareRef.current?.start({
      video: true,
    });
  };

  const stopScreenShare = () => {
    screenShareRef.current?.stop();
  };

  return (
    <div>
      <Title className="mt-4">
        Screen sharing -{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">WebRTC</span>
      </Title>

      <div className="mt-4">
        <Button variant="dark" onClick={startScreenShare}>
          Share screen
        </Button>

        <Button variant="red" className="ml-2" onClick={stopScreenShare}>
          Stop sharing screen
        </Button>
      </div>

      <ScreenShare className="mt-2" ref={screenShareRef} />
    </div>
  );
}
