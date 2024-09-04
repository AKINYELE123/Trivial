import React, { useEffect, useReducer, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated';
import Home from "../assets/svgs/Home.svg"
import Wallet from "../assets/svgs/Wallet.svg"
import Store from "../assets/svgs/Store.svg"
import Setting from "../assets/svgs/Setting.svg"
import Trophy from "../assets/svgs/Trophy.svg"
import HomeScreen from "../screens/Home/HomeScreen"

import { enableScreens } from 'react-native-screens';
import { Colors } from '../utilities/colors';
import WalletScreen from '../screens/Wallet/WalletScreen';
import StoreScreen from '../screens/Store/StoreScreen';
import LeaderBoardScreen from '../screens/LeaderBoard/LeaderBoardScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import HomeNavigation from './HomeNavigator';
enableScreens();


const BottomNavigationBar = () => {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            borderTopWidth: 0, 
            elevation: 0, 
          },
          tabBarBackground: () => null,
        }}
       tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ ref }) => (
              <Svg ref={ref} width={36} height={36} viewBox="0 0 36 36">
                <Home />
              </Svg>
            ),
            tabBarLabel: 'Home'
          }}
          component={HomeNavigation}
        />
        <Tab.Screen
          name="Wallet"
          options={{
            headerShown: false,
            tabBarIcon: ({ ref }) => (
              <Svg ref={ref} width={36} height={36} viewBox="0 0 36 36">
                <Wallet />
              </Svg>
            ),
            tabBarLabel: 'Wallet'
          }}
          component={WalletScreen}
        />
        <Tab.Screen
          name="Store"
          options={{
            headerShown: false,
            tabBarIcon: ({ ref }) => (
              <Svg ref={ref} width={36} height={36} viewBox="0 0 36 36">
                <Store />
              </Svg>
            ),
            tabBarLabel: 'Store'
          }}
          component={StoreScreen}
        />
        <Tab.Screen
          name="LeaderBoard"
          options={{
            headerShown: false,
            tabBarIcon: ({ ref }) => (
              <Svg ref={ref} width={36} height={36} viewBox="0 0 36 36">
                <Trophy />
              </Svg>
            ),
            tabBarLabel: 'LeaderBoard'
          }}
          component={LeaderBoardScreen}
        />
        <Tab.Screen
          name="Settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ ref }) => (
              <Svg ref={ref} width={36} height={36} viewBox="0 0 36 36">
                <Setting />
              </Svg>
            ),
            tabBarLabel: 'Settings'
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }) => {
  const { bottom } = useSafeAreaInsets();
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const routeName = getFocusedRouteNameFromRoute(routes[activeIndex]);

  if (routeName === 'Trival' || routeName === 'Result') {
    return null; 
}

  const reducer = (state, action) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event, index) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    const layoutItem = layout.find((item) => item.index === activeIndex);
    return layoutItem ? layoutItem.x - 25 : 0;
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={Colors.White}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

const TabBarComponent = ({ active, options, onLayout, onPress }) => {
  const ref = useRef(null);

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
    <View style={styles.componentContainer}>
    <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </View>
    <Text style={[styles.label, active ? styles.activeLabel : styles.inactiveLabel]}>
      {options.tabBarLabel}
    </Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.Blue,
    height: 90
  },
  activeBackground: {
    position: 'absolute',
    backgroundColor: "transparent"
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
    alignItems: 'center',
  },
  componentContainer: {
    height: 60,
    width: 60,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: Colors.Blue,
    alignItems: "center",
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 8,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    color: Colors.Secondary_Blue_01,
    width: 85,
    fontFamily: "DM-Sans",
    fontWeight: "700",
  },
  activeLabel: {
    color: Colors.Secondary_Blue,
    fontFamily: "DM-Sans",
    fontWeight: "600",
  },
  inactiveLabel: {
    color: Colors.Secondary_Blue_01,
    fontFamily: "DM-Sans",
    fontWeight: "600",
  }
});

export default BottomNavigationBar;