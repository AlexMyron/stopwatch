const displayTimer = (time) => {
  const sec = ("0" + (time % 60)).slice(-2);
  const min = ("0" + Math.floor((time / 60) % 60)).slice(-2);
  const hrs = ("0" + Math.floor(time / 3600)).slice(-2);

  return [hrs, min, sec].join(":");
};

export default displayTimer;
