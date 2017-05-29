// @flow
/* eslint react/no-unescaped-entities: 0 */
/* eslint react/no-array-index-key: 0 */
/* eslint newline-per-chained-call: 0 */

import React from 'react';
import { connect } from 'react-redux';
import { LayoutAnimation, ScrollView, Text, View, Dimensions } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import SERVING_DATA from './data';

import type { ServingProgress, ServingKey, AppAction } from './AppReducer';

import Serving from './Serving';
import STYLE from './Style';

const { width } = Dimensions.get('window');

const getProgressBarWidth = (currentProgress = 6) => ({
  width: (width - 16) * (currentProgress / 24),
});
const TODAY = moment().format('YYYY-MM-DD');
const getProgress = (progress: ServingProgress, type: string): number => {
  if (type === 'food') {
    return _.chain(progress).omit(['total', 'exercise', 'beverages']).values().sum().value();
  }

  if (type === 'beverages') {
    return _.chain(progress).pick(['beverages']).values().sum().value();
  }
  if (type === 'exercise') {
    return _.chain(progress).pick(['exercise']).values().sum().value();
  }

  return 0;
};

type Props = {
  progress: ServingProgress,
  incrementServing: ServingKey => void,
  decrementServing: ServingKey => void,
};

const Homescreen = ({ progress, incrementServing, decrementServing }: Props) => (
  <ScrollView containerStyle={STYLE.container} style={STYLE.outerContainer}>
    <View style={STYLE.subContainer}>
      <Text style={STYLE.header}>Today's progress</Text>

      <View style={[STYLE.progressBar, getProgressBarWidth(progress.total)]} />
      <View style={STYLE.progressBarRemaining} />

      <View style={STYLE.progressBoxContainer}>
        <View style={STYLE.progressBox}>
          <Text style={STYLE.subHeader}>{getProgress(progress, 'food')}/8</Text>
          <Text style={STYLE.bodyText}>Food</Text>
        </View>

        <View style={STYLE.progressBox}>
          <Text style={STYLE.subHeader}>{getProgress(progress, 'beverages')}/8</Text>
          <Text style={STYLE.bodyText}>Beverages</Text>
        </View>

        <View style={STYLE.progressBox}>
          <Text style={STYLE.subHeader}>{getProgress(progress, 'exercise')}/8</Text>
          <Text style={STYLE.bodyText}>Exercises</Text>
        </View>
      </View>
    </View>

    {_.chain(progress)
      .omit(['total'])
      .map((currentProgress: number, key: ServingKey) => (
        <Serving
          key={key}
          incrementServing={incrementServing}
          decrementServing={decrementServing}
          currentProgress={currentProgress}
          dailyServings={SERVING_DATA[key].dailyServings}
          name={SERVING_DATA[key].name}
          servingKey={key}
        />
      ))
      .value()}

  </ScrollView>
);

type StateProps = {
  progress: ServingProgress,
};

const mapStateToProps = (AppState): StateProps => ({
  progress: AppState[TODAY],
});

type DispatchProps = {
  incrementServing: ServingKey => void,
  decrementServing: ServingKey => void,
};

type Dispatch = AppAction => {};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  incrementServing: (key: ServingKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dispatch({ type: 'INCREMENT_SERVING', key });
  },
  decrementServing: (key: ServingKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dispatch({ type: 'DECREMENT_SERVING', key });
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null)(Homescreen);
