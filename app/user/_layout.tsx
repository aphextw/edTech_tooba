import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
    // const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#F73D48", // Красный для активного таба
                tabBarInactiveTintColor: "#B1B1B1", // Серый для неактивного таба
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarStyle: {
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    elevation: 5,
                    height: 87,
                },
            }}>
            <Tabs.Screen
                name="main"
                options={{
                    title: 'Главная',
                    tabBarIcon: ({focused}) => (
                        <IconSymbol
                            size={28}
                            name="house.fill"
                            color={focused ? "#F73D48" : "#B1B1B1"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="study"
                options={{
                    title: 'Учеба',
                    tabBarIcon: ({focused}) => (
                        <MaterialCommunityIcons name="school" size={26} color={focused ? "#F73D48" : "#B1B1B1"}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profilePage"
                options={{
                    title: 'Профиль',
                    tabBarIcon: ({focused}) => (
                        <FontAwesome
                            name="user"
                            size={24}
                            color={focused ? "#F73D48" : "#B1B1B1"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'чат',
                    href: null,
                    tabBarIcon: ({focused}) => (
                        <FontAwesome
                            name="user"
                            size={24}
                            color={focused ? "#F73D48" : "#B1B1B1"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="grades"
                options={{
                    title: 'чат',
                    href: null,
                    tabBarIcon: ({focused}) => (
                        <FontAwesome
                            name="user"
                            size={24}
                            color={focused ? "#F73D48" : "#B1B1B1"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: 'чаты',
                    href: null,
                    tabBarIcon: ({focused}) => (
                        <FontAwesome
                            name="user"
                            size={24}
                            color={focused ? "#F73D48" : "#B1B1B1"}
                        />
                    ),
                }}
            />

        </Tabs>
    );
}