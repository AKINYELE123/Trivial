

import React, { memo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from '../utilities/colors';
import { ImageBackground } from 'react-native';

const MainContainer = memo(({ children }) => {


    return (
      
        <View style={{ flex: 1, backgroundColor: 'blue', }}>
        <ImageBackground
            source={require('../assets/Images/setIcons.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.OverlayBackground} />
           <View style={styles.container}>
           {children}
           </View>
        </ImageBackground>

    </View>
    );
})

export default MainContainer;


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    OverlayBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.Blue,
        opacity: 0.75,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    }
})

