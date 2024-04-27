import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
      name: 'Simar',
      email: 'simardeep1112004@gmail.com',
      contactNumber: '999-999-9999',
      country: 'Canada',
      gender: 'Others'
    });

  const handleUpdate = () => {
    Alert.alert('Profile Updated', 'Your profile information has been updated.');
  };

  const handleDelete = () => {
    setProfile({
      name: '',
      email: '',
      contactNumber: '',
      country: '',
      gender: ''
    });
    Alert.alert('Profile Cleared', 'Your profile information has been deleted.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          value={profile.email}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          value={profile.contactNumber}
          onChangeText={(text) => setProfile({ ...profile, contactNumber: text })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={profile.country}
          onChangeText={(text) => setProfile({ ...profile, country: text })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={profile.gender}
          onChangeText={(text) => setProfile({ ...profile, gender: text })}
        />
      </View>
      <Button title="Update Information" onPress={handleUpdate} color="#535353" />
      <Button title="Delete Information" onPress={handleDelete} color="#1db954" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#212121',
  },
  inputGroup: {
    marginBottom: 15,
    color: '#b3b3b3',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#b3b3b3',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    color: '#b3b3b3',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
});

export default ProfilePage;
