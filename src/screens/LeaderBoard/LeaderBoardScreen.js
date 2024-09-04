import { View, Text } from 'react-native'
import React from 'react'
import MainContainer from '../../component/MainContainer';
import { CustomText } from '../../component/Text';
import { Colors } from '../../utilities/colors';

const LeaderBoardScreen = () => {
  return (
    <MainContainer>
      <View style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',}}>
          <CustomText text={"LeaderBoard Screen"} color={Colors.White}/>
      </View>
      
    </MainContainer>
  )
}

export default LeaderBoardScreen