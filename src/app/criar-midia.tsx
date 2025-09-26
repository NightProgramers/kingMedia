import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { db } from '../FirebaseConnection'
import { doc, getDoc } from 'firebase/firestore'


export default function Index() {
  function criarMidia() {

  }

  return (
    <View style={styles.container}>
      <Text>O que pretende organizar?</Text>
      <TouchableOpacity style={styles.botão} onPress={criarMidia}>
        <Text>Serie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  botão: {
    backgroundColor: '#FAA916',
    paddingVertical: 5,
    paddingHorizontal: 60,
    borderRadius: 25,
  }
});