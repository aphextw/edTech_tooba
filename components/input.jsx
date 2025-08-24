import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    useColorScheme,
} from 'react-native';

export default function CustomInput({
                                        placeholder,
                                        value,
                                        onChangeText,
                                        secureTextEntry = false,
                                        keyboardType = 'default'
                                    }) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View style={[
            styles.inputContainer,
            isDark && styles.inputContainerDark
        ]}>
            <Text style={[
                styles.placeholder,
                isDark && styles.placeholderDark
            ]}>
                {placeholder}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    isDark && styles.inputDark
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="transparent"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        backgroundColor: '#F6F6F6',
        position: 'relative',
        borderRadius: 8,
        paddingTop: 5,
    },
    inputContainerDark: {
        backgroundColor: '#2C2C2E',
    },
    placeholder: {
        position: 'absolute',
        left: 10,
        // fontWeight: 'bold',
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 5,
        fontSize: 14,
        // color: '#F73D48',
        zIndex: 1,
        paddingTop: 5,
    },
    placeholderDark: {
        backgroundColor: '#2C2C2E',
        color: '#fff',
    },
    input: {
        borderRadius: 8,
        width: '100%',
        minHeight: 50,
        marginTop: 6,
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#F73D48',
    },
    inputDark: {
        backgroundColor: '#2C2C2E',
        color: '#FFFFFF',
    },
});