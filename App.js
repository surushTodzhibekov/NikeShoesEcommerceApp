import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { images, icons, COLORS, FONTS, SIZES } from './constants';

import {StackNavigation} from "./navigation/Navigate";

const fetchFonts = () => {
  return Font.loadAsync({
    "CarmenSans-SemiBold": require("./assets/fonts/CarmenSans-SemiBold.otf"),
    "CarmenSans-Thin": require("./assets/fonts/CarmenSans-Thin.otf"),
    "CarmenSans-Regular": require("./assets/fonts/CarmenSans-Regular.otf"),
    "CocoGothic": require("./assets/fonts/CocoGothic.ttf"),
    "CocoGothic-Bold": require("./assets/fonts/CocoGothic-Bold.ttf"),
  });
};

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

export default function App() {
   const [fontLoaded, setFontLoaded] = useState(false);
   if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <NavigationContainer theme={theme}>
      <StackNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
