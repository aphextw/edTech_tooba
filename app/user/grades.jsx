import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import {useRouter} from "expo-router";

// Включим LayoutAnimation для Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

// Mock data for demonstration
const mockSubjectGrades = [
    {id: '1', emoji: '📚', title: 'Mathematics', subtitle: 'Algebra & Geometry', average: 4.5},
    {id: '2', emoji: '🧪', title: 'Chemistry', subtitle: 'Organic Chemistry', average: 4.2},
    {id: '3', emoji: '🔭', title: 'Physics', subtitle: 'Mechanics', average: 4.7},
    {id: '4', emoji: '🌍', title: 'Geography', subtitle: 'World Geography', average: 4.0},
    {id: '5', emoji: '📖', title: 'Literature', subtitle: 'Modern Literature', average: 4.8},
]

export default function GradesScreen() {
    const [selectedTab, setSelectedTab] = useState('grades');
    const [searchText, setSearchText] = useState('');
    const [expandedItems, setExpandedItems] = useState({});
    const [filteredItems, setFilteredItems] = useState(mockSubjectGrades);

    const router = useRouter();

    // Filter items based on search text
    React.useEffect(() => {
        const filtered = mockSubjectGrades.filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [searchText]);

    const toggleExpand = (id) => {
        // Анимация раскрытия/скрытия
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
            >
                <TouchableOpacity style={{marginLeft: 10, marginTop: 50}} onPress={() => {
                    router.back()
                }}>
                    <Entypo name="chevron-left" size={30} color="black"/>
                </TouchableOpacity>
                {/* Search + bell */}
                <View style={styles.searchRow}>
                    <View style={styles.searchInputContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Поиск"
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholderTextColor="#8E8E93"
                        />
                    </View>
                    <TouchableOpacity style={styles.bellButton}>
                        <Ionicons name="notifications" size={20} color="#000"/>
                    </TouchableOpacity>
                </View>

                {/* Title */}
                <View style={[styles.titleHero, {marginTop: 20}]}>
                    <View style={{flexDirection: "row"}}>
                        <View style={[styles.titleHero, {marginTop: 10}]}>
                            <Text style={styles.titleText}>
                                {selectedTab === 'grades' ? 'Оценки' : 'Пропуски'}
                            </Text>
                            <Text style={styles.subtitleText}>
                                {selectedTab === 'grades'
                                    ? 'Средние результаты за предметы'
                                    : 'Информация по пропускам'}
                            </Text>
                        </View>

                        <Text style={{fontSize: 50}}>
                            {selectedTab === 'grades'
                                ? '🏆'
                                : '🫠'}
                        </Text>
                    </View>
                </View>

                {/* Segmented Control */}
                <View style={styles.segmentedControl}>
                    <TouchableOpacity
                        style={[
                            styles.segment,
                            selectedTab === 'grades' && styles.activeSegment
                        ]}
                        onPress={() => setSelectedTab('grades')}
                    >
                        <Text style={[
                            styles.segmentText,
                            selectedTab === 'grades' && styles.activeSegmentText
                        ]}>
                            Оценки
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.segment,
                            selectedTab === 'skips' && styles.activeSegment
                        ]}
                        onPress={() => setSelectedTab('skips')}
                    >
                        <Text style={[
                            styles.segmentText,
                            selectedTab === 'skips' && styles.activeSegmentText
                        ]}>
                            Пропуски
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                {selectedTab === 'grades' ? (
                    <GradesListView
                        items={filteredItems}
                        expandedItems={expandedItems}
                        toggleExpand={toggleExpand}
                    />
                ) : (
                    <AbsencesView/>
                )}
            </ScrollView>
        </View>
    );
}

const GradesListView = ({items, expandedItems, toggleExpand}) => {
    return (
        <View style={styles.gradesList}>
            {items.map(item => (
                <GradeRow
                    key={item.id}
                    item={item}
                    isExpanded={expandedItems[item.id]}
                    toggleExpand={() => toggleExpand(item.id)}
                />
            ))}
        </View>
    );
};

const GradeRow = ({item, isExpanded, toggleExpand}) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    // Анимация стрелки
    React.useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: isExpanded ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isExpanded]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    // Анимация высоты контента
    const heightAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: isExpanded ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isExpanded]);

    const contentHeight = heightAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 120] // Высота раскрытого контента
    });

    const opacityAnim = heightAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 1]
    });

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={toggleExpand}
            activeOpacity={0.7}
        >
            <View style={styles.gradeRowContent}>
                <Text style={styles.emojiIcon}>{item.emoji}</Text>

                <View style={styles.gradeInfo}>
                    <Text style={styles.subjectTitle}>{item.title}</Text>
                    <Text style={styles.subjectSubtitle}>{item.subtitle}</Text>
                </View>

                <Text
                    style={[styles.gradeValue, {color: item.average >= 4 ? "#009C1A" : item.average >= 3 ? "#FFB200" : "red"}]}>
                    {item.average.toFixed(1)}</Text>

                <Animated.View style={{transform: [{rotate}]}}>
                    <Ionicons
                        name="chevron-down"
                        size={20}
                        color="#8E8E93"
                    />
                </Animated.View>
            </View>

            <Animated.View
                style={[
                    styles.expandedContent,
                    {
                        height: contentHeight,
                        opacity: opacityAnim
                    }
                ]}
            >
                <View style={styles.divider}/>
                <Text style={styles.quarterGrade}>1 четверть: 4.5</Text>
                <Text style={styles.quarterGrade}>2 четверть: 4.3</Text>
                <Text style={styles.quarterGrade}>3 четверть: 4.7</Text>
                <Text style={styles.quarterGrade}>4 четверть: 4.4</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const AbsencesView = () => {
    return (
        <View style={styles.absencesContainer}>
            <Text style={styles.absencesText}>
                Информация о пропусках появится здесь
            </Text>
        </View>
    );
};

// Стили остаются без изменений, как в вашем предыдущем коде
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingBottom: 10,
        paddingTop: 8,
    },
    titleHero: {
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 15,
        paddingHorizontal: 16,
    },
    subtitleText: {
        fontSize: 16,
    },
    titleText: {
        fontSize: 22,
        fontWeight: '800',
        lineHeight: 38,
    },
    redText: {
        color: '#F73D48',
    },
    card: {
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        marginBottom: 5,
        padding: 12,
        paddingVertical: 20,
        overflow: 'hidden', // Важно для анимации
    },
    searchInputContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        marginRight: 12,
        height: 44,
        justifyContent: 'center',
    },
    bellButton: {
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 44,
        width: 44,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 20
    },
    searchInput: {
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000000',
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: 'hidden',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    segment: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
    },
    activeSegment: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    segmentText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8E8E93',
    },
    activeSegmentText: {
        color: '#000',
    },
    gradesList: {
        paddingHorizontal: 16,
        gap: 12,
    },
    gradeRowContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emojiIcon: {
        fontSize: 26,
        marginRight: 12,
    },
    gradeInfo: {
        flex: 1,
    },
    subjectTitle: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 2,
    },
    subjectSubtitle: {
        fontSize: 13,
        color: '#8E8E93',
    },
    gradeValue: {
        fontSize: 17,
        fontWeight: '700',
        marginRight: 12,
    },
    expandedContent: {
        paddingTop: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 8,
    },
    quarterGrade: {
        fontSize: 13,
        color: '#666666',
        marginBottom: 4,
    },
    absencesContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        alignItems: 'center',
    },
    absencesText: {
        fontSize: 16,
        color: '#8E8E93',
    },
    // Additional styles from your list
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        marginBottom: 28,
        gap: 12,
    },
    imgOuter: {
        borderColor: '#F73D48',
        borderRadius: 16,
        borderWidth: 2,
        padding: 2,
    },
    imgInner: {
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        overflow: 'hidden',
    },
    img: {
        width: 86,
        height: 110,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    panel: {
        flex: 1,
        minHeight: 120,
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        padding: 16,
        position: 'relative', // важно для позиционирования фона
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '135%',
        height: '130%',
        resizeMode: 'cover', // растягиваем на весь фон
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 1, // чтобы текст был поверх фона
    },
    askSection: {
        borderBottomRightRadius: 32,
        borderBottomLeftRadius: 32,
        backgroundColor: '#F6F6F6',
        paddingVertical: 19,
        marginBottom: 20,
        padding: 17,
    },
    calendarHeader: {
        flexDirection: 'column',
        marginBottom: 12,
    },
    askInput: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        fontSize: 16,
    },
    askActionsRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#F6F6F6',
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    chipIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    chipText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
    },
    searchFab: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#0F0F10',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchFabIcon: {
        fontSize: 16,
        color: '#FFFFFF',
        lineHeight: 16,
    },
    lessonCount: {
        fontSize: 14,
        color: '#F73D48',
    },
    weekdaysRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: 4,
    },
    weekdayCell: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekdayCellSelected: {
        backgroundColor: 'rgba(247, 61, 72, 0.12)',
    },
    weekdayText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    weekdayTextSelected: {
        color: '#F73D48',
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dayCell: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 10,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    dayCellSelected: {
        backgroundColor: '#F73D48',
    },
    dayText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    dayTextSelected: {
        color: '#FFFFFF',
    },
    primaryButton: {
        backgroundColor: '#F73D48',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: 13,
        minHeight: 44,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '600',
    },
    carouselHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    carouselTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    carouselSubtitle: {
        fontSize: 16,
        color: '#666666',
    },
    carouselIcon: {
        fontSize: 44,
    },
    carouselContent: {
        paddingRight: 4,
    },
    materialItem: {
        width: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginRight: 12,
    },
    materialImage: {
        height: 110,
        backgroundColor: '#F1F3F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    materialIcon: {
        fontSize: 32,
    },
    materialTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 4,
    },
    materialTopics: {
        fontSize: 12,
        color: '#666666',
    },
    homeworkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#F7f7f7',
    },
    homeworkIcon: {
        marginRight: 12,
        fontSize: 16,
    },
    homeworkTitle: {
        fontSize: 14,
        color: '#000000',
    },
    ocrContent: {
        height: 140,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ocrIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    ocrText: {
        fontSize: 12,
        color: '#666666',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#666666',
        marginTop: 2,
    },
    trailingIcon: {
        fontSize: 44,
    },
});