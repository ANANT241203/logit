import React, { useState } from 'react';
import { Modal } from 'react-native';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const FeedScreen = ({ onToggle }: { onToggle: () => void }) => {
  // Filter and sort state
  const [filter, setFilter] = useState<'All' | 'Book' | 'Movie' | 'Album' | 'TV Show'>('All');
  const [sortAsc, setSortAsc] = useState(true);
  const [filterModal, setFilterModal] = useState(false);

  // Feed data (static for now, could be dynamic)
  const feed = [
    {
      user: 'Gus', type: 'TV Show', title: 'The Big Bang Theory',
      subtitle: '2007 • Sitcom • 12 seasons', notes: 'Loved the witty humor!',
      image: require('../assets/images/media/bigbang.png'), profile: require('../assets/images/profile/gus.png'), rating: 7.6, time: '2h', color: undefined
    },
    {
      user: 'You', type: 'Album', title: '1989',
      subtitle: 'Taylor Swift • 2014 • Album • 13 songs', notes: 'meh',
      image: require('../assets/images/media/1989.png'), profile: require('../assets/images/profile/selin.png'), rating: 5.3, time: '3d', color: '#F8797E'
    },
    {
      user: 'Anant', type: 'Book', title: 'Grit',
      subtitle: 'Angela Duckworth • 2016 • Book • 352 pages', notes: 'An uplifting premise that sometimes feels repetitive.',
      image: require('../assets/images/media/grit.png'), profile: require('../assets/images/profile/anant.png'), rating: 2.9, time: '1w', color: '#F8797E'
    },
    {
      user: 'Anant', type: 'Movie', title: 'Interstellar',
      subtitle: 'Christopher Nolan • 2014 • Sci-Fi • 2h 49m', notes: 'Awesome movie! Loved Matthew MccCounaughey in this',
      image: require('../assets/images/media/interstellar.png'), profile: require('../assets/images/profile/anant.png'), rating: 2.9, time: '1w', color: '#F8797E'
    },
    {
      user: 'You', type: 'Book', title: 'Grit',
      subtitle: 'Angela Duckworth • 2016 • Book • 352 pages', notes: 'I got bored, couldn\'t finish',
      image: require('../assets/images/media/grit.png'), profile: require('../assets/images/profile/selin.png'), rating: 1.5, time: '2w', color: '#F8797E'
    },
    {
      user: 'Gus', type: 'Album', title: '1989',
      subtitle: 'Taylor Swift • 2014 • Album • 13 songs', notes: 'So danceable! Loving Taylor these days',
      image: require('../assets/images/media/1989.png'), profile: require('../assets/images/profile/gus.png'), rating: 7.6, time: '2w', color: undefined
    },
  ];

  // Filter and sort logic
  let filtered = feed.filter(item => filter === 'All' || item.type === filter);
  filtered = filtered.sort((a, b) => sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#aaa"/>
        <Text style={styles.searchPlaceholder}>Search Your Feed</Text>
        <TouchableOpacity style={styles.mapViewBtn} onPress={onToggle}>
  <Text style={styles.mapViewText}>Map View</Text>
</TouchableOpacity>

      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterModal(true)}>
          <Ionicons name="filter" size={16} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setSortAsc(s => !s)}>
          <Ionicons name={sortAsc ? 'arrow-down' : 'arrow-up'} size={16} />
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={filterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterModal(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPressOut={() => setFilterModal(false)}
        >
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, minWidth: 200 }}>
            {['All', 'Book', 'Movie', 'Album', 'TV Show'].map(f => (
              <TouchableOpacity
                key={f}
                style={{ paddingVertical: 10, alignItems: 'center', backgroundColor: filter === f ? '#FF6B6B' : 'transparent', borderRadius: 8, marginBottom: 4 }}
                onPress={() => { setFilter(f as any); setFilterModal(false); }}
              >
                <Text style={{ color: filter === f ? '#fff' : '#333', fontWeight: filter === f ? 'bold' : 'normal' }}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {filtered.map((item, i) => (
        <View style={styles.card} key={i}>
          <View style={styles.cardHeader}>
            <Image source={item.profile} style={styles.profileImg} />
            <Text style={styles.headerText}><Text style={styles.bold}>{item.user}</Text> ranked {item.type.toLowerCase()}</Text>
            <Text style={styles.timestamp}>{item.time}</Text>
          </View>
          <View style={styles.cardBody}>
            <Image source={item.image} style={styles.mediaImage}/>
            <View style={styles.mediaContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.notes}>Notes: "{item.notes}"</Text>
              {item.type === 'Movie' || item.type === 'TV Show' ? (
                <TouchableOpacity style={styles.wantBtn}>
                  <Text style={styles.wantBtnText}>Want to Watch</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={[styles.ratingCircle, item.color ? {borderColor: item.color} : null]}><Text style={[styles.rating, item.color ? {color: item.color} : null]}>{item.rating}</Text></View>
          </View>
          <View style={styles.interaction}>
            <Ionicons name="heart-outline" size={18}/><Text>1</Text>
            <Ionicons name="chatbubble-outline" size={18}/><Text>3</Text>
            <Ionicons name="send-outline" size={18}/>
          </View>
        </View>
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{ padding:10, backgroundColor:'#fff' },
  searchBar:{flexDirection:'row',alignItems:'center',padding:8,borderRadius:20,borderWidth:1,borderColor:'#ccc',marginBottom:10},
  searchPlaceholder:{color:'#aaa',marginLeft:5,flex:1},
  mapViewBtn:{padding:5,borderWidth:1,borderColor:'#ccc',borderRadius:15},
  mapViewText:{color:'#888'},
  filters:{flexDirection:'row',marginBottom:15},
  filterBtn:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderWidth:1,borderColor:'#ccc',borderRadius:15,marginRight:5},
  filterText:{marginLeft:4,color:'#555'},
  card:{padding:10,marginBottom:10,borderRadius:8,elevation:3,backgroundColor:'#fff'},
  cardHeader:{flexDirection:'row',alignItems:'center'},
  headerText:{marginLeft:5,flex:1},
  bold:{fontWeight:'bold'},
  timestamp:{color:'#888'},
  cardBody:{flexDirection:'row',marginTop:8},
  mediaImage:{width:70,height:100,borderRadius:5},
  mediaContent:{flex:1,paddingHorizontal:8},
  title:{fontWeight:'bold'},
  subtitle:{fontSize:12,color:'#888'},
  notes:{fontSize:11,fontStyle:'italic',marginTop:2},
  wantBtn:{backgroundColor:'#6b9b7a',paddingVertical:3,paddingHorizontal:8,borderRadius:4,marginTop:4,alignSelf:'flex-start'},
  wantBtnText:{color:'#fff',fontSize:12},
  ratingCircle:{width:40,height:40,borderRadius:20,borderWidth:2,borderColor:'#6b9b7a',justifyContent:'center',alignItems:'center'},
  rating:{color:'#6b9b7a',fontWeight:'bold'},
  interaction:{flexDirection:'row',justifyContent:'space-around',marginTop:8,paddingTop:6,borderTopWidth:1,borderColor:'#eee'},
  profileImg: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  
});

export default FeedScreen;
