import { useEffect, useRef } from 'react';

export function usePrevState(state: unknown) {
  const ref = useRef(state);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref.current;
}

export function josa(word: string) {
  if (typeof word !== 'string') return null;

  const lastLetter = word[word.length - 1];
  const uni = lastLetter?.charCodeAt(0);

  if (uni < 44032 || uni > 55203) return null;

  return (uni - 44032) % 28 != 0;
}

export function mlOzCalc(ml: number) {
  const oz = ml / 30;
  return Math.round(oz * 10) / 10;
}

export function noneScrollPush(url: string, router: any) {
  router.push(url, undefined, { scroll: false });
}
