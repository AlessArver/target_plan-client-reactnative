import { useState } from "react";

export const toggler = (defaultValue: boolean = false) => {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    set: () => setValue(true),
    unSet: () => setValue(false),
    toggle: () => setValue(!value),
  };
};
