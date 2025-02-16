
export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatNumber = (balance?: number) =>
  typeof balance === "number"
    ? balance.toLocaleString("en-US").replaceAll(",", " ")
    : "";

export const formatCompactNumber = (number: number, postfix?: string) => {
  const usformatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 3,
  });
  return usformatter.format(number) + " " + (postfix || "");
};

export function getTextWidth(text: string, font: string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context == null)
    return 0

  context.font = font;

  return context.measureText(text).width;
}

export function formatNumberTo3(x: number, length?: number) {
  if (x > 1)
      return length ? x.toFixed(3).substring(0, length) : x.toFixed(3)
  return length ? x.toPrecision(3).substring(0, length) : x.toPrecision(3)
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function numberToTime(sec: number) {
  return Math.floor(sec / 3600).toString().padStart(2, "0") + ":" + (Math.floor(sec / 60) % 60).toString().padStart(2, "0") + ":" + (sec % 60).toString().padStart(2, "0")
}