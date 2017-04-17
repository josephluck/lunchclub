const data = {
  users: {
    user1: {
      name: 'Joseph',
      email: 'joseph@local.co',
    },
    user2: {
      name: 'Chloe',
      email: 'chloe@local.co',
    },
  },
  lunches: {
    lunch1: {
      status: 'created',
      captain: 'user1',
      place: 'hte-grt-345t-ergrwgt43-gtw4t42',
      time: '12:00',
    },
  },
  invitations: {
    lunch1: {
      user1: true,
      user2: false,
    }
  }
}

console.log(data)
