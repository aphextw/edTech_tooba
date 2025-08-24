import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    Alert, KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import CustomInput from "../../components/input";

export default function WelcomeScreen() {
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
            router.push('./user');
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

            <View style={{justifyContent: 'flex-end', flex: 1}}>
                <View style={styles.content}>
                    {currentStep === 0 && (
                        <Image
                            style={styles.image}
                            source={require("../../assets/images/facee.png")}
                            contentFit="cover"
                        />
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

                            <Image
                                style={styles.loginImage}
                                source={require("../../assets/images/faveev.png")}
                                contentFit="cover"
                            />

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

                    <ThemedText style={[styles.description, { marginBottom: currentStep === 2 ? 40 : 30}]}>
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

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginBottom: "15%",
    },
    loginImage: {
        alignSelf: 'center',
        marginBottom: "4%",
        width: '50%', // Адаптивная ширина (60% от ширины родителя)
        maxWidth: 200, // Максимальная ширина
        aspectRatio: 239/315, // Сохраняем оригинальное соотношение сторон 239:315
        resizeMode: 'contain',
    },
    progressContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 30,
        gap: 8,
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
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
        marginTop: 30,
        gap: 15,
        marginBottom: 40,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: "5%",
    },
    roleButton: {
        flex: 1,
        padding: 15,
        borderWidth: 2,
        borderColor: '#ddd', // Цвет по умолчанию для светлой темы
        borderRadius: 12,
        height: 116,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roleButtonDark: {
        borderColor: '#3F3F3F', // Цвет для темной темы
    },
    roleButtonActive: {
        borderColor: '#F73D48', // Активный цвет для светлой темы
    },
    roleButtonActiveDark: {
        borderColor: '#FFFFFF', // Активный цвет для темной темы (белый)
    },
    roleButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    roleButtonTextActive: {
        color: '#F73D48',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    navigation: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 40,
        paddingHorizontal: 10,
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