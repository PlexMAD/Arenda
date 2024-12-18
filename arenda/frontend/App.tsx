import React, { useState } from 'react';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import Main from './components/Main';
import NavigateStack from './navigation';
const fonts = () => Font.loadAsync({
  'Montserrat': require('./assets/fonts/Montserrat-Bold.ttf')
})

export default function App() {
  const [fontLoadead, setFontLoaded] = useState<Boolean>(false);
  if (fontLoadead) {
    return (
      <NavigateStack></NavigateStack>
    );
  }
  else {
    return (
      <AppLoading startAsync={fonts} onFinish={() => setFontLoaded(true)} onError={console.warn} />
    )
  }

}

