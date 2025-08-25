import React, {useState, useRef, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from "@expo/vector-icons/Entypo";

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
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
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollViewRef = useRef();
    const navigation = useNavigation();

    // Автопрокрутка к последнему сообщению
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
    }, [messages, isTyping]);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                isUser: true
            };

            setMessages([...messages, newMessage]);
            setMessage('');

            // Имитация ответа бота
            setIsTyping(true);
            setTimeout(() => {
                const botResponse = {
                    id: messages.length + 2,
                    text: getBotResponse(message),
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                    isUser: false
                };
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
            }, 1500);
        }
    };

    // Простая логика ответов бота
    const getBotResponse = (userMessage) => {
        const lowerMsg = userMessage.toLowerCase();

        if (lowerMsg.includes('привет') || lowerMsg.includes('здравствуй')) {
            return 'Привет! Чем могу помочь?';
        } else if (lowerMsg.includes('математик')) {
            return 'Математика - это интересно! Какой именно вопрос?';
        } else if (lowerMsg.includes('спасибо')) {
            return 'Всегда рад помочь! Обращайтесь ещё.';
        } else if (lowerMsg.includes('как дела')) {
            return 'У меня всё отлично! Готов помогать вам с учебой.';
        } else {
            const responses = [
                'Интересный вопрос! Давайте разберемся вместе.',
                'Хм, мне нужно подумать над этим...',
                'У меня есть несколько идей по этому поводу.',
                'Да, я могу помочь с этим. Что именно вас интересует?',
                'Отличный вопрос! Давайте обсудим его подробнее.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
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
                        <Entypo name="chevron-left" size={30} color="black"/>
                    </TouchableOpacity>
                    <View style={styles.chatInfo}>
                        <Text style={styles.chatTitle}>ИИ ассистент</Text>
                    </View>
                    <View style={styles.placeholder}/>
                </View>
            </View>

            <KeyboardAvoidingView
                style={styles.flex1}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={90}
            >
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

                    {isTyping && (
                        <View style={[styles.messageBubble, styles.botMessage]}>
                            <View style={styles.typingIndicator}>
                                <View style={styles.typingDot}></View>
                                <View style={styles.typingDot}></View>
                                <View style={styles.typingDot}></View>
                            </View>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Cообщение"
                            placeholderTextColor="#16161680"
                            value={message}
                            onChangeText={setMessage}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
                            onPress={sendMessage}
                            disabled={!message.trim()}
                        >
                            <Text style={styles.sendText}>↑</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    flex1: {
        flex: 1,
    },
    chatHeader: {
        width: '100%',
        paddingTop: 50,
        paddingBottom: 10,
        // height: 60,
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
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    sendText: {
        textAlign: 'center',
        fontSize: 28,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
    },
    typingDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#888',
        marginHorizontal: 2,
    },
});

export default ChatScreen;