import { themas } from "@/global/themas";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function SelectSimples() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Assistindo!");

  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>

        <Text style={{ color: "white", fontWeight: "bold" }}>Status</Text>
        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.button}>

          <Text style={styles.textoIcon}> ⟳ {selected} {open ? "▲" : "▼"} </Text>

        </TouchableOpacity>

        {/* Opção (mostra só quando open for true) */}
        {open && (
          <TouchableOpacity onPress={() => {
            setSelected("episodio: 10");
            setOpen(false);
          }} style={styles.caixa}>
            <Text>episodio: 10</Text>
          </TouchableOpacity>
        )}

      </View>
      <View style={{ gap: 10 }}>
        <Text style={{ color: "white" }}>Episodios Assistidos</Text>
        <View style={{ width: "100%", borderBlockColor: "1px", borderBottomWidth: 1, borderBottomColor: themas.colors.Secondary }}></View>
      </View>


          <TouchableOpacity>

            <Text></Text>
          </TouchableOpacity>


    </View>
  );
}
