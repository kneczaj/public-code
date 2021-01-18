export interface LoginQueryPayload {
  username: string;
  password: string;
}

export interface LoginResponsePayload {
  login: {
    user: {
      email: string;
    }
    jwt: string;
  }
}
