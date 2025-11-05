import { themas } from "@/global/themas";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 70,
    gap:80,
  },
  button: {
    backgroundColor: themas.colors.Secondary,
    padding: 12,
    borderRadius: 10,
  },
  textoIcon: {
    textAlign: "center",
    fontWeight: "600"
  },
  caixa: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center",
  }


});
