const make_account = (initial_budget: number, password: string) => {
  const PASSWORD = password;

  let budget = initial_budget;
  let password_error_counter = 0;

  const call_the_cops = () => "You are under arrest!";

  return (password_input: string, action: string) =>
    (action_budget: number) => {
      if (password_input !== PASSWORD) {
        password_error_counter += 1;

        if (password_error_counter >= 8) return call_the_cops();

        return "Incorrect Password";
      }

      password_error_counter = 0;

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

for (let i = 0; i < 9; i++) {
  console.log(acc("typescript is fun", "deposit")(40));
}
