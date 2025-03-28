import React, { useState } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';


const mapWidth = 350;
const mapHeight = 350;

type NodeType = {
    [key: string]: { x: number; y: number; color: string };
  };
  
  const nodes: NodeType = {
    'Anant': { x: 0, y: -120, color: '#F8797E' },
    'Selin': { x: -100, y: 0, color: '#F8797E' },
    'Gus': { x: 0, y: 0, color: '#F8797E' },
    'Grit': { x: -100, y: -70, color: '#FFA600' },
    'Interstellar': { x: 100, y: -70, color: '#00D62E' },
    'The Big Bang Theory': { x: 100, y: 50, color: '#00D62E' },
    '1989': { x: 0, y: 100, color: '#4DDEFF' },
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

export default function MapScreen({ onToggle }: { onToggle: () => void }) {

    const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#aaa"/>
        <Text style={styles.searchPlaceholder}>Search Your Map</Text>
        <TouchableOpacity style={styles.listViewBtn} onPress={onToggle}>
  <Text style={styles.listViewText}>List View</Text>
</TouchableOpacity>

      </View>

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

      <View style={styles.mapArea}>
        <Svg style={StyleSheet.absoluteFill}>
          {edges.map(([from, to], index) => (
            <Line
            key={index}
            x1={nodes[from].x + mapWidth / 2}
            y1={nodes[from].y + mapHeight / 2}
            x2={nodes[to].x + mapWidth / 2}
            y2={nodes[to].y + mapHeight / 2}
            stroke="#F5A5B8"
            strokeWidth="3"
          />
          
          ))}
        </Svg>

        {Object.entries(nodes).map(([label, node]) => (
  <TouchableOpacity
    key={label}
    style={[styles.node, { top: node.y, left: node.x, backgroundColor: node.color }]}
    onPress={() => setSelectedNode(label)}
  >
    <Text style={styles.nodeText}>{label}</Text>
  </TouchableOpacity>
))}

{selectedNode && (
  <View style={styles.popup}>
    {['Anant', 'Selin', 'Gus'].includes(selectedNode) ? (
      <>
        <Text style={styles.popupTitle}>{selectedNode}</Text>
        <Text style={styles.popupText}>Recently watched Breaking Bad.</Text>
        <TouchableOpacity style={styles.popupButton}>
          <Text style={{ color: '#fff' }}>Show Profile</Text>
        </TouchableOpacity>
      </>
    ) : (
      <>
        <Text style={styles.popupTitle}>{selectedNode}</Text>
        <Text style={styles.popupText}>Popular content details here.</Text>
        <TouchableOpacity style={styles.popupButton}>
          <Text style={{ color: '#fff' }}>View Content</Text>
        </TouchableOpacity>
      </>
    )}
    <TouchableOpacity onPress={() => setSelectedNode(null)}>
      <Text style={{ color: 'gray', marginTop: 10 }}>Close</Text>
    </TouchableOpacity>
  </View>
)}


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,padding:15,backgroundColor:'#fff'
  },
  searchBar:{
    flexDirection:'row',alignItems:'center',padding:8,borderRadius:20,borderWidth:1,borderColor:'#ccc',marginBottom:10
  },
  searchPlaceholder:{flex:1,marginLeft:5,color:'#aaa'},
  listViewBtn:{
    padding:5,borderWidth:1,borderColor:'#ccc',borderRadius:15
  },
  listViewText:{color:'#888'},
  filters:{
    flexDirection:'row',alignItems:'center',marginBottom:10,gap:6
  },
  filterBtn:{
    flexDirection:'row',paddingHorizontal:10,paddingVertical:5,borderRadius:15,borderWidth:1,borderColor:'#ccc',alignItems:'center'
  },
  filterText:{marginLeft:4,color:'#555'},
  locationBtn:{marginLeft:'auto'},
  mapArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.9 }] // adjust scale if necessary
  },
  
  node:{
  position:'absolute',
  paddingHorizontal:10,
  paddingVertical:8,
  borderRadius:12,
  elevation:3,
  minWidth:70,
  alignItems:'center',
  justifyContent:'center',
  marginLeft: '50%', 
  marginTop: '50%', 
  transform: [{ translateX: -40 }, { translateY: -20 }]
},

  nodeText:{
    color:'#fff',fontSize:12,fontWeight:'bold',textAlign:'center'
  },
  popup: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  popupText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  popupButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F8797E',
    borderRadius: 8,
  },
  
});
