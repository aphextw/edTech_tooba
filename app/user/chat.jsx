import React, {useState, useRef} from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const scrollViewRef = useRef();
    const navigation = useNavigation();

    const messages = [
        {
            id: 1,
            text: "Привет! Как дела? Чем могу помочь?",
            time: "12:30",
            isUser: false
        },
        {
            id: 2,
            text: "Привет! У меня вопрос по домашнему заданию по математике",
            time: "12:31",
            isUser: true
        },
        {
            id: 3,
            text: "Конечно! Какой именно вопрос?",
            time: "12:32",
            isUser: false
        }
    ];

    const sendMessage = () => {
        if (message.trim()) {
            // Здесь логика отправки сообщения
            setMessage('');
        }
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Заголовок чата */}
            <View style={styles.chatHeader}>
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.backButton} onPress={goBack}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.chatInfo}>
                        <Text style={styles.chatTitle}>Чат джпт</Text>
                        <Text style={styles.status}>Онлайн</Text>
                    </View>
                    <View style={styles.placeholder}/>
                </View>
            </View>

            {/* Область сообщений */}
            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageBubble,
                            msg.isUser ? styles.userMessage : styles.botMessage
                        ]}
                    >
                        <Text style={[
                            styles.messageText,
                            msg.isUser ? styles.userMessageText : styles.botMessageText
                        ]}>
                            {msg.text}
                        </Text>
                        <Text style={[
                            styles.messageTime,
                            msg.isUser ? styles.userMessageTime : styles.botMessageTime
                        ]}>
                            {msg.time}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Cообщение"
                        placeholderTextColor="#16161680"
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendText}>↑</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
    },
    chatHeader: {
        width: '100%',
        height: 60,
        backgroundColor: '#F1F3F6',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEFF0',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    chatInfo: {
        alignItems: 'center',
    },
    chatTitle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '500',
        color: '#161616',
    },
    status: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '400',
        color: '#00AB00',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: {
        fontSize: 24,
        color: '#161616',
    },
    placeholder: {
        width: 40,
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    messagesContent: {
        padding: 16,
    },
    messageBubble: {
        maxWidth: '75%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#F1F3F6',
        borderBottomLeftRadius: 4,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#161616',
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 4,
    },
    botMessageText: {
        color: '#161616',
        fontFamily: 'Roboto',
        fontWeight: '400',
    },
    userMessageText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontWeight: '400',
    },
    messageTime: {
        fontSize: 10,
        opacity: 0.6,
        alignSelf: 'flex-end',
    },
    botMessageTime: {
        color: '#000000',
    },
    userMessageTime: {
        color: '#FFFFFF',
    },
    inputContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EEEFF0',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    textInput: {
        flex: 1,
        height: 44,
        backgroundColor: '#F1F3F6',
        borderRadius: 22,
        paddingHorizontal: 16,
        fontSize: 15,
        fontFamily: 'Roboto',
        color: '#161616',
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: '#161616',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default ChatScreen;