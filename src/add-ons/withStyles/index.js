export default styles => props => ({
  style: Object.keys(props)
    .filter(k => styles[k])
    .reduce((acc, k) => ({
      ...acc,
      [styles[k]]: props[k]
    }), {})
})