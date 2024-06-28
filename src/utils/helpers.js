export const getOptionName = (options, value) => {
  if (!options || !value) return "";
  const option = options.find((opt) => opt._id === (value._id || value));
  return option ? option.name : "";
};

export const getMultipleOptionNames = (options, values) => {
  if (!Array.isArray(values) || !options) {
    return [];
  }
  return values.map((value) => getOptionName(options, value));
};

export function destructureContactDetails(responseData) {
  return responseData?.map((student) => {
    // Destructure contactDetails or set default values if it doesn't exist
    let { contactDetails: { email = "", phone = "" } = {}, ...rest } = student;

    // Return a new object with destructured email and phone
    return { ...rest, email, phone };
  });
}

// Function to rename a property in an array of objects
export function renamePropertyInArray(arr, oldProp, newProp) {
  arr.forEach((obj) => {
    // Check if the old property exists in the object
    if (obj.hasOwnProperty(oldProp)) {
      // Assign the value of oldProp to newProp
      obj[newProp] = obj[oldProp];
      // Delete the old property
      delete obj[oldProp];
    }
  });
  return arr;
}
