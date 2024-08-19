import { useState } from 'react';
import { ScreenSharingPage } from './pages/ScreenSharing';
import { VideoRecordingPage } from './pages/VideoRecording';
import { ButtonGroup } from './components/ButtonGroup/ButtonGroup';
import { Button } from './components/Button';

function App() {
  const [tab, setTab] = useState(0);

  return (
    <div className="max-w-[1420px] m-auto p-4">
      <div className="flex justify-center">
        <ButtonGroup>
          <Button onClick={() => setTab(0)} className={tab === 0 ? 'text-blue-700' : 'text-gray-900'}>
            Screen sharing
          </Button>
          <Button onClick={() => setTab(1)} className={tab === 1 ? 'text-blue-700' : 'text-gray-900'}>
            Video recording
          </Button>
        </ButtonGroup>
      </div>

      {tab === 0 ? <ScreenSharingPage /> : <VideoRecordingPage />}
    </div>
  );
}

export default App;
