import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/ButtonIcon";
import { ButtonBack } from "@/components/ButtonBack";



export default function Index() {
  function criarMidia() {
    router.navigate("/criarMidia")
  }

  return (
    <View style={styles.container}>
      <ButtonBack/>
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