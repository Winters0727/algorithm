function corpFlightBookings(bookings: number[][], n: number): number[] {
  const createRange = (length: number, start: number = 0) =>
    Array.from({ length: length }).map((_, index) => index + start);

  const startMemo = Array.from({ length: n }).map((_) => 0);
  const endMemo = Array.from({ length: n + 1 }).map((_) => 0);
  const range = createRange(n);
  const result = Array.from({ length: n }).map((_) => 0);

  for (const booking of bookings) {
    const [start, end, value] = booking;
    startMemo[start - 1] += value;
    endMemo[end] += value;
  }

  let currentValue = 0;

  for (const index of range) {
    currentValue += startMemo[index] - endMemo[index];
    result[index] = currentValue;
  }

  return result;
}
