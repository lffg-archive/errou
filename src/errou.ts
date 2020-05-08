// HELPER TYPES
// ============

type Func<R> = (...args: any[]) => R;
type Await<T> = T extends Promise<infer U> ? U : T;

// RESULT TYPES
// ============

export type Ok<D> = { ok: true; data: D; error: null };
export type NotOk<E> = { ok: false; data: null; error: E };
export type Status<D, E> = Ok<D> | NotOk<E>;

// HELPER FUNCTIONS
// ================

function ok<D>(data: D): Ok<D> {
  return { ok: true, error: null, data };
}

function notOk<E>(error: E): NotOk<E> {
  return { ok: false, error, data: null };
}

// MAIN API
// ========

/**
 * When errou receives a function that returns a Promise, it will return `Status`
 * wrapped in a Promise.
 */
export default function errou<Fn extends Func<Promise<unknown>>>(
  fn: Fn,
  ...args: Parameters<Fn>
): Promise<Status<Await<ReturnType<Fn>>, unknown>>;

/**
 * When errou receives a function that returns anything but a Promise, it will
 * return `Status`.
 */
export default function errou<Fn extends Func<unknown>>(
  fn: Fn,
  ...args: Parameters<Fn>
): Status<ReturnType<Fn>, unknown>;

export default function errou<RT>(
  fn: Func<Promise<RT>> | Func<RT>,
  ...args: Parameters<typeof fn>
):
  | Status<ReturnType<typeof fn>, unknown>
  | Promise<Status<Await<ReturnType<typeof fn>>, unknown>> {
  try {
    const returnedValue = fn(...args);

    if (returnedValue instanceof Promise) {
      const prom: Promise<Status<RT, unknown>> = returnedValue
        .then(ok)
        .catch((error: unknown) => notOk(error));

      return prom;
    }

    return ok(returnedValue);
  } catch (error) {
    const errorResult: NotOk<unknown> = notOk(error);
    return errorResult;
  }
}
