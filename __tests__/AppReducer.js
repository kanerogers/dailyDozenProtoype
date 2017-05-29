import { createStore } from 'redux';
import moment from 'moment';

import AppReducer from '../App/AppReducer';

it('returns the initial state', () => {
  const store = createStore(AppReducer);
  const newState = store.dispatch({ type: 'OH YEAH' });
  expect(newState).toMatchSnapshot();
});

const TODAY = moment().format('YYYY-MM-DD');

describe('INCREMENT_SERVING', () => {
  it('increments a serving if it is less than the servingSize', () => {
    const store = createStore(AppReducer);
    store.dispatch({ type: 'INCREMENT_SERVING', key: 'beans' });

    const newState = store.getState();
    const progress = newState[TODAY];
    const { beans } = progress;

    expect(beans).toEqual(1);
  });

  it('does nothing if the serving is already at its dailyServings', () => {
    const store = createStore(AppReducer);
    store.dispatch({ type: 'INCREMENT_SERVING', key: 'beans' });
    store.dispatch({ type: 'INCREMENT_SERVING', key: 'beans' });
    store.dispatch({ type: 'INCREMENT_SERVING', key: 'beans' });

    let state = store.getState();
    let progress = state[TODAY];

    expect(progress.beans).toEqual(3);
    store.dispatch({ type: 'INCREMENT_SERVING', key: 'beans' });

    state = store.getState();
    progress = state[TODAY];

    expect(progress.beans).toEqual(3);
  });
});

describe('DECREMENT_SERVING', () => {
  it('does nothing if a serving is at zero', () => {
    const store = createStore(AppReducer);
    store.dispatch({ type: 'DECREMENT_SERVING', key: 'beans' });

    const state = store.getState();
    const progress = state[TODAY];

    expect(progress.beans).toEqual(0);
  });

  it('increments a serving if it is greater than zero', () => {
    const store = createStore(AppReducer);
    store.dispatch({ type: 'INCREMENT_SERVING', key: 'beans' });

    let state = store.getState();
    let progress = state[TODAY];
    expect(progress.beans).toEqual(1);

    store.dispatch({ type: 'DECREMENT_SERVING', key: 'beans' });
    state = store.getState();
    progress = state[TODAY];
    expect(progress.beans).toEqual(0);
  });
});
