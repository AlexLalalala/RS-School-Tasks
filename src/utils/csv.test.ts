import { createMockDeal } from '../__tests__/factories';
import { generateCsv } from './csv';

const mockedDeal = createMockDeal({ dealId: '1', title: 'Hades II' });

describe('csv utils', () => {
  it('generates correct header', () => {
    const csv = generateCsv([mockedDeal]);

    const header = csv.split('\n')[0];

    expect(header).toBe(
      'Deal ID,Steam ID,Steam URL,Title,Normal Price,Sale Price,Metacritic URL'
    );
  });
  it('escapes commas', () => {
    const csv = generateCsv([createMockDeal({ title: 'Hades, II' })]);

    expect(csv).toContain('"Hades, II"');
  });
  it('escapes quotes', () => {
    const csv = generateCsv([createMockDeal({ title: 'Hades" II' })]);

    expect(csv).toContain('Hades"" II');
  });
  it('generates correct number of rows', () => {
    const csv = generateCsv([mockedDeal, mockedDeal, mockedDeal]);

    const totalNumberRows = csv.split('\n').length;

    expect(totalNumberRows).toBe(4);
  });
});
