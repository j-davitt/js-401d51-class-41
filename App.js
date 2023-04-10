import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';

export default function App() {

  const [contacts, setContacts] = useState([]);
  // console.log('contacts', contacts[0]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      console.log('status', status);
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        setContacts(data);
        // if (data.length > 0) {
        //   const contact = data[0];
        //   console.log(contact);
        // }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World!!!!</Text>
      <FlatList 
        data={contacts}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
