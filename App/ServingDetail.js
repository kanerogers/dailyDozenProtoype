import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import STYLE from './Style';

const BEANS_URL = 'https://github.com/nutritionfactsorg/daily-dozen-android/blob/master/app/src/main/res/drawable-nodpi/beans.png?raw=true';

const ServingDetail = () =>
  <ScrollView style={STYLE.outerContainer}>
    <Image source={{ uri: BEANS_URL }} style={STYLE.detailImage} />

    <View style={STYLE.subContainer}>
      <Text style={STYLE.header}>Serving sizes</Text>
      <Text>1/4 cup of hummus or bean dip</Text>
      <Text>1/2 cup of cooked beans, split peas, lentils, tofu or tempeh</Text>
      <Text>1 cup of fresh peas or sprouted lentils</Text>
    </View>

    <View style={STYLE.subContainer}>
      <Text style={STYLE.header}>Types</Text>
      <Text>Black beans</Text>
      <Text>Black-eyed peas</Text>
      <Text>Butter beans</Text>
    </View>
  </ScrollView>;

export default ServingDetail;
