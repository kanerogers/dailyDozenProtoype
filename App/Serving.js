// @flow
import React from 'react';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, Image, Text, View, Dimensions } from 'react-native';

import STYLE from './Style';
import type { ServingKey } from './AppReducer';

const { width } = Dimensions.get('window');
const getFoodBarWidth = (currentProgress: number, dailyServings) => ({
  width: (width - 178) * (currentProgress / dailyServings),
});

const BEANS_URL =
  'https://raw.githubusercontent.com/nutritionfactsorg/daily-dozen-android/master/app/src/main/res/drawable-xxxhdpi/ic_beans.png';

const isCompleted = (currentServings: number, dailyServings: number): boolean =>
  currentServings === dailyServings && STYLE.completedFoodContainer;

type Props = {
  servingKey: ServingKey,
  currentProgress: number,
  name: string,
  dailyServings: number,
  incrementServing: ServingKey => void,
  decrementServing: ServingKey => void,
};

const Serving = ({
  servingKey,
  name,
  dailyServings,
  currentProgress,
  incrementServing,
  decrementServing,
}: Props) => (
  <View
    style={[STYLE.subContainer, STYLE.foodContainer, isCompleted(currentProgress, dailyServings)]}
  >
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 0, width: width - 114 }}
      onPress={() => Actions.ServingDetail({ servingKey, title: name, name })}
    >
      <View style={STYLE.foodImageContainer}>
        <Image source={{ uri: BEANS_URL }} style={STYLE.foodImage} />
      </View>

      <View style={STYLE.foodSubContainer}>
        <Text style={STYLE.subHeader}>{name}</Text>

        <View
          style={[
            STYLE.progressBar,
            STYLE.foodProgressBar,
            getFoodBarWidth(currentProgress, dailyServings),
          ]}
        />
        <View style={[STYLE.progressBarRemaining, STYLE.foodProgressBarRemaining]} />

        <Text style={STYLE.bodyText}>
          {currentProgress}/{dailyServings} Servings
        </Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={STYLE.minusButton} onPress={() => decrementServing(servingKey)}>
      <Text style={STYLE.minusButtonText}>-</Text>
    </TouchableOpacity>
    <TouchableOpacity style={STYLE.plusButton} onPress={() => incrementServing(servingKey)}>
      <Text style={STYLE.plusButtonText}>+</Text>
    </TouchableOpacity>
  </View>
);

export default Serving;
