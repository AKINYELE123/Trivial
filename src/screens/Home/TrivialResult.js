import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import MainContainer from '../../component/MainContainer';
import { CustomText } from '../../component/Text';
import { Colors } from '../../utilities/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import happyGif from '../../assets/gifs/Happy.gif';
import sadGif from '../../assets/gifs/Sad.gif';
import { LinearGradient } from 'expo-linear-gradient';

const TrivialResult = ({ route, navigation }) => {
    const { correctCount, total } = route.params;
    const percentage = (correctCount / total) * 100;
    const isPass = percentage >= 50;

    console.log("correctCount, total ", correctCount, total )

    return (
        <MainContainer>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ marginTop: 10 }}>
                    <CustomText
                        text={"Result"}
                        color={Colors.Grey}
                        fontFamily={"DM-Sans"}
                        align={"center"}
                        fontWeight={"600"}
                        size={22}
                    />
                    <View style={styles.Box}>
                        <CustomText
                            text={`Total Time Used: 01:00`}
                            align={"center"}
                            color={Colors.Black}
                            size={12}
                        />
                        <View style={styles.iconContainer}>
                            <View style={styles.correctIconContainer}>
                                <CustomText text={`${correctCount} Correct`} color={Colors.Black} size={14} />
                                <View style={{ backgroundColor: Colors.Secondary_Green, borderRadius: 20 }}>
                                    <Ionicons name="checkmark" size={24} color={Colors.White} />
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.incorrectIconContainer}>
                                <CustomText text={`${total - correctCount} Incorrect`} color={Colors.Black} size={14} />
                                <View style={{ backgroundColor: Colors.Primary_Red, borderRadius: 20 }}>
                                    <Ionicons name="close" size={24} color={Colors.Secondary_Blue_03} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.Box}>
                        <View style={{ alignContent: "center", alignItems: "center", gap: 10, marginBottom: 50 }}>
                            <Image
                                source={isPass ? happyGif : sadGif}
                                style={styles.resultImage}
                            />
                            <CustomText text={"Better Luck Next Time"} size={18} fontWeight={500} color={Colors.Black} />
                            <CustomText text={isPass ? "Congratulations You Won 🎉" : "Sorry you Didn’t win"} size={18} fontWeight={500} color={Colors.Black} />
                        </View>
                    </View>
                </View>




                <View style={{ justifyContent: 'flex-end', marginBottom: 20, flex: 1 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'transparent', 
                        }}
                        onPress={() => navigation.navigate('Dash')}
                    >
                        <View
                            style={{
                                backgroundColor: Colors.Secondary_Blue, 
                                borderRadius: 30,
                                paddingVertical: 15, 
                                paddingHorizontal: 30,
                            }}
                        >
                            <CustomText text={"Go Home"} color={Colors.Black} size={16} fontWeight={"600"} align={"center"} />
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: -10,
                                left: '7%', 
                                right: '7%', 
                                height: 10, 
                                borderBottomLeftRadius: 60,
                                borderBottomRightRadius: 60
                            }}>
                            <LinearGradient
                                colors={['#FEE65E', '#ED7B2B']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    flex: 1,
                                    borderBottomLeftRadius: 60,
                                    borderBottomRightRadius: 60
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </MainContainer>
    );
};

export default TrivialResult;

const styles = StyleSheet.create({
    Box: {
        backgroundColor: Colors.Secondary_Blue_03,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
        marginTop: 30,
        padding: 20,
        gap: 10,
        marginBottom: 20,
        paddingVertical: 20,
        borderWidth: 5,
        borderColor: Colors.Secondary_Blue
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: "center",
        gap: 10
    },
    correctIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    incorrectIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    divider: {
        height: 30,
        width: 1,
        backgroundColor: Colors.Deeper_Grey
    },
    resultImage: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    button: {
        paddingVertical: 20,
        backgroundColor: Colors.Secondary_Blue,
        marginVertical: 15,
        borderRadius: 60,
        alignItems: 'center',
    }
});
