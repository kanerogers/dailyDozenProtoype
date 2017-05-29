// @flow
import fs from 'fs';
import xml2js from 'xml2js';
import _ from 'lodash';
import { ServingKeys } from '../App/AppReducer';
import type { ServingData } from '../App/data';

// Pretty ugly, but it works.
type XMLNode = {
  $: {
    'name': string,
  },
  item: Array<string>,
};

type XMLData = Array<XMLNode>;

const parser = xml2js.Parser();

// This is a little gross, but basically we inspect the output we get from
// xml2js and try to get an array that matches the key we want.
const getFromXML = (xmlData: XMLData, key: string): Array<string> =>
  (_.find(xmlData, r => r.$.name === key) || {}).item;

const getDailyServings = (integerArray: XMLData): Array<number> =>
  getFromXML(integerArray, 'food_quantities').map(s => parseInt(s, 10));

const getNames = (stringArray: XMLData): Array<string> => getFromXML(stringArray, 'food_id_names');

const getServingSuggestionsForKey = (key: string, stringArray: XMLData): Array<string> =>
  getFromXML(stringArray, `food_info_serving_sizes_${key}`);

const getServingtypesForKey = (key: string, stringArray: XMLData): Array<string> =>
  getFromXML(stringArray, `food_info_types_${key}`);

const getServingTypes = (stringArray: XMLData): Array<Array<string>> =>
  ServingKeys.map(key => getServingtypesForKey(key, stringArray));

const getServingSuggestions = (stringArray: XMLData): Array<Array<string>> =>
  ServingKeys.map(key => getServingSuggestionsForKey(key, stringArray));

export default (): Promise<ServingData> =>
  new Promise((resolve, reject) => {
    fs.readFile('./contrib/strings.xml', (fsErr, fsData) => {
      if (fsErr) {
        reject(fsErr);
        return;
      }

      parser.parseString(fsData, (xmlErr: Error, data) => {
        if (xmlErr) {
          reject(xmlErr);
          return;
        }

        const { resources } = data;
        const stringArray = resources['string-array'];
        const integerArray = resources['integer-array'];

        const dailyServings = getDailyServings(integerArray);
        const types = getServingTypes(stringArray);
        const names = getNames(stringArray);
        const servingSuggestions = getServingSuggestions(stringArray);

        const servings = ServingKeys.reduce(
          (result, key, i) => ({
            ...result,
            [key]: {
              name: names[i],
              types: types[i],
              dailyServings: dailyServings[i],
              servingSuggestions: servingSuggestions[i],
            },
          }),
          {},
        );

        resolve(servings);
      });
    });
  });
