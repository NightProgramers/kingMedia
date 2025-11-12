import { themas } from "@/global/themas";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 70,
    gap: 20,
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

  check: {
    width: "100%",
    height: 45,
    borderRadius: 8,
    flexDirection: "row",
    borderColor: "orange",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
  },
  caixa: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center",
  },
  inputcaixa: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFA500",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  }

});
