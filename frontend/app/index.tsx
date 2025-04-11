import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import FeedScreen from '../components/FeedScreen';
import MapScreen from '../components/MapScreen';

export default function Home() {
  const [showMap, setShowMap] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showMap ? (
        <MapScreen onToggle={() => setShowMap(false)} />
      ) : (
        <FeedScreen onToggle={() => setShowMap(true)} />
      )}
    </SafeAreaView>
  );
}
