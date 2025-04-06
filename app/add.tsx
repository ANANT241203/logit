import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Switch } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function AddScreen({ }) {
  // States for the form
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('');
  const [by, setBy] = useState('');
  const [type, setType] = useState('');
  //  const [isSearch, setSearch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [date, setDate] = useState('');
  const [review, setReview] = useState('');
  const [share, setShare] = useState(false);
  const [stars, setStars] = useState(0);


  // Handler for the search input
  const handleSearch = () => {
    console.log('Search for:', searchText);
    // Implement search functionality here
  };

  const handleDone = () => {
    console.log('Added item:', { title, by, type });
    setModalVisible(true);
  };

  const handleShareToggle = () => setShare(!share);

  const handleStars = (star) => {
    setStars(star);
  };

  const handleProceed = () => {
    // Handle proceed to ranking logic
    console.log('Proceeding to ranking...');
    setModalVisible(false);
  };

  const handleRankLater = () => {
    // Handle rank later logic
    console.log('Rank later...');
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#aaa" />
        <TextInput
          placeholder="Find Title"
          value={searchText}
          onChangeText={setSearchText} // Update search text when typed
          onSubmitEditing={handleSearch} // Trigger search when the user presses "Enter"
          placeholderTextColor="#333"
        />
        <TouchableOpacity style={styles.mapViewBtn} onPress={handleSearch}>
          <Text style={styles.mapViewText}>Search</Text>
        </TouchableOpacity>
      </View>


      {/* Bubble Buttons for Type Selection */}
      <View style={styles.buttonContainer}>
        {['Movie', 'Book', 'TV Show', 'Album'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.bubbleButton, type === item && styles.selectedButton]}
            onPress={() => setType(item)}
          >
            <Text style={styles.bubbleText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Add Your Own Section */}
      <Text style={styles.sectionTitle}>Add Your Own</Text>


      {/* Title Label and Input */}
      <View style={styles.row}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>


      {/* "By" Label and Input */}
      <View style={styles.row}>
        <Text style={styles.label}>By:</Text>
        <TextInput
          style={styles.input}
          value={by}
          onChangeText={setBy}
        />
      </View>


      {/* Type Selection */}
      <View style={styles.row}>
        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
        />
      </View>


      {/* Done Button */}
      <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>

      {/* Modal for Additional Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>By {by}</Text>

            <TextInput
              style={styles.modalInput}
              value={date}
              onChangeText={setDate}
              placeholder="Add date finished"
              placeholderTextColor="#333"
            />

            <TextInput
              style={styles.modalInput}
              value={review}
              onChangeText={setReview}
              placeholder="Add a review"
              placeholderTextColor="#333"
            />

            <Text style={styles.modalLabel}>Rate this {type}</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStars(star)}>
                  <FontAwesome
                    name={stars >= star ? 'star' : 'star-o'}
                    size={24}
                    color="#9898989"
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.modalLabel}>Share with friends?</Text>
              <Switch value={share} onValueChange={handleShareToggle} trackColor={{ false: '#898989', true: '#81b0ff' }}/>
            </View>



            {/* Proceed and Rank Later Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handleProceed}>
                <Text style={styles.buttonText}>Proceed to Ranking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRankLater}>
                <Text style={styles.buttonText}>Rank Later</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>


    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    width: '15%', // Adjust this to control the width of the label
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '400',
    width: '45%', // Adjust this to control the width of the label
    paddingBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 60,
  },
  bubbleButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#898989',
  },
  bubbleText: {
    color: '#333',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '85%', // Adjust to fit the input next to the label
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalInput: {
    width: '85%', // Adjust to fit the input next to the label
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  doneButtonText: {
    color: '#333',
    fontSize: 16,
  },
  mapViewBtn: {
    marginLeft: 'auto',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15
  },
  mapViewText: {
    color: '#888'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    marginTop: 50,
    width: '100%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '80%',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
  },
});