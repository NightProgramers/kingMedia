import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function SelectSimples() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Assistindo!");

  const options = ["episodio: 10"];

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>Status</Text>

      {/* Botão principal */}
      <TouchableOpacity
        style={[styles.button, { flexDirection: "row", alignItems: "center",  }]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        {/* Ícone de carregamento parado */}
        <Text style={{ fontSize: 18, marginRight: 10, marginLeft:10}}>⟳</Text>

        {/* Texto principal */}
        <Text style={[styles.buttonText, { fontSize: 16 }]}>{selected}</Text>

        {/* Setinha no final */}
        <Text style={{ fontSize: 18, marginLeft: 200,  }}>▼</Text>
      </TouchableOpacity>

      {/* Opções abaixo do botão */}
      {open && (
        <View style={styles.optionsContainer}>
          {options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={styles.option}
              onPress={() => {
                setSelected(opt);
                setOpen(false);
              }}
            >
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Caixa inferior */}
      <View style={styles.caixa2}>
        <Text style={{ color: "white", fontWeight: "600" }}>Episodios assistidos</Text>
        <View style={styles.traco}></View>
      </View>


      <View>
        <TouchableOpacity>
               
        </TouchableOpacity>

      </View>







    </View>










  );
}
