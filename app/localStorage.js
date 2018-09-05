export const loadState = () => {
 // debugger;
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
        //console.log(err, 'Load State Error');
    return undefined;
  }
};

export const saveState = (state) => {
 // debugger;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    //console.log(err, 'Save State Error');
  }
};
