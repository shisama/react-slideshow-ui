import { calcProgress, calcProgressIndex } from '../src/calcProgress';

test('calcProgress', () => {
  expect(calcProgress(1, 3)).toEqual(34);
  expect(calcProgress(2, 3)).toEqual(67);
  expect(calcProgress(3, 3)).toEqual(100);
  expect(calcProgress(4, 3)).toEqual(100);
});
