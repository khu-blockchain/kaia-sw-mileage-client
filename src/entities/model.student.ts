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


type Student = {
  student_id: string;
  name: string;
  email: string;
  phone_number: string;
  department: string;
  wallet_address: string
  bank_account_number: string;
  bank_code: string;
}

type StudentWithToken = {
  student: Student,
  tokens: JWT
}

export type {
  JWT,
  AccessToken,
  RefreshToken,
  Student,
  StudentWithToken
}

export {
  TokenType
}
