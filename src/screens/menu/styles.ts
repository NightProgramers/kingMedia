import { themas } from "@/global/themas";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: themas.colors.grayStrong,
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