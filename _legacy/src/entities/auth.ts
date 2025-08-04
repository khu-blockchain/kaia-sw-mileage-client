type JWT = [AccessToken, RefreshToken]

type AccessToken = Token<TokenType.ACCESS>; // 0
type RefreshToken = Token<TokenType.REFRESH>; // 1

enum TokenType {
  'ACCESS',
  'REFRESH'
}

type Token<T extends TokenType> = {
  token: string;
  expires: string;
  token_type: T; // enum
}

export type {
  JWT,
  AccessToken,
  RefreshToken,
}

export {
  TokenType
}