export const fillMissingTests = (labResults, allTests) => {
  const result = {};
  allTests.forEach(test => {
    result[test] = labResults[test] || [];
  });
  return result;
};
