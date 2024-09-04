import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MainContainer from '../../component/MainContainer';
import { CustomText } from '../../component/Text';
import Stopwatch from "../../assets/svgs/stopwatch.svg";
import * as Progress from 'react-native-progress';
import { Colors } from '../../utilities/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const TrivalScreen = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [progress, setProgress] = useState(1);
    const [progressColor, setProgressColor] = useState('#4CAF50');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple&encode=url3986');
                const data = await response.json();
                if (data.results.length > 0) {
                    const formattedQuestions = data.results.map((question) => ({
                        ...question,
                        allAnswers: shuffleAnswers([...question?.incorrect_answers, question?.correct_answer])
                    }));
                    setQuestions(formattedQuestions);
                } else {
                    Alert.alert('No questions available. Please try again later.');
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Failed to load questions. Please check your connection and try again.');
            } finally {
                setLoading(false);
                setIsTimerActive(true);
            }
        };
    
        fetchQuestions();
    }, []);
    

    useEffect(() => {
        if (!isTimerActive || timeLeft <= 0) {
            moveToNextQuestion();
        } else {
            if (timeLeft <= 3) {
                setProgressColor('red');
            } else {
                setProgressColor('#4CAF50');
            }

            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            setProgress(timeLeft / 10);

            return () => clearInterval(timer);
        }
    }, [isTimerActive, timeLeft]);

    const shuffleAnswers = (answers) => {
        return answers.sort(() => Math.random() - 0.5);
    };

    const moveToNextQuestion = () => {

        if (questions.length === 0) {
            return;
        }

        if (selectedAnswer !== null) {
            setSelectedAnswer(null);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setTimeLeft(10);
            setProgress(1);
            setProgressColor('#4CAF50');
        } else {
            navigation.navigate('Result', { correctCount, total: questions.length });
        }
    };

    const handleAnswerPress = (answer) => {
        if (selectedAnswer === null) {
            setSelectedAnswer(answer);
            if (answer === questions[currentQuestionIndex]?.correct_answer) {
                setCorrectCount(correctCount + 1);
            }
        }
    }

    console.log("correctCount", correctCount)

    const getLetterPrefix = (index) => {
        return String.fromCharCode(65 + index) + ":";
    };

    if (loading) {
        return (
            <MainContainer>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.White} />
                </View>
            </MainContainer>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;

    return (
        <MainContainer>
            <View style={styles.rowContainer}>
                <View style={styles.stopwatchContainer}>
                    <Stopwatch />
                    <CustomText size={14} fontWeight={"400"} text={"00.00.10"} color={Colors.White} />
                </View>
                <View style={styles.progressBarContainer}>
                    <Progress.Circle
                        progress={progress}
                        size={40}
                        color={progressColor}
                        borderWidth={0}
                        thickness={3}
                        showsText={false}
                        unfilledColor={Colors.Circle}
                    />
                    <Text style={styles.progressText}>{timeLeft}</Text>
                </View>
                <View style={{ opacity: 0 }}>
                    <Text>2</Text>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <View style={styles.questionBox}>
                    <CustomText text={`Question ${questionNumber}`} color={Colors.Black} size={20} align={"center"} />
                    <CustomText text={decodeURIComponent(currentQuestion.question)} color={Colors.Black} size={20} align={"center"} />
                </View>
                <View style={{ marginTop: 30 }}>
                    <CustomText text={"Choose Correct Option"} fontWeight={"500"} size={18} color={Colors.White} />
                    <FlatList
                        data={currentQuestion.allAnswers}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={[
                                    styles.answeButton,
                                    selectedAnswer === item && (item === currentQuestion?.correct_answer ? styles.correct : styles.incorrect)
                                ]}
                                onPress={() => handleAnswerPress(item)}
                                disabled={selectedAnswer !== null}
                            >
                                <Text style={[
                                    styles.answerText,
                                    selectedAnswer === item && {
                                        color: item === currentQuestion?.correct_answer ? Colors.Grey : Colors.Grey
                                    }
                                ]}>
                                    {getLetterPrefix(index)} {decodeURIComponent(item)}
                                </Text>
                                {selectedAnswer === item && (
                                    <Ionicons
                                        name={item === currentQuestion?.correct_answer ? 'checkmark' : 'close'}
                                        size={18}
                                        color={item === currentQuestion?.correct_answer ? Colors.Primary_Green : Colors.Primary_Red}
                                        style={item === currentQuestion?.correct_answer ? styles.correctIcon : styles.incorrectIcon}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stopwatchContainer: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    progressBarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    progressText: {
        position: 'absolute',
        fontSize: 10,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: "Grotesk-Regular"
    },
    questionBox: {
        backgroundColor: Colors.White,
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
        paddingVertical: 30,
        borderWidth: 8,
        borderColor: Colors.Secondary_Blue
    },
    answeButton: {
        paddingLeft: 30,
        paddingVertical: 20,
        backgroundColor: Colors.Grey,
        marginVertical: 15,
        borderRadius: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    answerText: {
        fontSize: 16,
        color: Colors.Black,
        fontWeight: "400",
        fontFamily: "Grotesk-Regular"
    },
    correct: {
        backgroundColor: Colors.Primary_Green,
        borderWidth: 3,
        borderColor: Colors.Secondary_Green
    },
    incorrect: {
        backgroundColor: Colors.Primary_Red,
        borderWidth: 3,
        borderColor: Colors.Secondary_Red
    },
    correctIcon: {
        backgroundColor: Colors.Secondary_Green,
        marginRight: 10,
        borderRadius: 20
    },
    incorrectIcon: {
        backgroundColor: Colors.Secondary_Red_01,
        marginRight: 15,
        borderRadius: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TrivalScreen;

