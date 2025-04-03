// ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

// Updated RatingBubble component renders an outlined circle.
const RatingBubble = ({ rating }: { rating: number }) => {
  let borderColor: string;
  if (rating > 7.0) {
    borderColor = '#4CAF50'; // Green
  } else if (rating < 4.0) {
    borderColor = '#F44336'; // Red
  } else {
    borderColor = '#FFEB3B'; // Yellow
  }
  return (
    <View style={[styles.ratingCircle, { borderColor }]}>
      <Text style={[styles.rating, { color: borderColor }]}>{rating.toFixed(1)}</Text>
    </View>
  );
};

// A generic section for Books, Movies, Albums.
type MediaItem = {
  id: string;
  title: string;
  rating: number;
};

type MediaSectionProps = {
  title: string;
  data: MediaItem[];
  expanded: boolean;
  toggleExpanded: () => void;
};

const MediaSection = ({ title, data, expanded, toggleExpanded }: MediaSectionProps) => {
  const displayedData = expanded ? data : data.slice(0, 2);
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {displayedData.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.itemName}>{item.title}</Text>
          <RatingBubble rating={item.rating} />
        </View>
      ))}
      {data.length > 2 && (
        <TouchableOpacity onPress={toggleExpanded} style={styles.seeMoreContainer}>
          <Text style={styles.seeMoreButton}>{expanded ? "See less..." : "See more..."}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Playlist section displays playlists with funny names and their media types.
type PlaylistItem = {
  id: string;
  name: string;
  mediaTypes: string[];
};

type PlaylistSectionProps = {
  title: string;
  data: PlaylistItem[];
  expanded: boolean;
  toggleExpanded: () => void;
};

const PlaylistSection = ({ title, data, expanded, toggleExpanded }: PlaylistSectionProps) => {
  const displayedData = expanded ? data : data.slice(0, 2);
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {displayedData.map((item) => (
        <View key={item.id} style={styles.playlistRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.mediaTypes}>Types: {item.mediaTypes.join(', ')}</Text>
        </View>
      ))}
      {data.length > 2 && (
        <TouchableOpacity onPress={toggleExpanded} style={styles.seeMoreContainer}>
          <Text style={styles.seeMoreButton}>{expanded ? "See less..." : "See more..."}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function ProfileScreen() {
  // States to track expanded/collapsed for each section.
  const [expandedBooks, setExpandedBooks] = useState(false);
  const [expandedMovies, setExpandedMovies] = useState(false);
  const [expandedAlbums, setExpandedAlbums] = useState(false);
  const [expandedPlaylists, setExpandedPlaylists] = useState(false);

  // Sample data arrays for each category.
  const books: MediaItem[] = [
    { id: 'b1', title: 'Song of Solomon', rating: 9.5 },
    { id: 'b2', title: 'Real Estate', rating: 8.9 },
    { id: 'b3', title: 'The Catcher in the Rye', rating: 6.5 },
  ];

  const movies: MediaItem[] = [
    { id: 'm1', title: 'Notting Hill', rating: 10.0 },
    { id: 'm2', title: 'The Substance', rating: 8.7 },
    { id: 'm3', title: 'Indie Flick', rating: 5.5 },
  ];

  const albums: MediaItem[] = [
    { id: 'a1', title: 'The Fame', rating: 10.0 },
    { id: 'a2', title: 'Take Fri Is Your G', rating: 10.0 },
    { id: 'a3', title: 'Random Beats', rating: 3.5 },
  ];

  const playlists: PlaylistItem[] = [
    { id: 'p1', name: 'Lazy Sunday', mediaTypes: ['Movies', 'Albums'] },
    { id: 'p2', name: 'Road Trip Vibes', mediaTypes: ['Books', 'Movies'] },
    { id: 'p3', name: 'Funky Mix', mediaTypes: ['Albums', 'Books', 'Movies'] },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
      <Image source={require('../assets/images/profile/selin.png')} style={styles.avatar} />

        <Text style={styles.nameText}>Selin B.</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>14 friends</Text>
          <Text style={styles.statsText}>14 followers</Text>
          <Text style={styles.statsText}>64 pieces</Text>
        </View>
      </View>

      {/* Books Section */}
      <MediaSection
        title="Books"
        data={books}
        expanded={expandedBooks}
        toggleExpanded={() => setExpandedBooks(!expandedBooks)}
      />

      {/* Movies Section */}
      <MediaSection
        title="Movies"
        data={movies}
        expanded={expandedMovies}
        toggleExpanded={() => setExpandedMovies(!expandedMovies)}
      />

      {/* Albums Section */}
      <MediaSection
        title="Albums"
        data={albums}
        expanded={expandedAlbums}
        toggleExpanded={() => setExpandedAlbums(!expandedAlbums)}
      />

      {/* Playlists Section */}
      <PlaylistSection
        title="Playlists"
        data={playlists}
        expanded={expandedPlaylists}
        toggleExpanded={() => setExpandedPlaylists(!expandedPlaylists)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 30,
    marginBottom: 8,
  },
  
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 4,
  },
  statsText: {
    fontSize: 14,
    color: '#555',
  },
  sectionContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 24,
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  playlistRow: {
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    fontWeight: 'bold',
  },
  mediaTypes: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  seeMoreContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  seeMoreButton: {
    fontSize: 16,
    color: '#007BFF',
  },
});