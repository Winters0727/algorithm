const average = (a: number, b: number) => (a / Math.pow(b, 2) + 2 * b) / 3;

const improve = (guess: number, x: number) => average(guess, x / guess);

const is_good_enough = (guess: number, x: number) =>
  Math.abs(Math.pow(guess, 3) - x) < 0.001;

const sqrt_iter = (guess: number, x: number): any =>
  is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
