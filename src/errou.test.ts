import errou from './errou';

describe('errou', () => {
  describe('when no error is thrown', () => {
    it('returns ok:true when no error is thrown', () => {
      const sut = errou(wontThrow, 1);
      expect(sut.ok).toBe(true);
    });

    it('returns the value returned by the function in the data prop', () => {
      const expected = wontThrow(1).double;
      const sut = errou(wontThrow, 1);
      expect(sut.data?.double).toBe(expected);
    });

    it('returns error:null when ok is true', () => {
      const sut = errou(wontThrow, 1);
      expect(sut.ok).toBe(true);
      expect(sut.error).toBeNull();
    });
  });

  describe('when an error is thrown', () => {
    it('returns ok:false when a error is thrown', () => {
      const sut = errou(willThrow);
      expect(sut.ok).toBe(false);
    });

    it('returns the error throwed by the function in the error prop', () => {
      const sut = errou(willThrow);
      expect(sut.error).toBeInstanceOf(Error);
      expect(sut.error!.message).toBe('err');
    });

    it('returns data:null when ok is false', () => {
      const sut = errou(willThrow);
      expect(sut.ok).toBe(false);
      expect(sut.data).toBeNull();
    });
  });

  describe('async behavior', () => {
    describe('when no error is thrown', () => {
      it('returns ok:true when no error is thrown', async () => {
        const sut = await errou(wontThrowAsync, 1);
        expect(sut.ok).toBe(true);
      });

      it('returns the value returned by the function in the data prop', async () => {
        const expected = (await wontThrowAsync(1)).double;
        const sut = await errou(wontThrowAsync, 1);
        expect(sut.data!.double).toBe(expected);
      });

      it('returns error:null when ok is true', async () => {
        const sut = await errou(wontThrowAsync, 1);
        expect(sut.ok).toBe(true);
        expect(sut.error).toBeNull();
      });
    });

    describe('when an error is thrown', () => {
      it('returns ok:false when a error is thrown', async () => {
        const sut = await errou(willThrowAsync);
        expect(sut.ok).toBe(false);
      });

      it('returns the error throwed by the function in the error prop', async () => {
        const sut = await errou(willThrowAsync);
        expect(sut.error).toBeInstanceOf(Error);
        expect(sut.error!.message).toBe('err');
      });

      it('returns data:null when ok is false', async () => {
        const sut = await errou(willThrowAsync);
        expect(sut.ok).toBe(false);
        expect(sut.data).toBeNull();
      });
    });
  });
});

function wontThrow(a: number) {
  return {
    double: a * 2
  };
}

function willThrow() {
  throw new Error('err');
}

function wontThrowAsync(a: number) {
  return Promise.resolve({
    double: a * 2
  });
}

function willThrowAsync() {
  return Promise.reject(new Error('err'));
}
