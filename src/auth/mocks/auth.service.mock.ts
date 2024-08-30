export class AuthServiceMock {
  login = jest.fn().mockImplementation(() => {
    return {
      access_token: 'access_token',
    };
  });
  register = jest.fn().mockImplementation(() => {
    return {
      access_token: 'access_token',
    };
  });
}
