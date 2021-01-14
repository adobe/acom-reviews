// Add a single value to an average and return the new average
const addToAverage = (val, currentAvg, totalCount) =>
    (val - currentAvg) / totalCount + currentAvg;

// Differentiate between a mouse click on a radio button vs a keyboard navigation
const isRadioMouseClick = (ev) => ev.clientX !== 0 || ev.clientY !== 0;

export { addToAverage, isRadioMouseClick };
