const make_account = (initial_budget: number, password: string) => {
  const PASSWORD = password;

  let budget = initial_budget;

  return (password_input: string, action: string) =>
    (action_budget: number) => {
      if (password_input !== PASSWORD) return "Incorrect Password";

      switch (action) {
        case "withdraw":
          if (budget >= action_budget) {
            budget -= action_budget;
            break;
          } else {
            return "Insufficient Budget";
          }
        case "deposit":
          budget += action_budget;
          break;
      }

      return budget;
    };
};

const acc = make_account(100, "javascript is fun");

console.log(acc("javascript is fun", "withdraw")(40));
console.log(acc("typescript is fun", "deposit")(40));
