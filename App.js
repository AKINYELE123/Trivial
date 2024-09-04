import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useCachedResources from './src/utilities/useCachedResources';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigationBar from './src/navigation/BottomNavigationBar';

export default function App() {

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
      <View style={styles.container}>
        <StatusBar style="#2364AA" />
        <BottomNavigationBar />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
