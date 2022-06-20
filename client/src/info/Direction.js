const values = {
  toCollege: true,
  fromCollege: false
};
const Direction = {
  values: values,
  defaultValue: values.toCollege
};

export const [toCollege, fromCollege, defaultDirection] = [
  Direction.values.toCollege,
  Direction.values.fromCollege,
  Direction.defaultValue
]