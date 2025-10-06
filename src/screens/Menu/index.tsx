import { ButtonBack } from "@/components/ButtonBack";
import { ButtonIcon } from "@/components/ButtonIcon";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



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
      <ButtonIcon title="criar" onPress={criarMidia} iconName="favorite"/>
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