const conditional = (predicate: boolean, then_clause: any, else_clause: any) =>
  predicate ? then_clause : else_clause;

const average = (a: number, b: number) => (a + b) / 2;

const improve = (guess: number, x: number) => average(guess, x / guess);

const is_good_enough = (guess: number, x: number) =>
  Math.abs(Math.pow(guess, 2) - x) < 0.001;

const sqrt_iter = (guess: number, x: number): any =>
  // is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
  conditional(is_good_enough(guess, x), guess, sqrt_iter(improve(guess, x), x)); // 인수우선평가라면 Maximum call stack size exceeded 에러 발생
