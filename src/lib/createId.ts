function randomSegment() {
  return Math.random()
    .toString(16)
    .slice(2)
}

export function createId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return [
    Date.now().toString(16),
    randomSegment(),
    randomSegment(),
  ].join('-')
}
