import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from './FavoritesContext'; // Import the context hook for accessing favorites

const FavoritesPage = () => {
  // Access favorites and removeFavorite method from the context
  const { favorites, removeFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>
      <FlatList
        data={favorites} // Use favorites from context
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.itemText, { color: 'green' }]}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.removeButton}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()} // Ensure key is a string
      />
    </View>
  );
};

// Styles for the Favorites page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#212121'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  removeButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FavoritesPage;
