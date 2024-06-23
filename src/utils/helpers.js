export const getOptionName = (options, value) => {
  const option = options.find((opt) => opt._id === value);
  return option ? option.name : "";
};

export const getMultipleOptionNames = (options, values) => {
  if (!Array.isArray(values)) {
    return [];
  }

  return values.map((value) => getOptionName(options, value));
};
