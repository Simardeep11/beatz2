import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from './FavoritesContext'; // Make sure the path to FavoritesContext is correct

const SongListItem = ({ song }) => {
  const { addFavorite } = useFavorites();

  const addSongToFavorites = () => {
    addFavorite(song);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{song.title}</Text>
      <TouchableOpacity onPress={addSongToFavorites} style={styles.favoriteButton}>
        <Text>Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for your component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: '#007BFF',
    borderRadius: 5
  }
});

export default SongListItem;
