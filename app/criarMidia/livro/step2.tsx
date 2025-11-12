import { InputSearch } from "@/components/InputSearch";
import { themas } from "@/global/themas";
import { Text, View, StyleSheet} from "react-native";

export default function LivroStep2() {
  return (
    <View style={styles.container}>
      <InputSearch placeholder="Pesquise o nome do livro"></InputSearch>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: themas.colors.grayStrong,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    padding: 20,
  }
});