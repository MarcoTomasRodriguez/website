import { useEffect, useState } from "react";
import { fromEvent } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
} from "rxjs/operators";

enum Direction {
  Up,
  Down,
}

const useScrollableHide = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // window.scroll observable.
    const scroll$ = fromEvent(window, "scroll").pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]) => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    // On scroll up, set hidden to false.
    scroll$
      .pipe(filter((direction) => direction == Direction.Up))
      .subscribe(() => setHidden(() => false));

    // On scroll down, set hidden to true.
    scroll$
      .pipe(filter((direction) => direction == Direction.Down))
      .subscribe(() => setHidden(() => true));
  }, []);

  return hidden;
};

export default useScrollableHide;
