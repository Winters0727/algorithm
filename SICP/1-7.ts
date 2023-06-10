const average = (a: number, b: number) => (a + b) / 2;

const improve = (guess: number, x: number) => average(guess, x / guess);

const is_good_enough = (max_limit: number) => (guess: number, x: number) =>
  Math.abs(Math.pow(guess, 2) - x) < max_limit;

const sqrt_iter = (guess: number, x: number): any =>
  is_good_enough(0.001)(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
