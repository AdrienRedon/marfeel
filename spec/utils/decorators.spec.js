import { number } from '../../public/assets/js/utils/decorators.js';

describe('decorators', () => {
  it('format number with a dot every 3 digits starting by the end', () => {
    expect(number(123456789)).toEqual('123.456.789');
    expect(number(123456789.12)).toEqual('123.456.789,12');
  })
});