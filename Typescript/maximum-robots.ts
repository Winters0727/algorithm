function maximumRobots(
  chargeTimes: number[],
  runningCosts: number[],
  budget: number
): number {
  const totalRobotCounts = chargeTimes.length;

  const createRange = (length: number, start: number = 0) =>
    Array.from({ length: length }).map((_, index) => index + start);
  const sumArray = (array: number[]) =>
    array.reduce((prev, next) => prev + next, 0);

  let predictedMaximumBudget = 0;
  let windowLength = totalRobotCounts;

  const calculateMaxBudget = (
    currentChargeTime: number[],
    currentRunningCosts: number[]
  ) => {
    const currentMaxChargeTime = Math.max(...currentChargeTime);
    const currentSumOfRunningCosts = sumArray(currentRunningCosts);

    const predictedBudegt =
      currentMaxChargeTime + windowLength * currentSumOfRunningCosts;

    if (predictedBudegt <= budget && predictedMaximumBudget < predictedBudegt) {
      predictedMaximumBudget = predictedBudegt;
    }
  };

  while (windowLength > 0) {
    for (const index of createRange(totalRobotCounts - windowLength + 1)) {
      const currentChargeTime = chargeTimes.slice(index, index + windowLength);
      const currentRunningCosts = runningCosts.slice(
        index,
        index + windowLength
      );

      calculateMaxBudget(currentChargeTime, currentRunningCosts);
    }

    if (predictedMaximumBudget > 0) break;
    windowLength -= 1;
  }

  return windowLength;
}

console.log(maximumRobots([3, 6, 1, 3, 4], [2, 1, 3, 4, 5], 25));
