import formatDate from "dateformat";

export const getUnixTimeNowInSec = () => Math.floor(Date.now() / 1000);
export const getUnixTimeAfterMins = (mins: number) =>
  getUnixTimeNowInSec() + mins * 60;

export const formatTimestamp = (timestamp: number) => {
  const timestampMs = timestamp * 1000;

  return formatDate(timestampMs, "mmm-dd-yyyy HH:MM:ss");
};

const launchTimestamp = 1614819600000;
export const isLaunched = Date.now() >= launchTimestamp;

export const getTimeDiff = () => {
  const millisecDiff = launchTimestamp - Date.now();
  const seconds = Math.floor(millisecDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const format = (value: number) => (value < 10 ? `0${value}` : `${value}`);

  return {
    days: format(days),
    hours: format(hours % 24),
    minutes: format(minutes % 60),
    seconds: format(seconds % 60),
  };
};
