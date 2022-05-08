export const dir = {
  red: {
    time: 3000,
    callback: () => console.log('red'),
    next: 'green',
  },
  green: {
    time: 1000,
    callback: () => console.log('green'),

    next: 'yellow',
  },
  yellow: {
    time: 2000,
    callback: () => console.log('yellow'),

    next: 'red',
  },
}
