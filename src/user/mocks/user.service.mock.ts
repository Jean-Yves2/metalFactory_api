export class UserServiceMock {
  geatAllUsers = jest.fn().mockResolvedValue([
    {
      id: 1,
      firstName: 'Ana',
      lastName: "D'Amore",
      email: 'Jamey55@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      firstName: 'Ansley',
      lastName: 'Crona',
      email: 'Miller.Crooks92@yahoo.com',
      role: 'USER',
    },
  ]);

  getUserById = jest.fn();
  updateUser = jest.fn();
  softDelete = jest.fn();
  findUserByEmail = jest.fn();
}
