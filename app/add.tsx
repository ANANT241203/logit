import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Switch, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMap } from '../components/MapContext';


export default function AddScreen({ }) {
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('');
  const [by, setBy] = useState('');
  const [type, setType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [review, setReview] = useState('');
  const [share, setShare] = useState(false);
  const [stars, setStars] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { addNode, addEdge } = useMap();


  const handleSearch = () => {
    console.log('Search for:', searchText);
  };

  const handleDone = () => {
    if (title && type) {
      const y = Math.random() * 200 + 120;
      const x = Math.random() * 200 - 100;
      let color = '#4DDEFF';
      let nodeType: 'media' | 'friend' = 'media';
      let iconType: 'media' | 'book' | 'music' = 'media';
      if (type === 'Book') {
        color = '#FFA600';
        iconType = 'book';
      } else if (type === 'Movie' || type === 'TV Show') {
        color = '#00D62E';
        iconType = 'media';
      } else if (type === 'Album') {
        color = '#4DDEFF';
        iconType = 'music';
      }
      addNode(title, { x, y, color, type: nodeType, iconType });
      addEdge('Selin', title);
    }
    setModalVisible(true);
  };

  const resetForm = () => {
    setSearchText('');
    setTitle('');
    setBy('');
    setType('');
    setDate('');
    setReview('');
    setShare(false);
    setStars(0);
  };

  const handleProceed = () => {
    console.log('Proceeding to ranking...');
    setModalVisible(false);
    resetForm();
  };

  const handleStars = (star: React.SetStateAction<number>) => {
    setStars(star);
  };

  const handleShareToggle = () => setShare(!share);


  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#aaa" />
        <TextInput
          placeholder="Find Title"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#333"
        />
        <TouchableOpacity style={styles.mapViewBtn} onPress={handleSearch}>
          <Text style={styles.mapViewText}>Search</Text>
        </TouchableOpacity>
      </View> */}


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


      {/* Add your own section */}
      <Text style={styles.sectionTitle}>Add Your Own</Text>


      <View style={styles.row}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>


      <View style={styles.row}>
        <Text style={styles.label}>By:</Text>
        <TextInput
          style={styles.input}
          value={by}
          onChangeText={setBy}
        />
      </View>


      <View style={styles.row}>
        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
        />
      </View>

      <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>

      {/* Popup to add review */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                resetForm();
              }}
              style={styles.closeButton}
            >
              <Text>X</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>By {by}</Text>

            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.modalInput}>
              <Text style={{ color: date ? '#000' : '#333' }}>
                {date || 'Add date finished'}
              </Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                textColor='black'
                onChange={(event, selected) => {
                  const currentDate = selected || selectedDate;
                  setShowPicker(false);
                  setSelectedDate(currentDate);
                  setDate(currentDate.toISOString().split('T')[0]);
                }}
              />
            )}


            <TextInput
              style={styles.modalInput}
              value={review}
              onChangeText={setReview}
              placeholder="Add a review"
              placeholderTextColor="#333"
              multiline={true}
            />

            <Text style={styles.modalLabel}>Rate this {type}</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStars(star)}>
                  <FontAwesome
                    name={stars >= star ? 'star' : 'star-o'}
                    size={24}
                    color="#FFD700"
                  />

                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.modalLabel}>Share with friends?</Text>
              <View style={{ transform: [{ translateY: 4 }] }}>
                <Switch
                  value={share}
                  onValueChange={handleShareToggle}
                  trackColor={{ false: '#ccc', true: '#FF6B6B' }}
                  thumbColor={share ? '#fff' : '#f4f3f4'}
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handleProceed}>
                <Text style={styles.buttonText}>Rank Now</Text>
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
    width: '15%',
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
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#FF6B6B',
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
    width: '85%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  doneButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  doneButtonText: {
    color: '#fff',
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
    borderColor: '#FF6B6B',
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
    width: '85%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 20,

  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4DD0E1',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});