const non_minimum_square_addition = (a: number, b: number, c: number) => {
  const input_array = [a, b, c];

  return input_array
    .filter((num) => num !== Math.min(...input_array))
    .reduce((prev, next) => prev + Math.pow(next, 2), 0);
};
