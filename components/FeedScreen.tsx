import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const FeedScreen = ({ onToggle }: { onToggle: () => void }) => {

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
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter" size={16} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="swap-vertical" size={16} />
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle-outline" size={20} />
          <Text style={styles.headerText}><Text style={styles.bold}>Gus</Text> ranked TV</Text>
          <Text style={styles.timestamp}>2h</Text>
        </View>
        <View style={styles.cardBody}>
          <Image source={{uri:'https://placehold.co/100x150'}} style={styles.mediaImage}/>
          <View style={styles.mediaContent}>
            <Text style={styles.title}>The Big Bang Theory</Text>
            <Text style={styles.subtitle}>2007 • Sitcom • 12 seasons</Text>
            <Text style={styles.notes}>Notes: "Loved the witty humor!"</Text>
            <TouchableOpacity style={styles.wantBtn}>
              <Text style={styles.wantBtnText}>Want to Watch</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ratingCircle}><Text style={styles.rating}>7.6</Text></View>
        </View>
        <View style={styles.interaction}>
          <Ionicons name="heart-outline" size={18}/><Text>1</Text>
          <Ionicons name="chatbubble-outline" size={18}/><Text>3</Text>
          <Ionicons name="send-outline" size={18}/>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle-outline" size={20}/>
          <Text style={styles.headerText}><Text style={styles.bold}>Selin</Text> ranked album</Text>
          <Text style={styles.timestamp}>3d</Text>
        </View>
        <View style={styles.cardBody}>
          <Image source={{uri:'https://placehold.co/100x150'}} style={styles.mediaImage}/>
          <View style={styles.mediaContent}>
            <Text style={styles.title}>1989</Text>
            <Text style={styles.subtitle}>Taylor Swift • 2014 • Album • 13 songs</Text>
            <Text style={styles.notes}>Notes: "A slick pop pivot loaded with catchy hooks."</Text>
            <TouchableOpacity style={styles.wantBtn}>
              <Text style={styles.wantBtnText}>Want to Listen</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.ratingCircle,{borderColor:'#F8797E'}]}><Text style={[styles.rating,{color:'#F8797E'}]}>5.3</Text></View>
        </View>
        <View style={styles.interaction}>
          <FontAwesome name="heart" color="#F8797E" size={18}/><Text>2</Text>
          <Ionicons name="chatbubble-outline" size={18}/><Text>1</Text>
          <Ionicons name="send-outline" size={18}/>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="person-circle-outline" size={20}/>
          <Text style={styles.headerText}><Text style={styles.bold}>Anant</Text> ranked book</Text>
          <Text style={styles.timestamp}>1w</Text>
        </View>
        <View style={styles.cardBody}>
          <Image source={{uri:'https://placehold.co/100x150'}} style={styles.mediaImage}/>
          <View style={styles.mediaContent}>
            <Text style={styles.title}>Grit</Text>
            <Text style={styles.subtitle}>Angela Duckworth • 2016 • Book • 352 pages</Text>
            <Text style={styles.notes}>Notes: "An uplifting premise that sometimes feels repetitive."</Text>
            <TouchableOpacity style={styles.wantBtn}>
              <Text style={styles.wantBtnText}>Want to Read</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.ratingCircle,{borderColor:'#F8797E'}]}><Text style={[styles.rating,{color:'#F8797E'}]}>2.9</Text></View>
        </View>
        <View style={styles.interaction}>
          <Ionicons name="heart-outline" size={18}/><Text>0</Text>
          <Ionicons name="chatbubble-outline" size={18}/><Text>0</Text>
          <Ionicons name="send-outline" size={18}/>
        </View>
      </View>

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
  interaction:{flexDirection:'row',justifyContent:'space-around',marginTop:8,paddingTop:6,borderTopWidth:1,borderColor:'#eee'}
});

export default FeedScreen;
