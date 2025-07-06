function where<T, K>(field: keyof K) {
  return {
    equals: (value: T) => (item: K) => item[field] === value,
    isNot: (value: T) => (item: K) => item[field] !== value
  }
}

export default where
