const make_monitored = (cb: CallableFunction) => {
  let cb_counter = 0;
  return (...args: any[]) => {
    cb_counter += 1;

    if (
      args.length === 1 &&
      typeof args[0] === "string" &&
      (args[0] as string).toLowerCase() === "how many calls"
    ) {
      return cb_counter;
    }

    return cb(...args);
  };
};

const math_sqrt = (num: number) => Math.pow(num, 0.5);

const s = make_monitored(math_sqrt);

console.log(s(100));
console.log(s("how many calls"));
