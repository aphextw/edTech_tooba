import { useState, useEffect } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function WelcomeScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);
    const router = useRouter();

    const steps = [
        {
            title: "Добро пожаловать!",
            content: "Приложение с удобным и быстрым доступом к полезной информации и механикам для школьников"
        },
        {
            title: "Вход в аккаунт",
            content: "Введите ваши данные для входа"
        },
        {
            title: "Готово!",
            content: "Начинаем пользоваться приложением"
        }
    ];

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loggedIn = await AsyncStorage.getItem('isLoggedIn');
                if (loggedIn === 'true') {
                    router.replace('./user'); // сразу переход без показа welcome-экрана
                }
            } catch (error) {
                console.log('Ошибка при проверке статуса входа:', error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleNext = async () => {
        if (currentStep === 1) {
            // Проверяем данные на втором шаге
            if (!username.trim() || !password.trim() || !userRole) {
                Alert.alert('Ошибка', 'Пожалуйста, заполните все поля и выберите роль');
                return;
            }

            // Сохраняем в AsyncStorage
            try {
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('password', password);
                await AsyncStorage.setItem('userRole', userRole);
                await AsyncStorage.setItem('isLoggedIn', 'true'); // Сохраняем статус входа
            } catch (error) {
                Alert.alert('Ошибка', 'Не удалось сохранить данные');
                return;
            }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Переходим на главный экран
            router.push('./user');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleRoleSelect = (role: 'student' | 'teacher') => {
        setUserRole(role);
    };

    return (
        <ThemedView style={styles.container}>

            {/* Индикатор прогресса */}
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

            {/* Контент текущего шага */}
            <View style={styles.content}>
                <ThemedText type="title" style={styles.title}>
                    {steps[currentStep].title}
                </ThemedText>

                <ThemedText style={styles.description}>
                    {steps[currentStep].content}
                </ThemedText>

                {currentStep === 1 && (
                    <View style={styles.formContainer}>
                        {/* Выбор роли */}
                        <View style={styles.roleContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.roleButton,
                                    userRole === 'student' && styles.roleButtonActive
                                ]}
                                onPress={() => handleRoleSelect('student')}
                            >
                                <Text style={[
                                    styles.roleButtonText,
                                    userRole === 'student' && styles.roleButtonTextActive
                                ]}>
                                    👨‍🎓 Ученик
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.roleButton,
                                    userRole === 'teacher' && styles.roleButtonActive
                                ]}
                                onPress={() => handleRoleSelect('teacher')}
                            >
                                <Text style={[
                                    styles.roleButtonText,
                                    userRole === 'teacher' && styles.roleButtonTextActive
                                ]}>
                                    👩‍🏫 Учитель
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Поля ввода */}
                        <TextInput
                            style={styles.input}
                            placeholder="Логин"
                            placeholderTextColor="#999"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Пароль"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                )}

                {currentStep === 2 && (
                    <View style={styles.successContainer}>
                        <ThemedText style={styles.successText}>
                            ✅ Ваши данные успешно сохранены!
                        </ThemedText>
                        {userRole && (
                            <ThemedText style={styles.roleText}>
                                Вы вошли как: {userRole === 'student' ? 'Ученик' : 'Учитель'}
                            </ThemedText>
                        )}
                    </View>
                )}
            </View>

            {/* Навигационные кнопки */}
            <View style={styles.navigation}>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        currentStep === 1 &&
                        (!username.trim() || !password.trim() || !userRole) &&
                        styles.nextButtonDisabled
                    ]}
                    onPress={handleNext}
                    disabled={currentStep === 1 && (!username.trim() || !password.trim() || !userRole)}
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
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 30,
        gap: 8,
    },
    progressBar: {
        width: 100,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2,
    },
    progressBarActive: {
        backgroundColor: '#F73D48',
    },
    progressBarCompleted: {
        backgroundColor: '#F73D48',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        color: '#666',
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
        marginTop: 30,
        gap: 15,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 10,
    },
    roleButton: {
        flex: 1,
        padding: 15,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    roleButtonActive: {
        borderColor: '#F73D48',
        backgroundColor: '#FFF0F0',
    },
    roleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
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
    successContainer: {
        marginTop: 30,
        padding: 20,
        backgroundColor: '#E8F5E8',
        borderRadius: 12,
        alignItems: 'center',
    },
    successText: {
        color: '#2E7D32',
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    roleText: {
        color: '#2E7D32',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
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
        alignItems: 'center',
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