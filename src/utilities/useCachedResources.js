import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const useCachedResources = () => {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    useEffect(() => {

        const loadResourcesAndDataAsync = async () => {
            try {
                await Promise.all([
                    Font.loadAsync({
                        ...Ionicons.font,
                        'Grotesk-Bold': require('../assets/SpaceGrotesk-Bold.ttf'),
                        'Grotesk-Medium': require('../assets/SpaceGrotesk-Medium.ttf'),
                        'Grotesk-Light': require('../assets/SpaceGrotesk-Light.ttf'),
                        'Grotesk-Regular': require('../assets/SpaceGrotesk-Regular.ttf'),
                        'Grotesk-SemiBold': require('../assets/SpaceGrotesk-SemiBold.ttf'),
                        'DM-Sans': require('../assets/DMSans-Regular.ttf'),
                    }),
                ])
            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}

export default useCachedResources;

