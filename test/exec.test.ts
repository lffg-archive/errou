import { execSync } from '../src/errou';

describe('exec', () => {
  describe('sync', () => {
    it('should handle a value', () => {
      const [err, val] = execSync(5);
      expect(val).toBe(5);
      expect(err).toBeNull();
    });

    it('should handle a function that returns a value', () => {
      const [err, val] = execSync(() => 5);
      expect(val).toBe(5);
      expect(err).toBeNull();
    });

    it('should handle an error in a function', () => {
      const [err, val] = execSync(() => {
        throw new Error('A');
      });

      expect(val).toBeUndefined();
      expect(err instanceof Error).toBe(true);
      expect(err).toHaveProperty('message', 'A');
    });
  });
});
