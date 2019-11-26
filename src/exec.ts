// TODO.
// export async function exec(fn: any) {}

type Fn<T = any> = (...args: any) => T;

function isFn<T = any>(fn: any): fn is Fn<T> {
  return typeof fn === 'function';
}

// TODO(lffg): Add TypeScript types.
export function execSync<T = any, E = Error>(
  arg: any
): [E | null, T | undefined] {
  try {
    const data = isFn(arg) ? arg() : arg;
    return [null, data];
  } catch (error) {
    return [error, undefined];
  }
}
