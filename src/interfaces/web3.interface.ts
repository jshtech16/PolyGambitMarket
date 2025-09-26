export type CallBackType = {
  state: 'ok' | 'err',
  data?: any,
  code?: string
}

export type CBNumberType = {
  data?: number
} & CallBackType

export type CBNumberArrayType = {
  data?: number[]
} & CallBackType

export type CBBooleanType = {
  data?: boolean
} & CallBackType

export type TokenType = {
  address: string,
  decimals: number,
  symbol: string,
  name: string
}
