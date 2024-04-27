import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import axios from 'axios'; // Ensure axios is imported
import {
  Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput
} from 'react-native';
import { useFavorites } from './FavoritesContext'; // Import the context hook

const songs = [
  {
    id: '1',
    uri: require('./music/Hass Hass - Diljit Dosanjh.mp3'),
    title: 'Hass Hass - Diljit Dosanjh',
    image: require('./music/1.jpeg')
  },
  {
    id: '2',
    uri: require('./music/Khutti - Diljit Dosanjh.mp3'),
    title: 'Khutti - Diljit Dosanjh',
    image: require('./music/2.jpeg')
  },
  {
    id: '3',
    uri: require('./music/Luna - Diljit Dosanjh.mp3'),
    title: 'Luna - Diljit Dosanjh',
    image: require('./music/3.jpeg')
  }
];

const artists = [
  {
    id: '4',
    image: require('./music/4.jpg')
  },
  {
    id: '5',
    image: require('./music/5.jpg')
  },
  {
    id: '6',
    image: require('./music/6.jpg')
  },
  {
    id: '7',
    image: require('./music/7.jpg')
  }
];

const HomePage = () => {
  const navigation = useNavigation();
  const [playing, setPlaying] = useState(-1);
  const [sound, setSound] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const fetchSongs = async () => {
    if (!searchQuery) return; // Avoid empty queries
    try {
      const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=song&limit=10`);
      const fetchedSongs = response.data.results.map(song => ({
        id: song.trackId.toString(),
        uri: song.previewUrl,
        title: song.trackName,
        image: song.artworkUrl100
      }));
      navigation.navigate('SearchResults:', { results: fetchedSongs });
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const playMusic = async (index) => {
    if (playing === index) {
      if (sound) {
        await sound.pauseAsync();
        setPlaying(-1);
      }
      return;
    }

    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      songs[index].uri,
      { shouldPlay: true }
    );
    setSound(newSound);
    setPlaying(index);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        newSound.unloadAsync();
        setPlaying(-1);
        setSound(null);
      }
    });
  };

  const toggleFavorite = (song) => {
    if (favorites.some(f => f.id === song.id)) {
      removeFavorite(song.id);
    } else {
      addFavorite(song);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>BEATS</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileIcon}
        >
          <View style={styles.profileIconContainer}>
            <Text style={styles.profileIconText}>SK</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Songs..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={fetchSongs} // Submit search query on enter key press
      />

      <Text style={styles.sectionHeading}>Top Songs</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {songs.filter(song => song.title.toLowerCase().includes(searchQuery.toLowerCase())).map((song, index) => (
          <View key={song.id} style={styles.horizontalItem}>
            <Image source={song.image} style={styles.horizontalImage} />
            <Text style={styles.songName}>{song.title}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionHeading}>Artist</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {artists.map((artist) => (
          <View key={artist.id} style={styles.horizontalItem}>
            <Image source={artist.image} style={styles.horizontalImage} />
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionHeading}>Downloads</Text>
      <View style={styles.list}>
        {songs.filter(song => song.title.toLowerCase().includes(searchQuery.toLowerCase())).map((song, index) => (
          <View key={song.id} style={styles.songItem}>
            <TouchableOpacity onPress={() => playMusic(index)} style={styles.playButton}>
              <Image source={song.image} style={styles.songImage} />
              <View style={styles.detailsContainer}>
                <Ionicons name={playing === index ? "pause" : "play"} size={30} color="white" />
                <Text style={styles.fileName}>{song.title}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(song)} style={styles.favoriteIcon}>
              <Ionicons name={favorites.some(f => f.id === song.id) ? "heart" : "heart-outline"} size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    padding: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    color: '#1db954',
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchInput: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  sectionHeading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalScroll: {
    paddingHorizontal: 5,
  },
  horizontalItem: {
    width: 150,
    alignItems: 'center',
    marginRight: 10,
  },
  horizontalImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#696969',
    padding: 10,
    marginVertical: 10,
  },
  playButton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  songImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileIcon: {
    padding: 8,
  },
  profileIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1db954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Arial',
  },
  favoriteIcon: {
    padding: 8,
  },
});

export default HomePage;