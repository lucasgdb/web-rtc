export type ScreenShareElement = {
  start: (options: DisplayMediaStreamOptions) => Promise<void>;
  stop: () => void;
};
