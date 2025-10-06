import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function CriarMidia() {

  return (
    <View style={styles.container}>
      <Text>O que pretende organizar?</Text>
      <TouchableOpacity style={styles.botão}>
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