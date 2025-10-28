import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100,
    flex:1,
  },
    label: {
    width: "90%",          // mesma largura do botão
    textAlign: "left",     // texto alinhado à esquerda
    marginBottom: 5,       // espaço entre o texto e o botão
    fontSize: 16,
    fontWeight: "bold",
    color:"white"
  },
  button: {
    backgroundColor: "orange",
    width: "90%",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
  },
  optionsContainer: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 4,
    overflow: "hidden",
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  caixa2:{
    flex:1,
    width:"90%",
    marginTop:80,
    
  },

  traco:{
    width:"100%",
    borderBottomWidth:1,
    borderBottomColor:"orange",
    alignItems:"center",
    marginVertical:10,
    color:"white"

  },


});
