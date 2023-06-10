const plus = (a: number, b: number) => a + b;
const minus = (a: number, b: number) => a - b;
const a_plus_abs_b = (a: number, b: number) => (b >= 0 ? plus : minus)(a, b);

// b >= 0 => plus(a,b), b < 0 => minus(a,b)
