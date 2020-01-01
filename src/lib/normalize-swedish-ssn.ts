// SEE https://gist.github.com/peppelorum/5856691
const DEFAULT_C = '20'

export default function normalizeSwedishSsn(value: string) {
  const match = /^(\d{2})?(\d{2})(\d{2})(\d{2})([-+])?(\d{4})$/.exec(value.replace(/\s/g, ''))
  if (!match) return value
  const [, c__ = DEFAULT_C, y, m, d, separator = '-', lastFour] = match
  const c_ = `${c__}${y}${m}${d}` > '2019-01-01' ? `${Number.parseInt(c__) - 1}` : c__
  const c = separator === '+' ? `${Number.parseInt(c_) - 1}` : c_

  return `${c}${y}${m}${d}${lastFour}`
}
