import { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

export default function MainScreen() {
    const [username, setUsername] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);
    const router = useRouter();

    // Загрузка данных пользователя
    useEffect(() => {
        loadUserData();
        updateTime();

        // Обновляем время каждую минуту
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const loadUserData = async () => {
        try {
            const savedUsername = await AsyncStorage.getItem('username');
            if (savedUsername) {
                setUsername(savedUsername);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
    };

    const handleLogout = async () => {
        Alert.alert(
            "Выход",
            "Вы уверены, что хотите выйти из аккаунта?",
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Выйти",
                    onPress: async () => {
                        try {
                            // Очищаем данные авторизации
                            await AsyncStorage.removeItem('isLoggedIn');
                            await AsyncStorage.removeItem('username');
                            await AsyncStorage.removeItem('password');
                            await AsyncStorage.removeItem('userRole');

                            // Переходим на экран приветствия
                            router.replace('/');
                        } catch (error) {
                            console.error('Ошибка выхода:', error);
                            Alert.alert('Ошибка', 'Не удалось выйти из аккаунта');
                        }
                    }
                }
            ]
        );
        setShowLogoutMenu(false);
    };

    const features = [
        {
            icon: 'school',
            title: 'Расписание',
            description: 'Просмотр уроков на сегодня'
        },
        {
            icon: 'book',
            title: 'Домашние задания',
            description: 'Список заданий и дедлайны'
        },
        {
            icon: 'calendar',
            title: 'Календарь',
            description: 'События и мероприятия'
        },
        {
            icon: 'chatbubble',
            title: 'Чат класса',
            description: 'Общение с одноклассниками'
        },
        {
            icon: 'stats-chart',
            title: 'Оценки',
            description: 'Успеваемость и прогресс'
        },
        {
            icon: 'document-text',
            title: 'Заметки',
            description: 'Личные записи и материалы'
        }
    ];

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Добро пожаловать{username ? `, ${username}` : ''}!</Text>
                        <Text style={styles.time}>{currentTime}</Text>
                    </View>

                    {/* Кнопка профиля с меню выхода */}
                    <View style={styles.profileContainer}>
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={() => setShowLogoutMenu(!showLogoutMenu)}
                        >
                            <Ionicons name="person" size={24} color="#F73D48" />
                        </TouchableOpacity>

                        {showLogoutMenu && (
                            <View style={styles.logoutMenu}>
                                <TouchableOpacity
                                    style={styles.logoutButton}
                                    onPress={handleLogout}
                                >
                                    <Ionicons name="log-out" size={20} color="#F73D48" />
                                    <Text style={styles.logoutText}>Выйти</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                {/* Быстрый доступ */}
                <View style={styles.quickAccess}>
                    <Text style={styles.sectionTitle}>Быстрый доступ</Text>
                    <View style={styles.quickAccessGrid}>
                        <TouchableOpacity style={styles.quickAccessItem}>
                            <View style={[styles.quickAccessIcon, { backgroundColor: '#FF6B6B' }]}>
                                <Ionicons name="today" size={24} color="white" />
                            </View>
                            <Text style={styles.quickAccessText}>Сегодня</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickAccessItem}>
                            <View style={[styles.quickAccessIcon, { backgroundColor: '#4ECDC4' }]}>
                                <Ionicons name="checkmark-done" size={24} color="white" />
                            </View>
                            <Text style={styles.quickAccessText}>Задания</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickAccessItem}>
                            <View style={[styles.quickAccessIcon, { backgroundColor: '#45B7D1' }]}>
                                <Ionicons name="megaphone" size={24} color="white" />
                            </View>
                            <Text style={styles.quickAccessText}>Новости</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickAccessItem}>
                            <View style={[styles.quickAccessIcon, { backgroundColor: '#F9A826' }]}>
                                <Ionicons name="settings" size={24} color="white" />
                            </View>
                            <Text style={styles.quickAccessText}>Настройки</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Основные функции */}
                <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>Основные функции</Text>
                    <View style={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <TouchableOpacity key={index} style={styles.featureCard}>
                                <View style={styles.featureIcon}>
                                    <Ionicons name={feature.icon} size={28} color="#F73D48" />
                                </View>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDescription}>{feature.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Ближайшие события */}
                <View style={styles.eventsSection}>
                    <Text style={styles.sectionTitle}>Ближайшие события</Text>
                    <View style={styles.eventCard}>
                        <View style={styles.eventTime}>
                            <Text style={styles.eventHour}>10:00</Text>
                            <Text style={styles.eventSubject}>Математика</Text>
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>Контрольная работа</Text>
                            <Text style={styles.eventDescription}>Тема: Производные и интегралы</Text>
                        </View>
                    </View>

                    <View style={styles.eventCard}>
                        <View style={styles.eventTime}>
                            <Text style={styles.eventHour}>14:30</Text>
                            <Text style={styles.eventSubject}>Физика</Text>
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>Лабораторная работа</Text>
                            <Text style={styles.eventDescription}>Кабинет 203</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 0,
        paddingTop: 50,
        padding: 20,
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
        position: 'relative',
    },
    profileContainer: {
        position: 'fixed',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    profileButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    logoutMenu: {
        position: 'absolute',
        top: 55,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1000,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        minWidth: 100,
    },
    logoutText: {
        marginLeft: 8,
        color: '#F73D48',
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    quickAccess: {
        marginBottom: 30,
    },
    quickAccessGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    quickAccessItem: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    quickAccessIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    quickAccessText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    featuresSection: {
        marginBottom: 30,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    featureIcon: {
        marginBottom: 10,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    featureDescription: {
        fontSize: 12,
        color: '#666',
    },
    eventsSection: {
        marginBottom: 30,
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#eee',
    },
    eventTime: {
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventHour: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F73D48',
    },
    eventSubject: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    eventDescription: {
        fontSize: 14,
        color: '#666',
    },
});