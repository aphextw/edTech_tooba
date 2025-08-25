import {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from "../../components/input";
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import {Image} from 'expo-image';

import {useRouter} from 'expo-router';

function WelcomeScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState(null);
    const router = useRouter();

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const steps = [
        {
            title: "Перемена",
            content: "Перемен, требуют наши сердца"
        },
        {
            title: "Выбор роли",
            content: "Интерфейс и возможности приложения будут отличаться в зависимости от вашей роли"
        },
        {
            title: "Вход в аккаунт",
            content: "Введите ваши данные для входа"
        }
    ];

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedIn = await AsyncStorage.getItem('isLoggedIn');
                if (loggedIn === 'true') {
                    router.replace('./user');
                }
            } catch (error) {
                console.log('Ошибка при проверке статуса входа:', error);
            }
        };

        checkLoginStatus();
    }, []);


    const handleNext = async () => {
        if (currentStep === 1) {
            if (!userRole) {
                Alert.alert('Ошибка', 'Пожалуйста, выберите роль');
                return;
            }
        }

        if (currentStep === 2) {
            if (!username.trim() || !password.trim() || !userRole) {
                Alert.alert('Ошибка', 'Пожалуйста, заполните все поля и выберите роль');
                return;
            }

            try {
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('password', password);
                await AsyncStorage.setItem('userRole', userRole);
                await AsyncStorage.setItem('isLoggedIn', 'true');
            } catch (error) {
                Alert.alert('Ошибка', 'Не удалось сохранить данные');
                return;
            }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            router.replace('./user');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleRoleSelect = (role) => {
        setUserRole(role);
    };

    // Функция для получения стилей кнопки в зависимости от темы и состояния
    const getRoleButtonStyle = (role) => {
        return [
            styles.roleButton,
            isDark && styles.roleButtonDark,
            userRole === role && styles.roleButtonActive,
            isDark && userRole === role && styles.roleButtonActiveDark,
        ];
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.webContainer}>

                {Platform.OS !== 'web' && (
                    <View style={styles.progressContainer}>
                        {steps.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.progressBar,
                                    index === currentStep && styles.progressBarActive,
                                    index < currentStep && styles.progressBarCompleted
                                ]}
                            />
                        ))}
                    </View>
                )}


                <View style={{justifyContent: 'flex-end', flex: 1}}>
                    <View style={styles.content}>


                        {currentStep === 0 && (
                            <>
                                <Image
                                    style={styles.image}
                                    source={require("../../assets/images/facee.png")}
                                    contentFit="cover"
                                />

                                <ThemedText type="title" style={[styles.title, {marginTop: -20, marginBottom: 30}]}>
                                    {Platform.OS === 'web' ? 'Вход' : ""}
                                </ThemedText>
                            </>
                        )}


                        {currentStep === 1 && (
                            <View style={styles.roleContainer}>
                                <TouchableOpacity
                                    style={getRoleButtonStyle('student')}
                                    onPress={() => handleRoleSelect('student')}
                                >
                                    <Text style={{fontSize: 45}}>
                                        👨‍🎓
                                    </Text>
                                    <ThemedText style={[
                                        styles.roleButtonText,
                                    ]}>
                                        Ученик
                                    </ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={getRoleButtonStyle('teacher')}
                                    onPress={() => handleRoleSelect('teacher')}
                                >
                                    <Text style={{fontSize: 45}}>
                                        👩‍🏫
                                    </Text>
                                    <ThemedText style={[
                                        styles.roleButtonText,
                                    ]}>
                                        Учитель
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        )}


                        {currentStep === 2 && (
                            <View style={styles.formContainer}>

                                {Platform.OS !== 'web' &&
                                    <Image
                                        style={styles.loginImage}
                                        source={require("../../assets/images/faveev.png")}
                                        contentFit="cover"
                                    />
                                }
                                <CustomInput
                                    placeholder="Логин"
                                    value={username}
                                    onChangeText={setUsername}
                                />

                                <CustomInput
                                    placeholder="Пароль"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={true}
                                />
                            </View>
                        )}

                        <ThemedText type="title" style={[styles.title, {marginTop: currentStep === 2 ? 20 : 30}]}>
                            {steps[currentStep].title}
                        </ThemedText>

                        <ThemedText style={[styles.description, {marginBottom: currentStep === 2 ? 40 : 30}]}>
                            {steps[currentStep].content}
                        </ThemedText>

                    </View>

                    <View style={styles.navigation}>
                        <TouchableOpacity
                            style={[
                                styles.nextButton,
                                (currentStep === 1 && !userRole) ||
                                (currentStep === 2 && (!username.trim() || !password.trim() || !userRole)) ?
                                    styles.nextButtonDisabled : null
                            ]}
                            onPress={handleNext}
                            disabled={
                                (currentStep === 1 && !userRole) ||
                                (currentStep === 2 && (!username.trim() || !password.trim() || !userRole))
                            }
                        >
                            <Text style={styles.nextButtonText}>
                                {currentStep === steps.length - 1 ? 'Начать' : 'Далее'}
                            </Text>
                        </TouchableOpacity>
                        {currentStep > 0 && (
                            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                                <Text style={styles.backButtonText}>Назад</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingBottom: 30,
        flex: 1,
        padding: 10,
        // Стили для веба
        ...Platform.select({
            web: {
                alignItems: 'center',
                justifyContent: 'center',
            },
        }),
    },
    webContainer: {
        // Мобильные стили по умолчанию
        width: '100%',
        height: '100%',

        // Стили для веба
        ...Platform.select({
            web: {
                width: 488,
                height: 504,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 100
            },
        }),
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginBottom: "15%",
        ...Platform.select({
            web: {
                marginBottom: "10%",
                maxHeight: 200,
                width: 93,    // Добавь это
                height: 93,   // И это
                alignSelf: 'center', // Чтобы центрировалось
            },
        }),
    },

    loginImage: {
        alignSelf: 'center',
        marginBottom: "4%",
        width: '50%',
        maxWidth: 200,
        aspectRatio: 239 / 315,
        resizeMode: 'contain',
        // Адаптация для веба
        ...Platform.select({
            web: {
                width: '40%',
                marginBottom: "2%",
            },
        }),
    },
    progressContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 30,
        gap: 8,
        // Адаптация для веба
        ...Platform.select({
            web: {
                marginTop: 30,
                marginBottom: 20,
            },
        }),
    },
    progressBar: {
        width: "29%",
        height: 8,
        backgroundColor: '#ccc',
        borderRadius: 31,
    },
    progressBarActive: {
        backgroundColor: '#F73D48',
    },
    progressBarCompleted: {
        backgroundColor: '#F73D48',
    },
    content: {
        paddingHorizontal: 10,
        // Адаптация для веба
        ...Platform.select({
            web: {
                paddingHorizontal: 20,
            },
        }),
    },
    title: {
        color: "#000",
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        // Адаптация для веба
        ...Platform.select({
            web: {
                fontSize: 24,
                textAlign: 'center',
            },
        }),
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        marginBottom: 30,
        // Адаптация для веба
        ...Platform.select({
            web: {
                textAlign: 'center',
                fontSize: 14,
                lineHeight: 20,
                marginBottom: 25,
            },
        }),
    },
    formContainer: {
        width: '100%',
        marginTop: 30,
        gap: 15,
        marginBottom: 40,
        // Адаптация для веба
        ...Platform.select({
            web: {
                marginTop: 20,
                marginBottom: 30,
            },
        }),
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: "5%",
        // Адаптация для веба
        ...Platform.select({
            web: {
                marginBottom: "3%",
            },
        }),
    },
    roleButton: {
        flex: 1,
        padding: 15,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 12,
        height: 116,
        justifyContent: 'center',
        alignItems: 'center',
        // Адаптация для веба
        ...Platform.select({
            web: {
                height: 100,
                padding: 12,
            },
        }),
    },
    roleButtonDark: {
        borderColor: '#3F3F3F',
    },
    roleButtonActive: {
        borderColor: '#F73D48',
    },
    roleButtonActiveDark: {
        borderColor: '#FFFFFF',
    },
    roleButtonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: '600',
        // Адаптация для веба
        ...Platform.select({
            web: {
                fontSize: 14,
            },
        }),
    },
    navigation: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 40,
        paddingHorizontal: 10,
        // Адаптация для веба
        ...Platform.select({
            web: {
                marginBottom: 30,
            },
        }),
    },
    backButton: {
        padding: 15,
        minWidth: 100,
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#F73D48',
        padding: 15,
        borderRadius: 12,
        minWidth: 120,
        width: "100%",
        marginBottom: 10,
        alignItems: 'center',
        minHeight: 56,
        justifyContent: 'center',
    },
    nextButtonDisabled: {
        backgroundColor: '#ccc',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default WelcomeScreen;