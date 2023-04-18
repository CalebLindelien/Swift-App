export const getError = (error) => {
  // If the error has a `response` property and a `data` property with a `message` property, return the `message` property
  // Otherwise, return the `message` property of the error itself
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
