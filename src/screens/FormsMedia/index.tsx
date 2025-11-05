import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { style } from "../Login/styles";
import { styles } from "./styles";

export default function SelectSimples() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Assistindo!");
  
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.button}>
      
        <Text style={styles.textoIcon}> ⟳ {selected} {open ? "▲" : "▼"} </Text>
      
      </TouchableOpacity>

      {/* Opção (mostra só quando open for true) */}
      {open && (
        <TouchableOpacity onPress={() => {setSelected("episodio: 10");
          setOpen(false);}} style={styles.caixa}>
          <Text>episodio: 10</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
