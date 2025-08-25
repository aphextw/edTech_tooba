import {useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    StyleSheet,
    SafeAreaView, Platform,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import {useRouter} from "expo-router";
import {ThemedView} from "../../components/ThemedView";
import {ThemedText} from "../../components/ThemedText";
import {MaterialIcons} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import Svg, {Path} from "react-native-svg";

const MainView = () => {
    const [searchText, setSearchText] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [selectedWeekday, setSelectedWeekday] = useState(new Date().getDay() || 7);
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());

    const router = useRouter();


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <ThemedView style={styles.content}>
                    {/* Поиск + закладки */}
                    <SearchRow searchText={searchText} setSearchText={setSearchText} router={router}/>

                    {/* «Спросите что-нибудь» */}
                    <AskSection questionText={questionText} setQuestionText={setQuestionText} router={router}/>

                    <View style={{
                        paddingHorizontal: 12,

                    }}>
                        {/* Заголовок */}
                        <TitleHero/>

                        {/* Факт дня */}
                        <FactOfTheDayCard/>

                        <View style={{
                            ...Platform.select({
                                web: {
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 70,
                                },
                            })
                        }}>
                            {/* Календарь занятий */}
                            <LessonsCalendarCard
                                selectedWeekday={selectedWeekday}
                                setSelectedWeekday={setSelectedWeekday}
                                selectedDay={selectedDay}
                                setSelectedDay={setSelectedDay}
                            />

                            {/* Учебные материалы */}
                            <MaterialsCarousel/>

                            {/* Оценки */}
                            <GradesCard router={router}/>

                            {/* Домашняя работа */}
                            <HomeworkCard/>


                            {/* Цифровизация лекций */}
                            <OCRCard/>
                        </View>
                    </View>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
};

const SearchRow = ({searchText, setSearchText, router}) => (
    <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Поиск..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#9AA0A6"
            />
        </View>

        <TouchableOpacity style={styles.bellButton} onPress={() => {
            router.replace("./notification")
        }}>
            <Octicons name="bell-fill" size={24} style={{transform: [{rotate: '45deg'}]}} color="black"/>
        </TouchableOpacity>
    </View>
);

const AskSection = ({questionText, setQuestionText, router}) => (
    <View style={styles.askSection}>
        <View style={{backgroundColor: "#fff", borderRadius: 16, padding: 10, paddingVertical: 5}}>
            <View>
                <TextInput
                    style={styles.askInput}
                    placeholder="Спросите что-нибудь..."
                    value={questionText}
                    onChangeText={setQuestionText}
                    placeholderTextColor="#9AA0A6"
                    onSubmitEditing={() => {
                        console.log("Пользователь нажал Enter/Submit");
                        router.push('./chat');
                    }}
                    returnKeyType="send" // Меняет текст кнопки на клавиатуре
                />
                <View style={styles.askActionsRow}>
                    <TouchableOpacity
                        style={styles.chip}
                        onPress={() => {
                        }}
                        activeOpacity={0.8}
                    >
                        <Feather name="book-open" size={16} color="black"/>
                        <Text style={styles.chipText}>{" "}Материал</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.searchFab}
                        onPress={() => {
                            router.push("./chat")
                        }}
                        activeOpacity={0.8}
                    >
                        <Entypo name="magnifying-glass" size={18} color="#fff"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
);

const TitleHero = () => (
    <View style={styles.titleHero}>
        <Text style={styles.titleText}>
            <Text style={styles.redText}>Перемен </Text>
            <ThemedText style={styles.titleText}>требуют</ThemedText>
        </Text>
        <ThemedText style={styles.titleText}>
            наши сердца
        </ThemedText>
    </View>
);

const FactOfTheDayCard = () => (
    <View style={styles.wrap}>
        <View style={styles.imgOuter}>
            <View style={styles.imgInner}>
                <Image source={require('../../assets/images/image 1.png')} style={styles.img}/>
            </View>
        </View>

        <View style={styles.panel}>
            <Image
                source={require('../../assets/images/Vector 3.png')}
                style={styles.backgroundImage}
            />

            <View style={styles.textRow}>
                <MaterialIcons name="lightbulb" size={20} color="#F73D48" style={{marginRight: 8, marginTop: 2}}/>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>Факт дня</Text>
                    <Text style={styles.subtitle}>Пётр 1 никогда не ел шоколад</Text>
                </View>
            </View>
        </View>
    </View>
);

const LessonsCalendarCard = ({selectedWeekday, setSelectedWeekday, selectedDay, setSelectedDay}) => {
    const week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const days = [11, 12, 13, 14, 15, 16, 17];

    return (
        <View style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.calendarHeader}>
                    <Text style={styles.lessonCount}>Сегодня 3 урока</Text>
                    {/* Иконка */}
                    <Text style={styles.carouselTitle}>Календарь занятий</Text>
                    <Text style={styles.carouselSubtitle}>Через 2 дня выходной день</Text>
                </View>
                <Text style={styles.carouselIcon}>📚</Text>
            </View>

            <View style={{backgroundColor: "#fff", borderRadius: 12, padding: 8, marginBottom: 8}}>
                <View style={styles.weekdaysRow}>
                    {week.map((day, index) => (
                        <WeekdayCell
                            key={index}
                            title={day}
                            isSelected={index + 1 === selectedWeekday}
                            onPress={() => setSelectedWeekday(index + 1)}
                        />
                    ))}
                </View>
            </View>

            <View style={{backgroundColor: "#fff", borderRadius: 12, padding: 8,}}>
                <View style={styles.weekdaysRow}>
                    {days.map((day, index) => (
                        <WeekdayCell
                            key={day}
                            title={day}
                            isSelected={index + 1 === selectedWeekday}
                            onPress={() => setSelectedWeekday(index + 1)}
                        />
                    ))}
                </View>
            </View>

            <PrimaryButton
                title="Посмотреть расписание"
                onPress={() => {
                }}
            />

            <SecondaryButton
                title="Добавить запись"
                icon="pencil"
                onPress={() => {
                }}
            />
        </View>
    );
};

// MARK: - Cells
const WeekdayCell = ({title, isSelected, onPress}) => (
    <TouchableOpacity
        style={[
            styles.weekdayCell,
            isSelected && styles.weekdayCellSelected
        ]}
        onPress={onPress}
    >
        <Text style={[
            styles.weekdayText,
            isSelected && styles.weekdayTextSelected
        ]}>
            {title}
        </Text>
    </TouchableOpacity>
);

const DayCell = ({day, isSelected, onPress}) => (
    <TouchableOpacity
        style={[
            styles.dayCell,
            isSelected && styles.dayCellSelected
        ]}
        onPress={onPress}
    >
        <Text style={[
            styles.dayText,
            isSelected && styles.dayTextSelected
        ]}>
            {day}
        </Text>
    </TouchableOpacity>
);

// MARK: - Buttons
const PrimaryButton = ({title, onPress}) => (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
        <Text style={styles.primaryButtonText}>{title}</Text>
        {/* Иконка стрелки */}
        <Feather name="chevron-right" size={24} color="#fff"/>
    </TouchableOpacity>
);

const SecondaryButton = ({title, icon, onPress}) => (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
        <Text style={styles.secondaryButtonText}>{title}</Text>
        {/* Иконка */}
    </TouchableOpacity>
);

// MARK: - MaterialsCarousel
const MaterialsCarousel = () => {
    const items = [
        {id: '1', title: "История", topics: 36, image: "📚"},
        {id: '2', title: "Математика+", topics: 20, image: "📐"},
        {id: '3', title: "Русский язык", topics: 52, image: "📖"}
    ];

    return (
        <View style={styles.card}>
            <View style={styles.carouselHeader}>
                <View>
                    <Text style={styles.carouselTitle}>Учебные материалы</Text>
                    <Text style={styles.carouselSubtitle}>База знаний по учебным предметам</Text>
                </View>
                <Text style={styles.carouselIcon}>📚</Text>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={items}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <View style={styles.materialItem}>
                        <View style={styles.materialImage}>
                            <Text style={styles.materialIcon}>{item.image}</Text>
                        </View>
                        <Text style={styles.materialTitle}>{item.title}</Text>
                        <Text style={styles.materialTopics}>{item.topics} тем</Text>
                    </View>
                )}
                contentContainerStyle={styles.carouselContent}
            />
        </View>
    );
};

// MARK: - HomeworkCard
const HomeworkCard = () => (
    <SectionCard
        title="Домашняя работа"
        subtitle="4 домашних задания на неделю"
        trailingIcon="🏠"
        content={
            <View>
                <HomeworkRow text="🧮" title="3 упражнения"/>
                <View style={styles.divider}/>
                <HomeworkRow text="🪆" title="Литература — 1 задание"/>
                <View style={styles.divider}/>
                <HomeworkRow text="🌎" title="География — 6 упражнений"/>
            </View>
        }
        footer={
            <PrimaryButton
                title="Посмотреть все задания"
                onPress={() => {
                }}
            />
        }
    />
);

const HomeworkRow = ({text, title}) => (
    <View style={styles.homeworkRow}>
        <Text style={styles.homeworkIcon}>{text}</Text>
        <Text style={styles.homeworkTitle}>{title}</Text>
    </View>
);

// MARK: - GradesCard
const GradesCard = ({onAllTap, router}) => {
    const grades = [
        {id: '1', name: "Русский язык", value: "4.3"},
        {id: '2', name: "Математика", value: "5.0"},
        {id: '3', name: "География", value: "3.6"}
    ];

    return (
        <SectionCard
            title="Оценки"
            subtitle="Средние результаты за предметы"
            trailingIcon="🏆"
            content={
                <View>
                    {grades.map((grade, index) => (
                        <View key={grade.id}>
                            <View style={styles.gradeRow}>
                                <Text style={styles.gradeName}>{grade.name}</Text>
                                <Text
                                    style={[styles.gradeValue, {color: grade.value >= 4 ? "#009C1A" : grade.value >= 3 ? "#FFB200" : "red"}]}>{grade.value}</Text>
                            </View>
                            {index < grades.length - 1 && <View style={styles.divider}/>}
                        </View>
                    ))}
                </View>
            }
            footer={
                <PrimaryButton
                    title="Посмотреть все оценки"
                    onPress={() => {
                        router.replace('./grades')
                    }}
                />
            }
        />
    );
};

// MARK: - OCRCard
const OCRCard = () => (
    <SectionCard
        title="Цифровизация лекций"
        subtitle="ИИ распознает текст с фотки и переведёт их в элек-ый формат"
        trailingIcon="💻"
        content={
            <TouchableOpacity onPress={() => {
                console.log("openCamera")
            }}>
                <View style={styles.ocrContent}>
                    <Text style={styles.ocrIcon}>📷</Text>
                    <Text style={styles.ocrText}>Добавьте фото</Text>
                </View>
            </TouchableOpacity>
        }
        footer={
            <PrimaryButton
                title="Сфотографировать"
                onPress={() => {
                }}
            />
        }
    />
);

const SectionCard = ({title, subtitle, trailingIcon, content, footer}) => (
    <View style={styles.card}>
        <View style={styles.sectionHeader}>
            <View style={{maxWidth: "75%"}}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
            </View>
            {trailingIcon && <Text style={styles.trailingIcon}>{trailingIcon}</Text>}
        </View>

        {content}

        {footer}
    </View>
);

const styles = StyleSheet.create({
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
        alignItems: 'flex-start',
        zIndex: 1, // чтобы текст был поверх фона
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
    },

    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        ...Platform.select({
            web: {},
        })
    },
    scrollView: {
        flex: 1,
    },
    content: {
        backgroundColor: "#fff",
        // paddingHorizontal: 16,
        paddingBottom: 10,
        paddingTop: 8,
    },
    titleHero: {
        marginBottom: 28,
    },
    subtitleText: {
        fontSize: 30,
        lineHeight: 36, // добавьте lineHeight для лучшего отображения
    },
    titleText: {
        color: "#000",
        fontSize: 32,
        fontWeight: '800',
        lineHeight: 38,
    },
    redText: {
        color: '#F73D48',
    },
    card: {
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        paddingVertical: 20,

        ...Platform.select({
            web: {
                width: 550,
            },
        }),
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
        marginTop: 45
    },
    searchInput: {
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000000',
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

        // alignItems: 'center',
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
        // borderWidth: 1,
        // borderColor: '#EBEDF0',
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
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 8,
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
    gradeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    gradeName: {
        fontSize: 14,
        color: '#000000',
    },
    gradeValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F73D48',
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

export default MainView;