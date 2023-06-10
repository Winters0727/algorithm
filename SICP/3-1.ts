const make_accumlator = (acc_num: number) => {
  return (added_num: number) => {
    acc_num += added_num;
    return acc_num;
  };
};

const a = make_accumlator(5);

console.log(a(10));
console.log(a(10));
