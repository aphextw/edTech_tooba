import {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Ionicons, MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import {ThemedView} from '../../components/ThemedView';
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ProfileScreen() {
    const [username, setUsername] = useState('');
    const [userRole, setUserRole] = useState('');
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const savedUsername = await AsyncStorage.getItem('username');
                const savedUserRole = await AsyncStorage.getItem('userRole');
                if (savedUsername) setUsername(savedUsername);
                if (savedUserRole) setUserRole(savedUserRole);
            } catch (e) {
                console.error('Ошибка загрузки данных:', e);
            }
        })();
    }, []);

    const handleLogout = async () => {

        try {
            await AsyncStorage.multiRemove(['isLoggedIn', 'username', 'password', 'userRole']);
            router.replace('/');
        } catch (e) {
            console.error('Ошибка выхода:', e);
            Alert.alert('Ошибка', 'Не удалось выйти из аккаунта');
        }

    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Карточка профиля */}
                <TouchableOpacity style={styles.profileCard} activeOpacity={0.8}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={22} color="#b6b6b6"/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.profileName}>{username || 'Рамазанов М.'}</Text>
                        <Text style={styles.profileClass}>Класс 11‑В</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#F73D48"/>
                </TouchableOpacity>

                {/* Сетка информеров */}
                <View style={styles.gridRow}>
                    <InfoTile
                        icon={<FontAwesome5 name="school" size={22} color="#F73D48"/>}
                        title="Мой класс"
                        subtitle="21 ученик"
                    />
                    <InfoTile
                        wide
                        icon={<Octicons name="bell-fill" size={20} style={{transform: [{rotate: '45deg'}]}}
                                        color="#F73D48"/>}
                        title="Расписание"
                        subtitle="До следующего урока 12 минут"
                        right={<FontAwesome5 name="bell" size={14} color="#F73D48"/>}
                    />
                </View>

                <View style={styles.gridRow}>
                    <InfoTile
                        icon={<AntDesign name="like1" size={24} color="#F73D48"/>}
                        title="Программа"
                        subtitle="12 предметов"
                        small
                    />
                    <InfoTile
                        icon={<FontAwesome5 name="medal" size={21} color="#F73D48"/>}
                        title="4.8"
                        subtitle="Средняя оценка"
                        small
                    />
                    <InfoTile
                        icon={<MaterialCommunityIcons name="school" size={26} color="#F73D48"/>}
                        title="Курсы"
                        subtitle="4 добавлено"
                        small
                    />
                </View>

                {/* Раздел: Настройки */}
                <SectionCard title="Настройки">
                    <RowItem title="Уведомления" onPress={() => {
                    }}>
                        <Ionicons name="chevron-forward" size={18} color="#C1C7CD"/>
                    </RowItem>
                    <RowDivider/>
                    <RowItem title="Конфиденциальность" onPress={() => {
                    }}>
                        <Ionicons name="chevron-forward" size={18} color="#C1C7CD"/>
                    </RowItem>
                </SectionCard>

                {/* Раздел: Поддержка */}
                <SectionCard title="Поддержка">
                    <RowItem title="Не могу войти" onPress={() => {
                    }}>
                        <Ionicons name="chevron-forward" size={18} color="#C1C7CD"/>
                    </RowItem>
                    <RowDivider/>
                    <RowItem title="Неверно занятия" onPress={() => {
                    }}>
                        <Ionicons name="chevron-forward" size={18} color="#C1C7CD"/>
                    </RowItem>
                    <RowDivider/>
                    <RowItem title="Про ограничения по времени" onPress={() => {
                    }}>
                        <Ionicons name="chevron-forward" size={18} color="#C1C7CD"/>
                    </RowItem>
                </SectionCard>

                {/* Выход */}
                <TouchableOpacity style={styles.logoutRow} onPress={handleLogout} activeOpacity={0.8}>
                    <Ionicons name="log-out-outline" size={18} color="#F73D48"/>
                    <Text style={styles.logoutText}>Выйти из аккаунта</Text>
                </TouchableOpacity>
            </ScrollView>
        </ThemedView>
    );
}

/* --- Вспомогательные компоненты --- */

function InfoTile({icon, title, subtitle, small = false, wide = false}) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[
                styles.tile,
                small && styles.tileSmall,
                wide && styles.tileWide,

            ]}
        >
            <View style={styles.tileIcon}>{icon}</View>
            <View style={{flex: 1}}>
                <Text style={[styles.tileTitle, small && {fontSize: 13}]}>{title}</Text>
                {!!subtitle && (
                    <Text style={[styles.tileSubtitle, small && {fontSize: 12}]} numberOfLines={1}>
                        {subtitle}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

function SectionCard({title, children}) {
    return (
        <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionBody}>{children}</View>
        </View>
    );
}

function RowItem({title, children, onPress}) {
    return (
        <TouchableOpacity style={styles.rowItem} onPress={onPress} activeOpacity={0.7}>
            <Text style={styles.rowTitle}>{title}</Text>
            <View style={{marginLeft: 12}}>{children}</View>
        </TouchableOpacity>
    );
}

function RowDivider() {
    return <View style={styles.rowDivider}/>;
}

/* --- Стили --- */

const CARD_BG = '#F7F7F7';
const BORDER = '#E8E8E8';
const TEXT_DARK = '#333';
const TEXT_MUTED = '#666';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 16,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CARD_BG,
        borderRadius: 14,
        padding: 14,
        marginBottom: 16,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#E8E8E8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    profileName: {
        fontSize: 19,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    profileClass: {
        fontSize: 15,
    },

    gridRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    tile: {
        flex: 1,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 12,
        alignItems: 'flex-start',
        minHeight: 93,
    },
    tileSmall: {
        flex: 1,
        minHeight: 92,
    },
    tileWide: {
        flex: 2,
    },
    tileIcon: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    tileTitle: {
        marginTop: 6,
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    tileSubtitle: {
        fontSize: 13,
        color: TEXT_MUTED,
    },

    /* Разделы */
    sectionCard: {
        backgroundColor: CARD_BG,
        borderRadius: 14,
        padding: 14,
        marginTop: 12,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_DARK,
        marginBottom: 8,
    },
    sectionBody: {
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        overflow: 'hidden',
    },
    rowItem: {
        paddingVertical: 14,
        paddingHorizontal: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowTitle: {
        fontSize: 15,
        color: TEXT_DARK,
    },
    rowDivider: {
        height: 1,
        backgroundColor: '#EFEFEF',
    },

    /* Logout */
    logoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        justifyContent: 'center',
        marginBottom: 24,
    },
    logoutText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#F73D48',
    },
});
