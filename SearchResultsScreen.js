import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const SearchResultsScreen = ({ route }) => {
  const { results } = route.params;  // Retrieve the results passed through navigation

  return (
    <ScrollView style={styles.container}>
      {results.map((song, index) => (
        <View key={index} style={styles.resultItem}>
          <Image source={{ uri: song.image }} style={styles.image} />
          <Text style={styles.title}>{song.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  resultItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  }
});

export default SearchResultsScreen;
