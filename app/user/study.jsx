import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    useWindowDimensions,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import SearchRow from "../../components/searchRow";

// Mock data for the view
const recommendations = [
    {id: '1', emoji: '📚', title: 'Математика', subtitle: 'Подготовка к контрольной'},
    {id: '2', emoji: '🧪', title: 'Химия', subtitle: 'Повторить формулы'},
    {id: '3', emoji: '🔭', title: 'Физика', subtitle: 'Решить задачи по динамике'},
    {id: '4', emoji: '🌍', title: 'География', subtitle: 'Изучить карту мира'},
    {id: '5', emoji: '📖', title: 'Литература', subtitle: 'Прочитать рассказы Чехова'},
];

const partners = [
    {id: '1', title: 'ЕГЭ-Центр', logo: 'ege-center'},
    {id: '2', title: 'Умскул', logo: 'umskul'},
];

const podcasts = [
    {id: '1', title: 'История России за 30 минут', cover: 'history-podcast'},
    {id: '2', title: 'Физика для чайников', cover: 'physics-podcast'},
    {id: '3', title: 'Литературный клуб', cover: 'literature-podcast'},
];

export default function StudyView() {
    const [searchText, setSearchText] = useState('');
    const [recsExpanded, setRecsExpanded] = useState(false);
    const {width} = useWindowDimensions();

    // Calculate hidden recommendations count
    const hiddenRecsCount = recommendations.length - 2;

    return (<>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <SearchRow/>
                {/* Search Row */}

                <View style={styles.divider}/>

                {/* Recommendations Section */}
                <SectionCardGray
                    title="Рекомендации"
                    subtitle="Рекомендуем подготовиться к контрольной работе пройдя тест"
                    trailingEmoji="💡"
                >
                    {/* Two recommendation tiles in a row */}
                    <View style={styles.recommendationRow}>
                        {recommendations.slice(0, 2).map(rec => (
                            <RecommendationTile key={rec.id} rec={rec}/>
                        ))}
                    </View>

                    <ExpandRow
                        title={`Ещё ${hiddenRecsCount} предметов`}
                        subtitle="Рекомендации по остальным предметам"
                        isExpanded={recsExpanded}
                        onToggle={() => setRecsExpanded(!recsExpanded)}
                    />
                </SectionCardGray>

                {/* ЕГЭ Preparation Section */}
                <SectionCardGray
                    title="Подготовка к ЕГЭ"
                    subtitle="Школы подготовки к ЕГЭ по литературе"
                    trailingEmoji="📚"
                >
                    <View style={styles.partnersRow}>
                        {partners.map(partner => (
                            <PartnerTile key={partner.id} partner={partner}/>
                        ))}
                    </View>
                </SectionCardGray>

                {/* Podcasts Section */}
                <SectionCardGray
                    title="Подкасты"
                    subtitle="Красивый голос и полезная информация"
                    trailingEmoji="🎙"
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                        contentContainerStyle={styles.podcastsContent}
                    >
                        {podcasts.map(podcast => (
                            <PodcastTile key={podcast.id} podcast={podcast} width={width}/>
                        ))}
                    </ScrollView>
                </SectionCardGray>
            </ScrollView>
        </>
    );
}

// Reusable Section Card Component
const SectionCardGray = ({title, subtitle, trailingEmoji, children}) => {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionTextContainer}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                    {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
                </View>
                {trailingEmoji && <Text style={styles.trailingEmoji}>{trailingEmoji}</Text>}
            </View>
            {children}
        </View>
    );
};

// Recommendation Tile Component
const RecommendationTile = ({rec}) => {
    return (
        <View style={styles.recommendationTile}>
            <View style={styles.recHeader}>
                <Text style={styles.recEmoji}>{rec.emoji}</Text>
                <Text style={styles.recTitle} numberOfLines={1}>{rec.title}</Text>
            </View>
            <Text style={styles.recSubtitle}>{rec.subtitle}</Text>
        </View>
    );
};

// Expand Row Component
const ExpandRow = ({title, subtitle, isExpanded, onToggle}) => {
    return (
        <TouchableOpacity style={styles.expandRow} onPress={onToggle}>
            <View style={styles.expandTextContainer}>
                <Text style={styles.expandTitle}>{title}</Text>
                <Text style={styles.expandSubtitle}>{subtitle}</Text>
            </View>
            <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#8E8E93"
            />
        </TouchableOpacity>
    );
};

// Partner Tile Component
const PartnerTile = ({partner}) => {
    return (
        <View style={styles.partnerTile}>
            <View style={styles.partnerLogo}>
                {/* In a real app, you would use an actual image here */}
                <Text style={styles.partnerLogoText}>{partner.title.substring(0, 2)}</Text>
            </View>
            <Text style={styles.partnerTitle} numberOfLines={1}>{partner.title}</Text>
        </View>
    );
};

// Podcast Tile Component
const PodcastTile = ({podcast, width}) => {
    const tileWidth = width * 0.5; // 50% of screen width

    return (
        <View style={[styles.podcastTile, {width: tileWidth}]}>
            <View style={styles.podcastCover}>
                {/* In a real app, you would use an actual image here */}
                <Text style={styles.podcastCoverText}>{podcast.title.substring(0, 2)}</Text>
            </View>
            <Text style={styles.podcastTitle} numberOfLines={2}>{podcast.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5EA',
        marginTop: 4,
        marginBottom: 20,
    },
    sectionCard: {
        backgroundColor: '#F7F7F7',
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    sectionTextContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#8E8E93',
    },
    trailingEmoji: {
        fontSize: 40,
        marginLeft: 12,
    },
    recommendationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        gap: 12,
    },
    recommendationTile: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
    },
    recHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    recEmoji: {
        fontSize: 20,
        marginRight: 8,
    },
    recTitle: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    recSubtitle: {
        fontSize: 14,
        color: '#8E8E93',
    },
    expandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
    },
    expandTextContainer: {
        flex: 1,
    },
    expandTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    expandSubtitle: {
        fontSize: 14,
        color: '#8E8E93',
    },
    partnersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    partnerTile: {
        flex: 1,
        alignItems: 'center',
    },
    partnerLogo: {
        width: '100%',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    partnerLogoText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    partnerTitle: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    horizontalScroll: {
        marginHorizontal: -2,
    },
    podcastsContent: {
        paddingHorizontal: 2,
        gap: 12,
    },
    podcastTile: {
        marginRight: 12,
    },
    podcastCover: {
        width: '100%',
        height: 120,
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    podcastCoverText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    podcastTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
});