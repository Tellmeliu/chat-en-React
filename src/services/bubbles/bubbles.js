import { BehaviorSubject, of, Subject } from "rxjs";
import { concatMap, delay, scan } from "rxjs/operators";
import { bubbleEvent, bubblePosition } from "./types";
import moment from "moment";

const bubbleEvents$ = new Subject();

const _bubbles$ = new BehaviorSubject([]);

export const bubbles$ = _bubbles$.asObservable();

bubbleEvents$
  .pipe(
    scan((acc, nextEvent) => {
      if (nextEvent.event === bubbleEvent.ADD) {
        return [
          ...acc,
          {
            ...nextEvent.bubble,
            timestamp: moment().format("hh:mm:ss A")
          }
        ];
      }
      if (nextEvent.event === bubbleEvent.POP) {
        acc.pop();
        return acc;
      }
      if (nextEvent.event === bubbleEvent.RESET) {
        return [];
      }
    }, []),
    concatMap((x) => of(x).pipe(delay(233)))
  )
  .subscribe((bubbles) => _bubbles$.next(bubbles));

export const addLeftBubble = (content, avatar) => {
  bubbleEvents$.next({
    event: bubbleEvent.ADD,
    bubble: {
      position: bubblePosition.LEFT,
      content,
      avatar
    }
  });
};
export const addRightBubble = (
  content,
  options = { avatar: null, sticker: false }
) => {
  bubbleEvents$.next({
    event: bubbleEvent.ADD,
    bubble: {
      position: bubblePosition.RIGHT,
      content,
      avatar: options.avatar,
      sticker: options.sticker
    }
  });
};
export const popBubble = () => {
  bubbleEvents$.next({
    event: bubbleEvent.POP
  });
};

export const cheer = () => {
  bubbleEvents$.next({
    event: bubbleEvent.ADD,
    bubble: {
      type: bubbleEvent.CHEER
    }
  });
};

export const resetBubbles = () => {
  bubbleEvents$.next({
    event: bubbleEvent.RESET
  });
};