import lodash from 'lodash';

const INITIAL_STATE = {
  currentProgress: 0,
  servings: [
    { name: 'Beans', servingSize: 3, currentServings: 0 },
    { name: 'Beverages', servingSize: 2, currentServings: 0 },
    { name: 'Berries', servingSize: 3, currentServings: 0 },
    { name: 'Peas', servingSize: 3, currentServings: 0 },
    { name: 'Rhubarb', servingSize: 3, currentServings: 0 },
    { name: 'Donuts', servingSize: 3, currentServings: 0 },
  ],
};

const getTotalServings = servings =>
  lodash.chain(servings)
    .map('currentServings')
    .sum()
    .value();

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INCREMENT_SERVING': {
      const { servings } = state;
      const { name } = action;
      const index = lodash.findIndex(servings, { name });
      const servingToUpdate = servings[index];
      if (servingToUpdate.servingSize === servingToUpdate.currentServings) { return state; }

      const updatedServing = {
        ...servingToUpdate,
        currentServings: servingToUpdate.currentServings + 1,
      };

      const updatedServings = [
        ...servings.slice(0, index),
        updatedServing,
        ...servings.slice(index + 1),
      ];

      return {
        ...state,
        currentProgress: getTotalServings(updatedServings),
        servings: updatedServings,
      };
    }
    case 'DECREMENT_SERVING': {
      const { servings } = state;
      const { name } = action;
      const index = lodash.findIndex(servings, { name });
      const servingToUpdate = servings[index];
      if (servingToUpdate.currentServings === 0) { return state; }

      const updatedServing = {
        ...servingToUpdate,
        currentServings: servingToUpdate.currentServings - 1,
      };

      const updatedServings = [
        ...servings.slice(0, index),
        updatedServing,
        ...servings.slice(index + 1),
      ];

      return {
        ...state,
        currentProgress: getTotalServings(updatedServings),
        servings: updatedServings,
      };
    }
    default: {
      return state;
    }
  }
};
