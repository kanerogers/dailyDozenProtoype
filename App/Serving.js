import React from 'react';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, Image, Text, View, Dimensions } from 'react-native';

import STYLE from './Style';

const { width } = Dimensions.get('window');
const getFoodBarWidth = (servingSize, currentServings) => ({
  width: (width - 178) * (currentServings / servingSize),
});

const BEANS_URL = 'https://raw.githubusercontent.com/nutritionfactsorg/daily-dozen-android/master/app/src/main/res/drawable-xxxhdpi/ic_beans.png';

const isCompleted = (servingSize, currentServings) =>
  servingSize === currentServings && STYLE.completedFoodContainer;

const Serving = ({ name, servingSize, currentServings, incrementServing, decrementServing }) =>
  <View
    style={[
      STYLE.subContainer,
      STYLE.foodContainer,
      isCompleted(servingSize, currentServings),
    ]}
  >
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 0, width: width - 114 }}
      onPress={() => Actions.ServingDetail({ name, title: name })}
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
            getFoodBarWidth(servingSize, currentServings),
          ]}
        />
        <View style={[STYLE.progressBarRemaining, STYLE.foodProgressBarRemaining]} />

        <Text style={STYLE.bodyText}>{currentServings}/{servingSize} Servings</Text>
      </View>
    </TouchableOpacity>


    <TouchableOpacity style={STYLE.minusButton} onPress={() => decrementServing(name)}>
      <Text style={STYLE.minusButtonText}>-</Text>
    </TouchableOpacity>
    <TouchableOpacity style={STYLE.plusButton} onPress={() => incrementServing(name)}>
      <Text style={STYLE.plusButtonText}>+</Text>
    </TouchableOpacity>
  </View>;

Serving.propTypes = {
  name: React.PropTypes.string.isRequired,
  servingSize: React.PropTypes.number.isRequired,
  currentServings: React.PropTypes.number.isRequired,
  incrementServing: React.PropTypes.func.isRequired,
  decrementServing: React.PropTypes.func.isRequired,
};

export default Serving;
