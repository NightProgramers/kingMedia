import { ButtonLogin } from '@/components/ButtonLogin';
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { style } from "../login/styles";


export default function inicio() {

  return (


    <LinearGradient
      colors={["#C73E1D", "#FAA916"]}
      start={{ x: 0.5, y: 0.54 }}   // começa no topo
      end={{ x: 0.5, y: 1.1 }}       // termina embaixo
      locations={[0, 0.7]}           // 70% da cor principal
      style={style.container2}      // ocupa toda a tela
    >
      <Image
        style={style.img}
        source={require("../../../assets/images/logo.png")}
      />

      <View style={style.viewButao}>
       
        <ButtonLogin title="Login" path="/login"/>

        <TouchableOpacity style={style.buttonDois}>
          <Text style={style.textoBotaoDois}>Inscrever</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>

  );
}

