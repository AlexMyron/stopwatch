import { useState, useEffect } from "react";
import { Observable } from "rxjs";
import Button from "@mui/material/Button";
import { Wrapper, Display, BtnWrapper } from "./Stopwatch.styled";
import displayTimer from "../../utils";

const StopWatch = () => {
  const [timerState, setTimerState] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [pauseClick, setPauseClick] = useState(1);

  let interval = null;

  const doubleClickStream$ = new Observable((observer) => {
    observer.next(setPauseClick((state) => state + 1));
    if (pauseClick === 1) {
      setTimeout(() => {
        observer.next(setPauseClick(1));
      }, 350);
    }

    if (pauseClick === 2) {
      observer.next(setIsTimerOn(false));
    }
  });

  const handleWaitClick = () => {
    doubleClickStream$.subscribe();
  };

  const handleResetClick = () => {
    setTimerState(0);
    setIsTimerOn(false);
  };

  const handleStartClick = () => {
    if (isTimerOn) {
      setIsTimerOn(false);
    } else {
      setIsTimerOn(true);
      setPauseClick(1);
    }
  };

  const stream$ = new Observable((observer) => {
    isTimerOn &&
      (interval = setInterval(() => {
        observer.next(setTimerState((state) => state + 1));
      }, 1000));
  });

  useEffect(() => {
    stream$.subscribe();

    return () => clearInterval(interval);
  }, [interval, isTimerOn]);

  const joinedTime = displayTimer(timerState);

  return (
    <Wrapper>
      <Display>{joinedTime}</Display>
      <BtnWrapper>
        <Button type='button' variant='contained' onClick={handleStartClick}>
          Start/Stop
        </Button>
        <Button type='button' variant='contained' onClick={handleWaitClick}>
          Wait
        </Button>
        <Button type='button' variant='contained' onClick={handleResetClick}>
          Reset
        </Button>
      </BtnWrapper>
    </Wrapper>
  );
};

export default StopWatch;
