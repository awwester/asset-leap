export const getUniqueTypes = (worthItems) => {
  // Return an array of unique types for the assets or liabilities.
  return [...new Set(worthItems.map(obj => obj.type)) ];
}
