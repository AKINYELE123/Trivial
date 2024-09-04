import { View, Text } from 'react-native'
import React from 'react'
import MainContainer from '../../component/MainContainer';
import { Colors } from '../../utilities/colors';
import { CustomText } from '../../component/Text';

const SettingsScreen = () => {
  return (
    <MainContainer>
      <View style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',}}>
          <CustomText text={"Settings Screen"} color={Colors.White}/>
      </View>
    </MainContainer>
  )
}

export default SettingsScreen