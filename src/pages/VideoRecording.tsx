import { useRef, useState } from 'react';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { download } from '../utils/download';

const getSupportedMimeTypes = () => {
  const possibleTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/mp4;codecs=h264,aac',
  ];

  return possibleTypes.filter(MediaRecorder.isTypeSupported);
};

export function VideoRecordingPage() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedBlobs, setRecordedBlobs] = useState<BlobPart[]>([]);
  const [error, setError] = useState('');

  const [stream, setStream] = useState<MediaStream | null>(null);

  const gumVideoRef = useRef<HTMLVideoElement>(null);
  const recordedVideoRef = useRef<HTMLVideoElement>(null);
  const codecPreferencesRef = useRef<HTMLSelectElement>(null);
  const echoCancellationRef = useRef<HTMLInputElement>(null);

  const handleWebcam = async () => {
    if (stream) {
      stopWebcam();
      return;
    }

    startWebcam();
  };

  const startWebcam = async () => {
    const hasEchoCancellation = Boolean(echoCancellationRef.current?.checked);

    const constraints = {
      audio: {
        echoCancellation: { exact: hasEchoCancellation },
      },
      video: { width: 1280, height: 720 },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (gumVideoRef.current) {
        gumVideoRef.current.srcObject = stream;
      }

      setStream(stream);
    } catch (error) {
      const err = error as Error;
      setError(`navigator.getUserMedia error: ${err.toString()}`);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      if (gumVideoRef.current) gumVideoRef.current.srcObject = null;
    }
  };

  const startRecording = () => {
    if (!codecPreferencesRef.current || !stream) {
      return;
    }

    const options = { mimeType: codecPreferencesRef.current.value };
    const newMediaRecorder = new MediaRecorder(stream, options);

    newMediaRecorder.ondataavailable = (event) => {
      if (event.data?.size) {
        setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
      }
    };

    setRecordedBlobs([]);
    newMediaRecorder.start();
    setMediaRecorder(newMediaRecorder);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const downloadRecording = () => {
    const mimeType = codecPreferencesRef.current?.value.split(';', 1)[0];
    if (!mimeType) {
      return;
    }

    const blob = new Blob(recordedBlobs, { type: mimeType });
    download(blob, { fileName: 'video', mimeType });
  };

  const getVideoSrc = () => {
    if (!recordedBlobs.length) {
      return;
    }

    const mimeType = codecPreferencesRef.current?.value.split(';', 1)[0];

    const superBuffer = new Blob(recordedBlobs, { type: mimeType });

    return window.URL.createObjectURL(superBuffer);
  };

  const supportedMimeTypes = getSupportedMimeTypes();

  const isRecording = mediaRecorder?.state === 'recording';

  const videoSrc = getVideoSrc();

  return (
    <div>
      <Title className="mt-4">
        Video recording -{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">WebRTC</span>
      </Title>

      <div className="flex flex-wrap gap-4 mt-4">
        <div>
          <p className="font-normal">Webcam:</p>
          <video ref={gumVideoRef} className="w-[400px] bg-black rounded-lg aspect-video" playsInline autoPlay muted />
        </div>

        <div>
          <p className="font-normal">Recorded video:</p>
          <video
            ref={recordedVideoRef}
            className="w-[400px] rounded-lg aspect-video"
            src={videoSrc}
            controls
            autoPlay
            loop
          />
        </div>
      </div>

      <div className="flex gap-1 mt-4">
        <Button onClick={handleWebcam} variant={stream ? 'red' : 'dark'}>
          {stream ? 'Stop' : 'Start'} webcam
        </Button>

        <Button
          onClick={isRecording ? stopRecording : startRecording}
          variant={isRecording ? 'red' : 'default'}
          disabled={!stream}
        >
          {isRecording ? 'Stop' : 'Start'} recording
        </Button>

        <Button onClick={downloadRecording} variant="white" disabled={recordedBlobs.length === 0}>
          Download
        </Button>
      </div>

      <div className="mt-4">
        <label className="font-normal" htmlFor="mimeType">
          Recording format:
        </label>

        <select ref={codecPreferencesRef} id="mimeType" disabled={!stream}>
          {supportedMimeTypes.map((mimeType, index) => (
            <option key={index} value={mimeType}>
              {mimeType}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mt-2">
        <h4 className="text-lg font-bold">Media Stream constraints options</h4>
        <p className="font-normal flex items-center gap-2">
          Echo cancellation: <input type="checkbox" id="echoCancellation" ref={echoCancellationRef} />
        </p>
      </div>

      {error && (
        <div className="mt-2">
          <span className="text-red-600">{error}</span>
        </div>
      )}
    </div>
  );
}
