// profile.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
// ----------------------------------------------------------------------------
// Standard header constants
const HEADER_HEIGHT = height * 1;
const PANEL_OFFSET   = HEADER_HEIGHT - 620;
// ----------------------------------------------------------------------------
// Grid sizing for Ratings
const GRID_ITEM_SIZE = (width - 80) / 4;

type MediaType = 'Books' | 'Movie' | 'TV' | 'Music';

type RatedItem = {
  id: string;
  title: string;
  type: MediaType;
  stars: number;
};
type LikedItem = {
  id: string;
  title: string;
  type: MediaType;
  likedFrom: string;
};
type PlaylistItem = {
  id: string;
  title: string;
  creator: string;
  contents: { type: MediaType; title: string }[];
};

const TYPE_COLORS: Record<MediaType, string> = {
  Books: '#FFA726',
  Movie: '#66BB6A',
  TV:    '#66BB6A',
  Music: '#63EAE0',
};
const TYPE_ICONS: Record<MediaType, string> = {
  Books: 'book-outline',
  Movie: 'film-outline',
  TV:    'tv-outline',
  Music: 'musical-notes',
};

// Sample data
const RATED_ITEMS: RatedItem[] = [
  { id: '1', title: 'Song of Solomon',   type: 'Books', stars: 5 },
  { id: '2', title: 'The Substance',      type: 'Movie', stars: 4 },
  { id: '3', title: 'Indie Flick',        type: 'TV',    stars: 3 },
  { id: '4', title: 'Take Fri Is Your G', type: 'Music', stars: 4 },
  { id: '5', title: 'Interstellar',       type: 'Movie', stars: 5 },
  { id: '6', title: 'Chamber of Secrets', type: 'Books', stars: 4 },
  { id: '7', title: 'Friends S1',         type: 'TV',    stars: 4 },
  { id: '8', title: '1989',               type: 'Music', stars: 5 },
];
const LIKED_ITEMS: LikedItem[] = [
  { id: 'l1', title: 'The Hobbit',     type: 'Books', likedFrom: 'Anant' },
  { id: 'l2', title: 'Dune',           type: 'Books', likedFrom: 'Gus' },
  { id: 'l3', title: 'Parasite',       type: 'Movie', likedFrom: 'Selin' },
  { id: 'l4', title: 'Spirited Away',  type: 'Movie', likedFrom: 'Jamie' },
  { id: 'l5', title: 'Breaking Bad',   type: 'TV',    likedFrom: 'Anant' },
  { id: 'l6', title: 'Abbey Road',     type: 'Music', likedFrom: 'Gus' },
];
const PLAYLISTS: PlaylistItem[] = [
  {
    id: 'p1',
    title: 'Study Vibes',
    creator: 'Gus L.',
    contents: [
      { type: 'Books', title: '1984' },
      { type: 'Music', title: 'Bohemian Rhapsody' },
      { type: 'TV',    title: 'Black Mirror' },
      { type: 'Movie', title: 'Inception' },
    ],
  },
  {
    id: 'p2',
    title: 'Morning Run',
    creator: 'Selin',
    contents: [
      { type: 'Music', title: 'Eye of the Tiger' },
      { type: 'Music', title: 'Don’t Stop Me Now' },
      { type: 'Movie', title: 'Mad Max: Fury Road' },
      { type: 'TV',    title: 'Rick and Morty' },
    ],
  },
  {
    id: 'p3',
    title: 'Chill Mix',
    creator: 'Anant',
    contents: [
      { type: 'Music', title: 'Lo-Fi Beats' },
      { type: 'Books', title: 'The Alchemist' },
      { type: 'Music', title: 'Sunrise' },
      { type: 'TV',    title: 'Friends S1' },
    ],
  },
  {
    id: 'p4',
    title: 'Evening Jazz',
    creator: 'Jamie',
    contents: [
      { type: 'Music', title: 'Take Five' },
      { type: 'Music', title: 'Blue in Green' },
      { type: 'Music', title: 'So What' },
      { type: 'Books', title: 'Jazz' },
    ],
  },
];

export default function ProfileScreen() {
  const [section, setSection] =
    useState<'Ratings' | 'Playlists' | 'Liked'>('Ratings');
  const [filter, setFilter] =
    useState<'All' | MediaType>('All');
  const [activePlaylist, setActivePlaylist] =
    useState<PlaylistItem | null>(null);

  const filteredRated = filter === 'All'
    ? RATED_ITEMS
    : RATED_ITEMS.filter(i => i.type === filter);
  const filteredLiked = filter === 'All'
    ? LIKED_ITEMS
    : LIKED_ITEMS.filter(i => i.type === filter);

  // Playlist Detail View
  if (activePlaylist) {
    return (
      <View style={styles.wrapper}>
        <LinearGradient
          colors={['#EA7C63','#F6A085']}
          style={[styles.header, { height: HEADER_HEIGHT }]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setActivePlaylist(null);
              setSection('Playlists');
            }}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.name, { marginTop: 8 }]}>{activePlaylist.title}</Text>
          <Text style={styles.subtitle}>By {activePlaylist.creator}</Text>
        </LinearGradient>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingTop: PANEL_OFFSET - 150 }}
        >
          <View style={styles.content}>
            {activePlaylist.contents.map((m, i) => (
              <View key={i} style={styles.detailItem}>
                <View
                  style={[
                    styles.detailIcon,
                    { backgroundColor: TYPE_COLORS[m.type] },
                  ]}
                >
                  <Ionicons
                    name={TYPE_ICONS[m.type] as any}
                    size={24}
                    color="#fff"
                  />
                </View>
                <Text style={styles.detailLabel}>{m.title}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  // Main Profile View
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#EA7C63','#F6A085']}
        style={[styles.header, { height: HEADER_HEIGHT }]}
      >
        <Image
          source={require('../assets/images/profile/selin.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Selin B.</Text>
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>friends</Text>
          </TouchableOpacity>
          <View style={styles.statDivider}/>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statValue}>210</Text>
            <Text style={styles.statLabel}>ratings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: PANEL_OFFSET }}
      >
        <View style={styles.content}>
          {/* Section Tabs */}
          <View style={styles.sectionSelector}>
            {(['Ratings','Playlists','Liked'] as const).map(s => (
              <TouchableOpacity
                key={s}
                onPress={() => setSection(s)}
                style={[
                  styles.sectionButton,
                  section === s && styles.sectionButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.sectionText,
                    section === s && styles.sectionTextActive,
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Filters */}
          {(section === 'Ratings' || section === 'Liked') && (
            <View style={styles.filterBar}>
              {(['All','Books','Movie','TV','Music'] as const).map(f => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFilter(f)}
                  style={[
                    styles.filterPill,
                    filter === f && styles.filterPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === f && styles.filterTextActive,
                    ]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Ratings */}
          {section === 'Ratings' && (
            <View style={styles.grid}>
              {filteredRated.map(item => (
                <View key={item.id} style={styles.gridItem}>
                  <View
                    style={[
                      styles.mediaIconWrapper,
                      { backgroundColor: TYPE_COLORS[item.type] },
                    ]}
                  >
                    <Ionicons
                      name={TYPE_ICONS[item.type] as any}
                      size={28}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.mediaLabel}>{item.title}</Text>
                  <View style={styles.starsRow}>
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <FontAwesome key={i} name="star" size={12} color="#FFD700"/>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Liked */}
          {section === 'Liked' && (
            <View style={styles.list}>
              {filteredLiked.map(item => (
                <View key={item.id} style={styles.listItem}>
                  <View
                    style={[
                      styles.listIcon,
                      { backgroundColor: TYPE_COLORS[item.type] },
                    ]}
                  >
                    <Ionicons
                      name={TYPE_ICONS[item.type] as any}
                      size={24}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.likedFrom}>Liked from {item.likedFrom}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Playlists */}
          {section === 'Playlists' && (
            <View style={styles.playlistList}>
              {PLAYLISTS.map(pl => (
                <TouchableOpacity
                  key={pl.id}
                  style={styles.playlistCard}
                  onPress={() => setActivePlaylist(pl)}
                >
                  <View style={styles.collage}>
                    {pl.contents.map((m, i) => (
                      <View
                        key={i}
                        style={[
                          styles.collageItem,
                          { backgroundColor: TYPE_COLORS[m.type] },
                        ]}
                      >
                        <Ionicons
                          name={TYPE_ICONS[m.type] as any}
                          size={20}
                          color="#fff"
                        />
                      </View>
                    ))}
                  </View>
                  <View style={styles.playlistText}>
                    <Text style={styles.playlistTitle}>{pl.title}</Text>
                    <Text style={styles.playlistCreator}>By {pl.creator}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc"/>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const COLLAGE_SIZE = 72;
const COLLAGE_ITEM_SIZE = (COLLAGE_SIZE - 4) / 2;

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },

  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 2,
    padding: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 8,
    marginTop: 8,
  },
  name: { fontSize: 24, fontWeight: '700', color: '#fff', marginTop: 4 },
  subtitle: { fontSize: 14, color: '#ffe4e0', marginTop: 2 },
  statsRow: { flexDirection: 'row', marginTop: 6, alignItems: 'center' },
  statButton: { alignItems: 'center', paddingHorizontal: 12 },
  statValue: { fontSize: 16, fontWeight: '600', color: '#fff' },
  statLabel: { fontSize: 12, color: '#ffe4e0' },
  statDivider: { width: 1, height: 20, backgroundColor: '#ffb3a0' },

  scroll: { flex: 1, zIndex: 2 },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingBottom: 40,
    minHeight: height,
  },

  sectionSelector: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionButton: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  sectionButtonActive: { borderBottomWidth: 2, borderColor: '#EA7C63' },
  sectionText: { fontSize: 16, color: '#666' },
  sectionTextActive: { color: '#333', fontWeight: '600' },

  filterBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterPillActive: { backgroundColor: '#EA7C63' },
  filterText: { fontSize: 13, color: '#555' },
  filterTextActive: { color: '#fff', fontWeight: '600' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  gridItem: { width: GRID_ITEM_SIZE, margin: 8, alignItems: 'center' },
  mediaIconWrapper: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  starsRow: { flexDirection: 'row', marginTop: 4 },

  list: { marginHorizontal: 16 },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center',
    marginRight:12,
  },
  listTitle: {
    flex:1,
    fontSize:16,
    fontWeight:'600',
    color:'#333',
  },
  likedFrom: {
    fontSize:13,
    color:'#666',
    marginLeft:8,
  },

  playlistList: { marginHorizontal: 16 },
  playlistCard: {
    flexDirection:'row',
    alignItems:'center',
    padding:12,
    marginVertical:8,
    backgroundColor:'#fff',
    borderRadius:12,
    shadowColor:'#000',
    shadowOpacity:0.05,
    shadowRadius:5,
    elevation:2,
  },
  collage: {
    width: COLLAGE_SIZE,
    height: COLLAGE_SIZE,
    flexDirection:'row',
    flexWrap:'wrap',
    marginRight:12,
  },
  collageItem: {
    width: COLLAGE_ITEM_SIZE,
    height: COLLAGE_ITEM_SIZE,
    borderRadius:4,
    margin:1,
    justifyContent:'center',
    alignItems:'center',
  },
  playlistText: { flex:1 },
  playlistTitle: {
    fontSize:16, fontWeight:'600', color:'#333',
  },
  playlistCreator: {
    fontSize:13, color:'#666', marginTop:2,
  },

  detailItem: {
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:12,
    paddingHorizontal:16,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'#eee',
  },
  detailIcon: {
    width:40,
    height:40,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    marginRight:12,
  },
  detailLabel: {
    flex:1,
    fontSize:16,
    fontWeight:'600',
    color:'#333',
  },
});
