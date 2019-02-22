import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }
}

export {
  LocalStorageMock,
  fakeUser,
};
