import { useState, useEffect, useRef } from 'react';

const fadeTime = 3000;
export const useOrdersCounter = () => {
  const [completedQueue, setCompletedQueue] = useState([]);
  const [shiftTimer, setShiftTimer] = useState(Date.now());
  const shiftTimerRef: any = useRef(null);

  // start timer if it was mot started yet
  useEffect(() => {
    if (shiftTimerRef.current === null && completedQueue.length != 0) {
      console.log('starting timer')
      startTimer();
    }
  }, [completedQueue]);

  // shift first order out of the coffee counter (it has been picked up)
  useEffect(() => {
    shiftTimerRef.current = null;
    removeCompleted();
  }, [shiftTimer]);

  function startTimer() {
    shiftTimerRef.current = setTimeout(() => {
      setShiftTimer(Date.now)
    }, fadeTime);
  }

  const addToCompletedQueue: any = (newCompletedOrder: any) => {
    // if there are no timers, add a single item...which will then start a new timer. 
    if (shiftTimerRef.current === null ) {
      setCompletedQueue([].concat(newCompletedOrder));
    }
    else {
      setCompletedQueue(completedQueue.concat(newCompletedOrder));
    }
  }

  function removeCompleted() {
    let newQueue = JSON.parse(JSON.stringify(completedQueue));
    newQueue.shift();
    setCompletedQueue(newQueue);
  }

  return [completedQueue, addToCompletedQueue]
}