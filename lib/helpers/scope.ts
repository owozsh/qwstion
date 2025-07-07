function scope<T>(fn: () => T): T {
  return fn()
}

export default scope
