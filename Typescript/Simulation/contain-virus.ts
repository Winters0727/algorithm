function containVirus(isInfected: number[][]): number {
  const ROW_LENGTH = isInfected.length;
  const COL_LENGTH = isInfected[0].length;
  const ROW_MOVE = [0, 0, 1, -1];
  const COL_MOVE = [1, -1, 0, 0];
  const MOVE_ARROW = ["D", "U", "L", "R"];
  const REVERSE_MOVE_ARROW = ["U", "D", "R", "L"];

  if (ROW_LENGTH === 1 && COL_LENGTH === 1) {
    return 0;
  }

  const createRange = (length: number, start: number = 0): number[] => {
    if (start && length <= start) return [];

    return Array.from({ length: start ? length - start + 1 : length }).map(
      (_, index) => (start ? index + start : index)
    );
  };

  const rowRange = createRange(ROW_LENGTH);
  const colRange = createRange(COL_LENGTH);
  const moveRange = createRange(4);
  const copiedInfection = isInfected.map((row) => row.map((col) => col));
  const infectionHistory = copiedInfection.map((row) => row.map((col) => col));
  const wallKeys: string[] = [];

  const calculateWallCounts = (infectedCells: [number, number][]) => {
    return infectedCells.reduce((prev, next) => {
      const [row, col] = next;
      let count = 0;

      for (const moveIndex of moveRange) {
        const nextRow = row + ROW_MOVE[moveIndex];
        const nextCol = col + COL_MOVE[moveIndex];
        const wallKey = `${
          next.join("") +
          MOVE_ARROW[moveIndex] +
          ROW_MOVE[moveIndex] +
          COL_MOVE[moveIndex]
        }`;

        if (
          nextRow >= 0 &&
          nextRow < ROW_LENGTH &&
          nextCol >= 0 &&
          nextCol < COL_LENGTH &&
          !checkInfection([nextRow, nextCol], infectionHistory) &&
          !wallKeys.includes(wallKey)
        ) {
          count += 1;
          wallKeys.push(wallKey);
          wallKeys.push(
            `${
              ROW_MOVE[moveIndex] +
              COL_MOVE[moveIndex] +
              REVERSE_MOVE_ARROW[moveIndex] +
              next.join("")
            }`
          );
        }
      }

      return prev + count;
    }, 0);
  };

  const checkInfection = (
    position: [number, number],
    currentInfection: number[][]
  ): boolean => !!currentInfection[position[0]][position[1]];

  const initializeInfection = (currentInfection: number[][]) => {
    const VISITED = Array.from({ length: ROW_LENGTH }).map(() =>
      Array.from({ length: COL_LENGTH }).fill(false)
    );

    const infectedAreas: [number, number][][] = [];

    for (const row of rowRange) {
      for (const col of colRange) {
        if (
          checkInfection([row, col], currentInfection) &&
          !VISITED[row][col]
        ) {
          const infectionCells: [number, number][] = [[row, col]];
          const queue = [[row, col]];

          while (queue.length) {
            const currentPosition = queue.shift();
            if (currentPosition) {
              const [row, col] = currentPosition;

              if (VISITED[row][col]) continue;
              VISITED[row][col] = true;

              for (const moveIndex of moveRange) {
                const nextRow = row + ROW_MOVE[moveIndex];
                const nextCol = col + COL_MOVE[moveIndex];

                if (
                  nextRow >= 0 &&
                  nextRow < ROW_LENGTH &&
                  nextCol >= 0 &&
                  nextCol < COL_LENGTH &&
                  checkInfection([nextRow, nextCol], copiedInfection) &&
                  !VISITED[nextRow][nextCol]
                ) {
                  queue.push([nextRow, nextCol]);
                  infectionCells.push([nextRow, nextCol]);
                }
              }
            }
          }
          infectedAreas.push(infectionCells);
        }
      }
    }

    return infectedAreas;
  };

  const blockInfection = (blockedArea: [number, number][]) => {
    for (const infectedCell of blockedArea) {
      const [row, col] = infectedCell;
      copiedInfection[row][col] = 0;
    }
    return copiedInfection;
  };

  const processInfection = (infectedAreas: [number, number][][]) => {
    for (const infectedArea of infectedAreas) {
      for (const infectedCell of infectedArea) {
        const [row, col] = infectedCell;

        for (const moveIndex of moveRange) {
          const nextRow = row + ROW_MOVE[moveIndex];
          const nextCol = col + COL_MOVE[moveIndex];

          if (
            nextRow >= 0 &&
            nextRow < ROW_LENGTH &&
            nextCol >= 0 &&
            nextCol < COL_LENGTH &&
            !checkInfection([nextRow, nextCol], nextInfection)
          ) {
            copiedInfection[nextRow][nextCol] = 1;
            infectionHistory[nextRow][nextCol] = 1;
          }
        }
      }
    }
    return copiedInfection;
  };

  let currentInfectedAreas: [number, number][][] = [];
  let nextInfection = copiedInfection;
  let result = 0;

  do {
    const infectedAreas = initializeInfection(nextInfection);
    const wallCounts = infectedAreas.map((infectedArea) =>
      calculateWallCounts(infectedArea)
    );

    console.log(wallCounts);

    for (const k of infectionHistory) {
      console.log(JSON.stringify(k));
    }

    const maxWallCount = Math.max(...wallCounts);
    const areaIndex = wallCounts.findIndex((count) => count === maxWallCount);
    const blockedArea = infectedAreas.splice(areaIndex, 1)[0];
    const blockedInfection = blockInfection(blockedArea);

    result += wallCounts.splice(areaIndex, 1)[0];
    currentInfectedAreas = infectedAreas;
    nextInfection = processInfection(infectedAreas);
  } while (currentInfectedAreas.length);

  return result;
}

console.log(
  containVirus([
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  ])
);
