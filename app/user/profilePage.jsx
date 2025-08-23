import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [username, setUsername] = useState('');
    const [userRole, setUserRole] = useState('');
    const router = useRouter();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const savedUsername = await AsyncStorage.getItem('username');
            const savedUserRole = await AsyncStorage.getItem('userRole');
            if (savedUsername) setUsername(savedUsername);
            if (savedUserRole) setUserRole(savedUserRole);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            "Выход",
            "Вы уверены, что хотите выйти из аккаунта?",
            [
                { text: "Отмена", style: "cancel" },
                {
                    text: "Выйти", onPress: async () => {
                        try {
                            await AsyncStorage.multiRemove(['isLoggedIn', 'username', 'password', 'userRole']);
                            router.replace('/');
                        } catch (error) {
                            console.error('Ошибка выхода:', error);
                            Alert.alert('Ошибка', 'Не удалось выйти из аккаунта');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Ionicons name="person-circle-outline" size={100} color="#aaa" />
                    </View>
                    <Text style={styles.username}>{username || 'Имя пользователя'}</Text>
                    <Text style={styles.role}>{userRole || 'Роль'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Настройки</Text>

                    <TouchableOpacity style={styles.optionButton}>
                        <Ionicons name="key-outline" size={20} color="#555" />
                        <Text style={styles.optionText}>Сменить пароль</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton}>
                        <Ionicons name="moon-outline" size={20} color="#555" />
                        <Text style={styles.optionText}>Тема приложения</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={20} color="#F73D48" />
                        <Text style={styles.logoutText}>Выйти из аккаунта</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        paddingTop: 60,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        marginBottom: 15,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    role: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#F73D48',
        fontWeight: '600',
    },
});

