function number(value) {
  const str = value.toString()

  return str.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export {
  number,
}