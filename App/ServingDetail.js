// @flow
import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import STYLE from './Style';
import SERVING_DATA from './data';
import type { ServingKey } from './AppReducer';

const BEANS_URL =
  'https://github.com/nutritionfactsorg/daily-dozen-android/blob/master/app/src/main/res/drawable-nodpi/beans.png?raw=true';

type Props = {
  name: string,
  servingKey: ServingKey,
};

type ListItemProps = {
  text: string,
};

const ListItem = ({ text }: ListItemProps) => (
  <View style={STYLE.listItemContainer}>
    <Text style={STYLE.listItem}>{text}</Text>
    <View style={STYLE.underline} />
  </View>
);

const ServingDetail = ({ servingKey, name }: Props) => (
  <ScrollView style={STYLE.outerContainer}>
    <Image source={{ uri: BEANS_URL }} style={STYLE.detailImage} />

    <View style={STYLE.subContainer}>
      <Text style={[STYLE.header, STYLE.listItemContainer]}>Serving sizes</Text>
      {SERVING_DATA[servingKey].servingSuggestions.map(servingSuggestion => (
        <ListItem key={servingSuggestion} text={servingSuggestion} />
      ))}
    </View>

    <View style={STYLE.subContainer}>
      <Text style={[STYLE.header, STYLE.listItemContainer]}>Types of {name}</Text>
      {SERVING_DATA[servingKey].types.map(type => <ListItem key={type} text={type} />)}
    </View>
  </ScrollView>
);

export default ServingDetail;
