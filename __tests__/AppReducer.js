import { createStore } from 'redux';
import lodash from 'lodash';
import AppReducer from '../App/AppReducer';

it('returns the initial state', () => {
  const store = createStore(AppReducer);
  const newState = store.dispatch({ type: 'OH YEAH' });
  expect(newState).toMatchSnapshot();
});

describe('INCREMENT_SERVING', () => {
  it('increments a serving if it is less than the servingSize', () => {
    const store = createStore(AppReducer);
    store.dispatch({ type: 'INCREMENT_SERVING', name: 'Beans' });

    const newState = store.getState();
    const { servings } = newState;
    const beans = lodash.find(servings, { name: 'Beans' });

    expect(beans.currentServings).toEqual(1);
  });

  it('does nothing if the serving is already at servingSize', () => {
    const store = createStore(AppReducer);
    store.dispatch({ type: 'INCREMENT_SERVING', name: 'Beans' });
    store.dispatch({ type: 'INCREMENT_SERVING', name: 'Beans' });
    store.dispatch({ type: 'INCREMENT_SERVING', name: 'Beans' });

    const newState = store.getState();
    const { servings } = newState;
    const beans = lodash.find(servings, { name: 'Beans' });

    expect(beans.currentServings).toEqual(3);

    store.dispatch({ type: 'INCREMENT_SERVING', name: 'Beans' });
    const finalState = store.getState();
    expect(finalState).toEqual(newState);
  });
});

describe('DECREMENT_SERVING', () => {
  it('does nothing if a serving is at zero', () => {
    const store = createStore(AppReducer);
    store.dispatch({ type: 'DECREMENT_SERVING', name: 'Beans' });

    const newState = store.getState();
    const { servings } = newState;
    const beans = lodash.find(servings, { name: 'Beans' });

    expect(beans.currentServings).toEqual(0);
  });

  it('increments a serving if it is greater than zero', () => {
    const store = createStore(AppReducer);
    store.dispatch({ type: 'INCREMENT_SERVING', name: 'Beans' });

    const newState = store.getState();
    const { servings } = newState;
    const beans = lodash.find(servings, { name: 'Beans' });

    expect(beans.currentServings).toEqual(1);

    store.dispatch({ type: 'DECREMENT_SERVING', name: 'Beans' });
    const finalState = store.getState();
    const finalServings = finalState.servings;
    const finalBeans = lodash.find(finalServings, { name: 'Beans' });

    expect(finalBeans.currentServings).toEqual(0);
  });
});
