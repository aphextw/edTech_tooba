import {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, Image} from 'react-native';
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons, MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import {ThemedView} from "../../components/ThemedView";

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
        Alert.alert("Выход", "Вы уверены, что хотите выйти из аккаунта?", [{text: "Отмена", style: "cancel"}, {
            text: "Выйти", onPress: async () => {
                try {
                    await AsyncStorage.multiRemove(['isLoggedIn', 'username', 'password', 'userRole']);
                    router.replace('/');
                } catch (error) {
                    console.error('Ошибка выхода:', error);
                    Alert.alert('Ошибка', 'Не удалось выйти из аккаунта');
                }
            }
        }]);
    };

    return (<ThemedView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.profileBlock}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons name="person" size={32} color="#F73D48"/>
                    </View>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.username}>{username || 'Иван Иванов'}</Text>
                    <Text style={styles.class}>11-А класс</Text>
                </View>
            </View>

            <View style={styles.verticalSection}>
                <TouchableOpacity style={styles.classBlock}>
                    <Ionicons name="school-outline" size={24} color="#F73D48"/>
                    <Text style={styles.blockTitle}>Мой класс</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.scheduleBlock}>
                    <View style={styles.blockHeader}>
                        <Ionicons name="time-outline" size={24} color="#F73D48"/>
                        <Text style={styles.blockTitle}>Расписание</Text>
                    </View>
                    <View style={styles.blockContent}>
                        <Text style={styles.scheduleInfo}>До следующего урока</Text>
                        <View style={styles.timerContainer}>
                            <FontAwesome5 name="bell" size={16} color="#F73D48"/>
                            <Text style={styles.timerText}>12 минут</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Остальные настройки */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Настройки</Text>

                <TouchableOpacity style={styles.optionButton}>
                    <Ionicons name="key-outline" size={20} color="#555"/>
                    <Text style={styles.optionText}>Сменить пароль</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton}>
                    <Ionicons name="moon-outline" size={20} color="#555"/>
                    <Text style={styles.optionText}>Тема приложения</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#F73D48"/>
                    <Text style={styles.logoutText}>Выйти из аккаунта</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </ThemedView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 15, // backgroundColor: '#f8f9fa',
        paddingTop: 60,
    }, scrollView: {
        flex: 1,
    }, // Первый блок - Профиль
    profileBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        height: 72,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    }, avatarContainer: {
        marginRight: 16,
    }, avatarPlaceholder: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F73D48',
    }, profileInfo: {
        flex: 1,
    }, username: {
        fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4,
    }, class: {
        fontSize: 14, color: '#F73D48', fontWeight: '600',
    }, verticalSection: {
        marginBottom: 30, flexDirection: 'row', gap: 16,
    }, classBlock: {
        backgroundColor: '#F7F7F7', borderRadius: 12, padding: 16, flexDirection: 'column', width: 93, height: 93,
    }, scheduleBlock: {
        backgroundColor: '#F7F7F7', borderRadius: 12, padding: 12, // width: '50%',
        flex: 1, height: 93,
    }, blockHeader: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 12,
    }, blockTitle: {
        fontSize: 16, fontWeight: '600', color: '#333', marginLeft: 8,
    }, blockContent: {
        marginLeft: 32, // Отступ для выравнивания с текстом
    }, classInfo: {
        fontSize: 16, fontWeight: '600', color: '#F73D48', marginBottom: 4,
    }, classSubInfo: {
        fontSize: 14, color: '#666',
    }, scheduleInfo: {
        fontSize: 14, color: '#666', marginBottom: 8,
    }, timerContainer: {
        flexDirection: 'row', alignItems: 'center', gap: 8,
    }, timerText: {
        fontSize: 16, fontWeight: '600', color: '#F73D48',
    }, // Остальные стили
    section: {
        marginBottom: 30,
    }, sectionTitle: {
        fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 15,
    }, optionButton: {
        flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    }, optionText: {
        marginLeft: 10, fontSize: 16, color: '#333',
    }, logoutButton: {
        flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    }, logoutText: {
        marginLeft: 10, fontSize: 16, color: '#F73D48', fontWeight: '600',
    },
});