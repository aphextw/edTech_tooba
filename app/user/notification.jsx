import React from 'react';
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {router} from "expo-router";

export default function NotificationsScreen(navigation) {
    const goBack = () => router.back();

    return (
        <View style={s.page}>
            {/* Header */}
            <View style={s.header}>
                <Pressable style={s.headerBtn} onPress={goBack}>
                    <Ionicons name="chevron-back" size={22} color="#111"/>
                </Pressable>
                <Text style={s.headerTitle}>Уведомления</Text>
            </View>

            <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
                {/* New count */}
                <Text style={s.newCount}>1 новое уведомление</Text>

                {/* New notification */}
                <NotificationItem
                    title={<>
                        Через <Text style={s.bold}>20 минут</Text>{' '}
                        <Text style={s.link}>Контрольная работа</Text>
                    </>}
                    meta="только что"
                    unread
                />

                <View style={s.divider}/>

                {/* Seen header */}
                <Text style={s.seenHeader}>Просмотренные</Text>

                {/* Seen item */}
                <NotificationItem
                    title="Не забудьте выполнить домашнее задание по математике"
                    meta="вчера 20:12"
                />
            </ScrollView>
        </View>
    );
}

function NotificationItem({title, meta, unread = false,}) {
    return (
        <View style={s.itemWrap}>
            {/* Avatar + badge */}
            <View style={s.avatarWrap}>
                <View style={s.avatar}>
                    <Text style={s.avatarEmoji}>🫡</Text>
                </View>
                <View style={s.badge}>
                    <Ionicons name="heart" size={10} color="#fff"/>
                </View>
            </View>

            {/* Texts */}
            <View style={{flex: 1}}>
                <Text style={[s.itemTitle, unread && {color: '#111'}]}>{title}</Text>
                <Text style={s.itemMeta}>{meta}</Text>
            </View>
        </View>
    );
}

/* ---------------- styles ---------------- */

const s = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 58,
    },

    header: {
        height: 48,
        paddingHorizontal: 12,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ECECEC',
    },
    headerBtn: {
        width: 42, height: 42,
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
    },

    body: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 32,
    },

    newCount: {
        fontSize: 14,
        color: '#111',
        marginBottom: 8,
    },

    itemWrap: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingRight: 4,
    },

    avatarWrap: {marginRight: 10},
    avatar: {
        width: 52, height: 52,
        borderRadius: 30,
        backgroundColor: '#C7F5D4',
        alignItems: 'center', justifyContent: 'center',
    },
    avatarEmoji: {fontSize: 20},
    badge: {
        position: 'absolute',
        right: -2, bottom: -2,
        width: 18, height: 18,
        borderRadius: 9,
        backgroundColor: '#F73D48',
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: '#fff',
    },

    itemTitle: {
        fontSize: 16,
        color: '#222',
        lineHeight: 20,

    },
    bold: {fontWeight: '700', fontSize: 16},
    link: {color: '#F73D48', fontWeight: '700', fontSize: 16},

    itemMeta: {
        marginTop: 4,
        fontSize: 12,
        color: '#9E9E9E',
    },

    divider: {
        height: 1,
        backgroundColor: '#EFEFEF',
        marginVertical: 10,
    },

    seenHeader: {
        fontSize: 14,
        color: '#9E9E9E',
        marginBottom: 8,
    },
});
