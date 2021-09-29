module.exports = (arr, field) => {
  const output = []
  for (let i = 0; i < arr.length; ++i) { output.push(arr[i][field]) }
  return output
}
