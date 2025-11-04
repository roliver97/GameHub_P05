export function isBetterTime(newTime, oldTime) {
  const [newM, newS] = newTime.split(":").map(Number);
  const [oldM, oldS] = oldTime.split(":").map(Number);
  return newM * 60 + newS < oldM * 60 + oldS;
}
