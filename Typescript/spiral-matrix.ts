function spiralOrder(matrix: number[][]): number[] {
  const MAX_ROW = matrix.length;
  const MAX_COL = matrix[0].length;
  const SPIRAL_DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const directionCounter = [0, 0];
  const answer: number[] = [];

  const processSpiralOrder = (
    position: [number, number],
    index: number
  ): [[number, number], number] => {
    let [row, col] = position;

    const counter = directionCounter[index % 2];
    const direction = SPIRAL_DIRECTIONS[index];
    const [dRow, dCol] = direction;

    switch (index) {
      case 0:
        while (col < MAX_COL - (counter + 1)) {
          answer.push(matrix[row][col]);
          col += dCol;
        }
      case 1:
        while (row < MAX_ROW - (counter + 1)) {
          answer.push(matrix[row][col]);
          row += dRow;
        }
      case 2:
        while (counter <= col) {
          answer.push(matrix[row][col]);
          col += dCol;
        }
      case 3:
        while (counter <= row) {
          answer.push(matrix[row][col]);
          row += dRow;
        }
    }

    directionCounter[index % 2] += 1;

    return [
      index % 2 ? [row, counter] : [counter, col],
      index + 1 === 4 ? 0 : index + 1,
    ];
  };

  let position: [number, number] = [-1, -1];
  let nextPosition: [number, number] = [0, 0];
  let index = 0;

  // while (position[0] !== nextPosition[0] || position[1] !== nextPosition[1]) {
  position = [nextPosition[0], nextPosition[1]];
  [nextPosition, index] = processSpiralOrder(position, index);
  // }

  answer.push(matrix[position[0]][position[1]]);

  return answer;
}

console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
