// HELPER TYPES
// ============

type MaybeUnknownPromise = Promise<unknown> | unknown;
type FunctionType = (...args: any[]) => MaybeUnknownPromise;
type Await<T> = T extends Promise<infer U> ? U : T;

// RESULT TYPES
// ============

type Ok<D> = { ok: true; data: D; error: null };
type NotOk<E> = { ok: false; data: null; error: E };
type Status<D, E> = Ok<D> | NotOk<E>;

type Result<D extends MaybeUnknownPromise, E> = D extends Promise<any>
  ? Promise<Status<Await<D>, E>>
  : Status<D, E>;

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

export default function errou<
  Fn extends FunctionType = FunctionType,
  E = unknown,
  R = ReturnType<Fn>
>(fn: Fn, ...args: Parameters<Fn>): Result<R, E> {
  try {
    const returnedValue = fn(...args) as R;

    if (returnedValue instanceof Promise) {
      const promise: Promise<Status<R, E>> = new Promise((resolve) => {
        returnedValue
          .then((data) => resolve(ok(data)))
          .catch((error) => resolve(notOk(error)));
      });

      return promise as Result<R, E>; // must cast
    }

    const result: Status<R, E> = ok(returnedValue);
    return result as Result<R, E>; // must cast
  } catch (error) {
    const errorResult: Status<null, E> = notOk(error as E);
    return errorResult as Result<R, E>; // must cast
  }
}
