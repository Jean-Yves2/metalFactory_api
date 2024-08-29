import { userMock } from '../../user/mocks/user.mock';
export class UserServiceMock {
  findUserByEmail = jest.fn().mockImplementation((email) => {
    const user = userMock.find((user) => user.email === email);
    return user;
  });
}
