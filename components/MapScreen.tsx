// MapScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, PanResponder, Animated } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import profileIcon from '../assets/icons/profile_icon.png';
import mediaIcon from '../assets/icons/media_icon.png';
import bookIcon from '../assets/icons/book_icon.png';
import musicIcon from '../assets/icons/msuic_icon.png';
import { useMap } from './MapContext';


const FriendNode = ({ label, onPress, node }: { label: string; onPress: () => void; node: any }) => (
  <TouchableOpacity onPress={onPress} style={[styles.nodeWrapper, { top: node.y - 135, left: node.x }]}> 
    <Image source={profileIcon} style={styles.iconImage} />
    <Text style={styles.friendNodeText}>{label}</Text>
  </TouchableOpacity>
);

const MediaNode = ({ label, onPress, node }: { label: string; onPress: () => void; node: any }) => {
  let icon = mediaIcon;
  // Use iconType for new nodes, fallback to label for old nodes
  if (node.iconType === 'book') icon = bookIcon;
  else if (node.iconType === 'music') icon = musicIcon;
  else if (label === 'Grit') icon = bookIcon;
  else if (label === '1989') icon = musicIcon;
  const isMovieOrShow = node.iconType === 'media' || label === 'The Big Bang Theory' || label === 'Interstellar';
  const isDisk = node.iconType === 'music' || label === '1989';
  return (
    <TouchableOpacity onPress={onPress} style={[styles.nodeWrapper, { top: node.y - 135, left: node.x }]}> 
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
  const { nodes, edges } = useMap();
  const [selected, setSelected] = useState<string | null>(null);
  const pan = React.useRef(new Animated.ValueXY({ x: -180, y: 0 })).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        // Only allow pan if not pressing a node (nodes are above mapArea)
        return gestureState.numberActiveTouches === 1 && !selected;
      },
      onPanResponderGrant: () => {
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

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
      {/* List View Button in Top Right */}
      <View style={{ position: 'absolute', top: 15, right: 15, zIndex: 10 }}>
        <TouchableOpacity style={styles.listViewBtn} onPress={onToggle}>
          <Text style={styles.listViewText}>List View</Text>
        </TouchableOpacity>
      </View>

      {/* Map and nodes */}
      <View style={styles.mapArea} {...panResponder.panHandlers}>
        <Animated.View style={{ flex: 1, transform: [{ translateX: pan.x }, { translateY: pan.y }] }}>
          <Svg style={StyleSheet.absoluteFill}>
            {edges.map(([from, to], index) => (
              <Line
                key={index}
                x1={nodes[from]?.x + 175}
                y1={nodes[from]?.y + 175}
                x2={nodes[to]?.x + 175}
                y2={nodes[to]?.y + 175}
                stroke="#F5A5B8"
                strokeWidth="3"
              />
            ))}
          </Svg>

          {Object.entries(nodes).map(([label, node]) =>
            node.type === 'friend' ? (
              <FriendNode key={label} label={label} node={node} onPress={() => setSelected(label)} />
            ) : (
              <MediaNode key={label} label={label} node={node} onPress={() => setSelected(label)} />
            )
          )}
        </Animated.View>

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
