import fileToBase64 from './fileToBase64';

describe('fileToBase64', () => {
  it('resolves with a base64 data URL for a text file', async () => {
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    const result = await fileToBase64(file);
    expect(result).toMatch(/^data:text\/plain;base64,/);
  });

  it('encodes file content correctly', async () => {
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    const result = await fileToBase64(file);
    expect(result).toBe('data:text/plain;base64,aGVsbG8=');
  });
});
