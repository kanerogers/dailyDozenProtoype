// @flow
import moment from 'moment';
import SERVING_DATA from './data';

export type ServingKey =
  | 'beans'
  | 'berries'
  | 'other_fruits'
  | 'cruciferous_vegetables'
  | 'greens'
  | 'flaxseeds'
  | 'nuts'
  | 'spices'
  | 'whole_grains'
  | 'beverages'
  | 'exercise'
  | 'other_vegetables';

export const ServingKeys: Array<ServingKey> = [
  'beans',
  'berries',
  'other_fruits',
  'cruciferous_vegetables',
  'greens',
  'other_vegetables',
  'flaxseeds',
  'nuts',
  'spices',
  'whole_grains',
  'beverages',
  'exercise',
];

const maxServingsForKey = (key: ServingKey): number => SERVING_DATA[key].dailyServings;

export type ServingProgress = {
  total: number,
  [ServingKey]: number,
};

export type AppState = {
  [string]: ServingProgress,
};

export type AppAction =
  | {
      type: 'INCREMENT_SERVING',
      key: ServingKey,
    }
  | {
      type: 'DECREMENT_SERVING',
      key: ServingKey,
    };

const buildAppState = (): ServingProgress =>
  ServingKeys.reduce((result, key) => ({ ...result, [key]: 0 }), { total: 0 });

const TODAY = moment().format('YYYY-MM-DD');

const INITIAL_STATE: AppState = {
  [TODAY]: buildAppState(),
};

export default (state: AppState = INITIAL_STATE, action: AppAction): AppState => {
  switch (action.type) {
    case 'INCREMENT_SERVING': {
      const progress = state[TODAY];
      const { key } = action;

      const currentServingsForKey = progress[key];

      if (currentServingsForKey >= maxServingsForKey(key)) {
        return state;
      }

      const updatedProgress = {
        ...progress,
        total: progress.total + 1,
        [key]: progress[key] + 1,
      };

      return {
        ...state,
        [TODAY]: updatedProgress,
      };
    }
    case 'DECREMENT_SERVING': {
      const progress = state[TODAY];
      const { key } = action;

      const currentServingsForKey = progress[key];

      if (currentServingsForKey === 0) {
        return state;
      }

      const updatedProgress = {
        ...progress,
        total: progress.total - 1,
        [key]: progress[key] - 1,
      };

      return {
        ...state,
        [TODAY]: updatedProgress,
      };
    }
    default: {
      return state;
    }
  }
};
