import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { db } from '../FirebaseConnection'
import { doc, getDoc } from 'firebase/firestore'
import { Button } from "@/components/Button";



export default function Index() {
  function criarMidia() {
    router.navigate("/criar-midia")
  }

  return (
    <View style={styles.container}>
      <Text>menu</Text>
      <TouchableOpacity style={styles.botão} onPress={criarMidia}>
        <Text>Criar</Text>
      </TouchableOpacity>
      <Button title="criar" onPress={criarMidia} iconName="favorite"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    padding: 20,
  },
  botão: {
    backgroundColor: '#af662aff',
    width:'100%',
    paddingVertical: 5,
    paddingHorizontal: 60,
    borderRadius: 25,
  }
});