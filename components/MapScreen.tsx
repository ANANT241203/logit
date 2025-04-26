// MapScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import profileIcon from '../assets/icons/profile_icon.png';
import mediaIcon from '../assets/icons/media_icon.png';
import bookIcon from '../assets/icons/book_icon.png';
import musicIcon from '../assets/icons/msuic_icon.png';


type NodeType = {
  [key: string]: { x: number; y: number; color: string; type: 'friend' | 'media' };
};

const nodes: NodeType = {
  'Anant': { x: 0, y: -120, color: '#F8797E', type: 'friend' },
  'Selin': { x: -100, y: 0, color: '#F8797E', type: 'friend' },
  'Gus': { x: 0, y: 0, color: '#F8797E', type: 'friend' },
  'Grit': { x: -100, y: -70, color: '#FFA600', type: 'media' },
  'Interstellar': { x: 100, y: -70, color: '#00D62E', type: 'media' },
  'The Big Bang Theory': { x: 100, y: 50, color: '#00D62E', type: 'media' },
  '1989': { x: 0, y: 100, color: '#4DDEFF', type: 'media' },
};

const edges = [
  ['Anant', 'Interstellar'],
  ['Selin', 'Grit'],
  ['Gus', 'The Big Bang Theory'],
  ['Selin', '1989'],
  ['Gus', '1989'],
  ['Anant', 'Grit'],
  ['Gus', 'Grit'],
];

const FriendNode = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[styles.nodeWrapper, { top: nodes[label].y, left: nodes[label].x }]}>
    <Image source={profileIcon} style={styles.iconImage} />
    <Text style={styles.friendNodeText}>{label}</Text>
  </TouchableOpacity>
);



const MediaNode = ({ label, onPress }: { label: string; onPress: () => void }) => {
  let icon = mediaIcon;
  if (label === 'Grit') icon = bookIcon;
  if (label === '1989') icon = musicIcon;

  const isMovieOrShow = label === 'The Big Bang Theory' || label === 'Interstellar';
  const isDisk = label === '1989';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.nodeWrapper, { top: nodes[label].y, left: nodes[label].x }]}>
      <Image
        source={icon}
        style={[
          styles.iconImage,
          isMovieOrShow ? { width: 80, height: 80 } : null,
          isDisk ? { width: 80, height: 80 } : null 
        ]}
      />
      <Text style={styles.nodeText}>{label}</Text>
    </TouchableOpacity>
  );
};




export default function MapScreen({ onToggle }: { onToggle: () => void }) {

  const [selected, setSelected] = useState<string | null>(null);

  const renderPopup = () => {
    if (!selected) return null;
    const node = nodes[selected];

    if (selected === 'Anant') {
      return (
        
        <View style={[styles.popup, { alignSelf: 'center' }]}>

          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setSelected(null)}>
  <Text style={{ fontSize: 18, color: '#999' }}>✕</Text>
</TouchableOpacity>

          <Image source={require('../assets/images/profile/anant.png')} style={styles.avatar} />
          <Text style={styles.popupTitle}>Anant Aggarwal</Text>
          <Text style={styles.popupMeta}>10 Friends  |  5 Followers</Text>
          <Text style={styles.popupNote}>Recently watched Breaking Bad.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Show Profile</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (selected === 'Gus') {
      return (
        <View style={[styles.popup, { alignSelf: 'center' }]}>
<TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setSelected(null)}>
  <Text style={{ fontSize: 18, color: '#999' }}>✕</Text>
</TouchableOpacity>

          <Image source={require('../assets/images/profile/gus.png')} style={styles.avatar} />
          <Text style={styles.popupTitle}>Gus Liu</Text>
          <Text style={styles.popupMeta}>7 Friends  |  3 Followers</Text>
          <Text style={styles.popupNote}>Just watched “The Big Bang Theory”... again!</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Show Profile</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    if (selected === 'Selin') {
      return (
        <View style={[styles.popup, { alignSelf: 'center' }]}>
<TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setSelected(null)}>
  <Text style={{ fontSize: 18, color: '#999' }}>✕</Text>
</TouchableOpacity>

          <Image source={require('../assets/images/profile/selin.png')} style={styles.avatar} />
          <Text style={styles.popupTitle}>Selin B.</Text>
          <Text style={styles.popupMeta}>14 Friends  |  14 Followers</Text>
          <Text style={styles.popupNote}>Recently finished “Grit” and loved it!</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Show Profile</Text>
          </TouchableOpacity>
        </View>
      );
    }
    

    if (selected === '1989') {
      return (
        <View style={[styles.popupBlue, { alignSelf: 'center' }]}>

          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setSelected(null)}>
  <Text style={{ fontSize: 18, color: '#999' }}>✕</Text>
</TouchableOpacity>

          <Image source={require('../assets/images/media/1989.png')} style={styles.albumArt} />
          <Text style={styles.popupTitle}>1989</Text>
          <Text style={styles.subTitle}>Taylor Swift</Text>
          <Text style={styles.subTitle}>2B+ plays</Text>
          <Text style={styles.songTitle}>Most Popular Songs</Text>
          <Text style={styles.songList}>
            1. Blank Space (2B plays){'\n'}
            2. Shake It Off (1.5B plays){'\n'}
            3. Wildest Dreams (1B plays)
          </Text>
          <TouchableOpacity style={styles.listenBtn}>
            <Text style={styles.listenText}>Listen to Album</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (selected === 'Grit') {
      return (
        <View style={[styles.popupBlue, { alignSelf: 'center' }]}>

          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setSelected(null)}>
  <Text style={{ fontSize: 18, color: '#999' }}>✕</Text>
</TouchableOpacity>

          <Image source={require('../assets/images/media/grit.png')} style={styles.albumArt} />
          <Text style={styles.popupTitle}>Grit</Text>
          <Text style={styles.subTitle}>Angela Duckworth</Text>
          <Text style={styles.subTitle}>352 pages</Text>
          <Text style={styles.songTitle}>Quote</Text>
          <Text style={styles.songList}>
            “Enthusiasm is common. Endurance is rare.”
          </Text>
          <TouchableOpacity style={styles.listenBtn}>
            <Text style={styles.listenText}>Read Summary</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (selected === 'Interstellar') {
      return (
        <View style={[styles.popupBlue, { alignSelf: 'center' }]}>

          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setSelected(null)}>
  <Text style={{ fontSize: 18, color: '#999' }}>✕</Text>
</TouchableOpacity>

          <Image source={require('../assets/images/media/interstellar.png')} style={styles.albumArt} />
          <Text style={styles.popupTitle}>Interstellar</Text>
          <Text style={styles.subTitle}>Christopher Nolan</Text>
          <Text style={styles.subTitle}>2014 • Sci-Fi • 2h 49m</Text>
          <Text style={styles.songTitle}>Plot</Text>
          <Text style={styles.songList}>
            A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.
          </Text>
          <TouchableOpacity style={styles.listenBtn}>
            <Text style={styles.listenText}>Watch Trailer</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (selected === 'The Big Bang Theory') {
      return (
        <View style={[styles.popupBlue, { alignSelf: 'center' }]}>

          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => setSelected(null)}>
  <Text style={{ fontSize: 18, color: '#999' }}>✕</Text>
</TouchableOpacity>

          <Image source={require('../assets/images/media/bigbang.png')} style={styles.albumArt} />
          <Text style={styles.popupTitle}>The Big Bang Theory</Text>
          <Text style={styles.subTitle}>Chuck Lorre, Bill Prady</Text>
          <Text style={styles.subTitle}>2007–2019 • Sitcom • 12 Seasons</Text>
          <Text style={styles.songTitle}>Fun Fact</Text>
          <Text style={styles.songList}>
            Sheldon’s favorite number is 73: “The best number.”{'\n'}
            Prime, palindrome, and binary elegance.
          </Text>
          <TouchableOpacity style={styles.listenBtn}>
            <Text style={styles.listenText}>Stream Series</Text>
          </TouchableOpacity>
        </View>
      );
    }
        
    

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#aaa"/>
        <Text style={styles.searchPlaceholder}>Search Your Map</Text>
        <TouchableOpacity style={styles.listViewBtn} onPress={onToggle}>
  <Text style={styles.listViewText}>List View</Text>
</TouchableOpacity>

      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter" size={16}/><Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="swap-vertical" size={16}/><Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Ionicons name="navigate-circle-outline" size={22} color="#666"/>
        </TouchableOpacity>
      </View>

      {/* Map and nodes */}
      <View style={styles.mapArea}>
        <Svg style={StyleSheet.absoluteFill}>
          {edges.map(([from, to], index) => (
            <Line
              key={index}
              x1={nodes[from].x + 175}
              y1={nodes[from].y + 175}
              x2={nodes[to].x + 175}
              y2={nodes[to].y + 175}
              stroke="#F5A5B8"
              strokeWidth="3"
            />
          ))}
        </Svg>

        {Object.entries(nodes).map(([label, node]) =>
  node.type === 'friend' ? (
    <FriendNode key={label} label={label} onPress={() => setSelected(label)} />
  ) : (
    <MediaNode key={label} label={label} onPress={() => setSelected(label)} />
  )
)}



<Modal
  visible={!!selected}
  transparent
  animationType="fade"
  onRequestClose={() => setSelected(null)}
>
  <TouchableOpacity
    activeOpacity={1}
    onPressOut={() => setSelected(null)}
    style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {renderPopup()}
  </TouchableOpacity>
</Modal>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friendNodeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: -30,
    textAlign: 'center',
  },  
  nodeWrapper: {
  position: 'absolute',
  marginLeft: '50%',
  marginTop: '50%',
  transform: [{ translateX: -40 }, { translateY: -40 }],
  alignItems: 'center',
  justifyContent: 'center',
},
iconImage: {
  width: 60,
  height: 60,
  resizeMode: 'contain',
},
nodeText: {
  color: '#fff',
  fontSize: 11,
  fontWeight: 'bold',
  position: 'absolute',
  textAlign: 'center',
},

  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', padding: 8,
    borderRadius: 20, borderWidth: 1, borderColor: '#ccc', marginBottom: 10
  },
  searchPlaceholder: { flex: 1, marginLeft: 5, color: '#aaa' },
  listViewBtn: { padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 15 },
  listViewText: { color: '#888' },
  filters: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 6 },
  filterBtn: {
    flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 15, borderWidth: 1, borderColor: '#ccc', alignItems: 'center'
  },
  filterText: { marginLeft: 4, color: '#555' },
  locationBtn: { marginLeft: 'auto' },
  mapArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.2 }, { translateY: 100 }]
  }  ,
  node: {
    position: 'absolute', paddingHorizontal: 10, paddingVertical: 8,
    borderRadius: 12, elevation: 3, minWidth: 70, alignItems: 'center',
    justifyContent: 'center', marginLeft: '50%', marginTop: '50%',
    transform: [{ translateX: -40 }, { translateY: -20 }]
  },
  popup: {
    position: 'absolute', top: 120, width: 280, padding: 15,
    backgroundColor: '#fff', borderRadius: 24, elevation: 6, alignItems: 'center'
  },
  popupTitle: { fontSize: 18, fontWeight: 'bold', color: '#f36', marginTop: 5 },
  popupMeta: { color: '#777', fontSize: 14, marginTop: 5 },
  popupNote: { fontSize: 14, marginTop: 10, color: '#c44' },
  button: {
    backgroundColor: '#f36', paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 20, marginTop: 15
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  avatar: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee',
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
  },
  albumArt: {
    width: 60, height: 60, borderRadius: 8, marginBottom: 8
  },
  popupBlue: {
    position: 'absolute', top: 120, width: 280, padding: 15,
    backgroundColor: '#fff', borderRadius: 24, elevation: 6, alignItems: 'center'
  },
  subTitle: { fontSize: 14, color: '#666', marginTop: 4 },
  songTitle: { fontSize: 14, color: '#1da1f2', fontWeight: 'bold', marginTop: 10 },
  songList: { fontSize: 13, color: '#555', marginTop: 6, textAlign: 'center' },
  listenBtn: {
    backgroundColor: '#4DD0E1', paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 20, marginTop: 12
  },
  listenText: { color: '#fff', fontWeight: 'bold' },
  
});
