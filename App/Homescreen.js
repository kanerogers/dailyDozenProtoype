import React from 'react';
import { connect } from 'react-redux';
import { LayoutAnimation, ScrollView, Text, View, Dimensions } from 'react-native';

import Serving from './Serving';
import STYLE from './Style';

const { width } = Dimensions.get('window');

const getProgressBarWidth = (currentProgress = 6) => ({
  width: (width - 16) * (currentProgress / 24),
});

const Homescreen = ({ currentProgress, servings, incrementServing, decrementServing }) =>
  <ScrollView containerStyle={STYLE.container} style={STYLE.outerContainer}>
    <View style={STYLE.subContainer}>
      <Text style={STYLE.header}>Today&apos;s progress</Text>

      <View style={[STYLE.progressBar, getProgressBarWidth(currentProgress)]} />
      <View style={STYLE.progressBarRemaining} />

      <View style={STYLE.progressBoxContainer}>
        <View style={STYLE.progressBox}>
          <Text style={STYLE.subHeader}>{currentProgress}/8</Text>
          <Text style={STYLE.bodyText}>Food</Text>
        </View>

        <View style={STYLE.progressBox}>
          <Text style={STYLE.subHeader}>0/8</Text>
          <Text style={STYLE.bodyText}>Beverages</Text>
        </View>

        <View style={STYLE.progressBox}>
          <Text style={STYLE.subHeader}>0/8</Text>
          <Text style={STYLE.bodyText}>Exercises</Text>
        </View>
      </View>
    </View>

    { servings.map(serving => <Serving
      key={serving.name}
      incrementServing={incrementServing}
      decrementServing={decrementServing}
      {...serving}
    />) }

  </ScrollView>;

Homescreen.propTypes = {
  servings: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  currentProgress: React.PropTypes.number.isRequired,
  incrementServing: React.PropTypes.func.isRequired,
  decrementServing: React.PropTypes.func.isRequired,
};


const mapStateToProps = ({ servings, currentProgress }) => ({
  currentProgress,
  servings,
});
const mapDispatchToProps = dispatch => ({
  incrementServing: (name) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dispatch({ type: 'INCREMENT_SERVING', name });
  },
  decrementServing: (name) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    dispatch({ type: 'DECREMENT_SERVING', name });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
