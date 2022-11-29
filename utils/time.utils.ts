import { formatDuration, intervalToDuration } from 'date-fns';

export const ONE_SEC_IN_MS = 1000;
export const ONE_MIN_IN_MS = 60 * ONE_SEC_IN_MS;
export const ONE_HR_IN_MS = 60 * ONE_MIN_IN_MS;

export function formatShowDuration(durationInMs: number) {
  if (durationInMs < ONE_MIN_IN_MS) {
    return formatDuration(intervalToDuration({ start: 0, end: durationInMs }));
  } else {
    const seconds = Math.floor(durationInMs / ONE_SEC_IN_MS) % 60;
    const minutes = Math.floor(durationInMs / ONE_MIN_IN_MS) % 60;

    if (durationInMs < ONE_HR_IN_MS) {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }

    const hours = Math.floor(durationInMs / ONE_HR_IN_MS);
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
