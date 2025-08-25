import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

const SearchRow = ({searchText, setSearchText, router, onBell}) => (
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

        <TouchableOpacity style={styles.bellButton} onPress={onBell}>
            <Octicons name="bell-fill" size={24} style={{transform: [{rotate: '45deg'}]}} color="black"/>
        </TouchableOpacity>
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
    },
    scrollView: {
        flex: 1,
    },
    content: {
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

export default SearchRow