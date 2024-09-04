import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, TouchableOpacityBase, Text, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../utilities/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import Add from "../../assets/svgs/Add.svg"
import Eraser from "../../assets/svgs/Eraser.svg"
import Joe from "../../assets/svgs/Joe.svg"
import Sarah from "../../assets/svgs/Sarah.svg"
import Hannex from "../../assets/svgs/Hannex.svg"
import Ini from "../../assets/svgs/Ini.svg"
import Liz from "../../assets/svgs/Liz.svg"
import { CustomText } from '../../component/Text';

const HomeScreen = ({ navigation }) => {

    const iconList = [
        {
            id: 1,
            description: "Joe",
            svg: <Joe />,
            backgroundColor: '#F2F2F2',
            price: "₦5,000"
        },
        {
            id: 2,
            description: "Sarah",
            svg: <Sarah />,
            backgroundColor: '#AFF0FF',
            price: "₦5,000"
        },
        {
            id: 3,
            description: "Hannex",
            svg: <Hannex />,
            backgroundColor: '#C4FBD2',
            price: "₦5,000"
        },
        {
            id: 4,
            description: "Inioluwa",
            svg: <Ini />,
            backgroundColor: '#FFCBD2',
            price: "₦5,000"
        },
        {
            id: 5,
            description: "Liz",
            svg: <Liz />,
            backgroundColor: '#FFF6C5',
            price: "₦5,000"
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ImageBackground
                source={require('../../assets/Images/setIcons.jpg')}
                style={styles.HeaderContainer}
                imageStyle={styles.BackgroundImage}
            >
                <View style={styles.OverlayBackground} />

                <View style={styles.ContentContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("../../assets/Images/Header.png")}
                                style={styles.Image}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                            <View style={styles.Eraser}>
                                <Eraser />
                                <CustomText text={"0"} color={Colors.Secondary_Blue_01} />
                            </View>
                            <View style={styles.Balance}>
                                <CustomText text={"₦5,000.00"} color={Colors.Blue_Text} fontWeight={"600"} />
                                <Add />
                            </View>

                            <Ionicons name='notifications-outline' size={24} color={Colors.Secondary_Blue_01} />
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <CustomText text={"Hello  John 👋"} color={Colors.White} size={24} />
                        <CustomText text={"Let’s play and Earn"} color={Colors.Grey} size={16} />
                    </View>
                </View>
            </ImageBackground>

            <View style={{
                padding: 20,
                marginTop: -100,
            }}>
                <View style={styles.gamePrizeContainer}>
                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <CustomText text={"Game Prize"} size={20} align={"center"} fontFamily={"DM-Sans"} />
                        <CustomText text={"₦1,000,000"} size={48} align={"center"} fontFamily={"DM-Sans"} />
                        <CustomText text={"Next Game: Tomorrow, 8PM "} size={12} align={"center"} fontWeight={"500"} color={Colors.Black} />
                    </View>


                    <View style={styles.bottomSection}>
                        <TouchableOpacity style={styles.Balance} onPress={() => navigation.navigate("Trival")}>
                            <CustomText text={"Join Free"} color={Colors.Blue_Text} fontWeight={"600"} />
                            <Add />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", gap: 2.5, alignItems: "center" }}>
                            <CustomText text={"Entry Fee"} color={Colors.White} size={14} />
                            <CustomText text={"₦100.00"} color={Colors.White} size={14} />
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView style={{ paddingHorizontal: 25 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 10 }}>
                    <CustomText text={"Top Gamers of the Day"} color={Colors.Black} />
                    <View style={styles.iconRow}>
                        {iconList.map(item => (
                            <View key={item.id} style={styles.iconContainer}>
                                <View style={[styles.svgContainer, { backgroundColor: item.backgroundColor }]}>
                                    {item.svg}
                                </View>
                                <CustomText text={item.description} size={14} color={Colors.Black} />
                                <CustomText text={item.price} size={12} fontWeight={"400"} color={Colors.Primary_Blue} />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.InviteContainer}>
                    <CustomText text={"Refer & Earn with your Friends"} color={Colors.Grey} size={18} />
                    <CustomText text={"Share with your friends and loved ones to come and play"} color={Colors.Grey} size={12} fontWeight={"400"} width={"80%"} />
                    <View style={styles.ShareButton}>
                        <CustomText text={"Invite Friends"} size={10} color={Colors.Grey} />
                    </View>

                    <View style={styles.shareIcon}>
                        <Ionicons name='share-social' size={118} color={Colors.Secondary_Blue_02} />
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    HeaderContainer: {
        height: "38%",
        borderBottomRightRadius: 70,
        overflow: 'hidden'
    },
    BackgroundImage: {
        height: "100%",
    },
    OverlayBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.Blue,
        opacity: 0.78,
    },
    ContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 50,
        height: "100%",
    },
    imageContainer: {
        backgroundColor: Colors.White,
        borderRadius: 50,
        padding: 5,
        borderWidth: 2,
        borderColor: Colors.Secondary_Blue_01
    },
    Image: {
        width: 40,
        height: 40
    },
    Eraser: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        borderColor: Colors.Secondary_Blue_01,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 10,
    },
    Balance: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: Colors.Secondary_Blue_01,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 5,
    },
    gamePrizeContainer: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
    },
    bottomSection: {
        backgroundColor: Colors.Primary_Blue,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 40,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonText: {
        color: Colors.White,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        paddingVertical: 15
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
    },
    svgContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginBottom: 10,
        gap: 10
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
    },
    InviteContainer: {
        backgroundColor: Colors.Primary_Blue,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
        marginTop: 30,
        padding: 20,
        gap: 10
    },
    ShareButton: {
        borderWidth: 1,
        borderColor: Colors.Grey,
        width: "30%",
        alignContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderRadius: 50
    },
    shareIcon: {
        position: "absolute",
        top: 20,
        right: -20
    }
})
