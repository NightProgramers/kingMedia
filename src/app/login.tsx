import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./styles";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [senha, setSenha] = useState();

    function getLogin() {
        try {
            if (!email || !password) {
                return Alert.alert("Atenção", "Informe Os Campos Obrigatórios!")
            }
            if (email === "gionata" && password === "123") {
                console.log("Logado! com Sucesso")
            }
            else {
                Alert.alert("Usuario Não Encontrado!")
            }
        }
        catch (error) {
            console.log(error)

        }

    }


    //testes
    return (
        <LinearGradient
            colors={["#C73E1D", "#FAA916"]}
            start={{ x: 0.1, y: 0.54 }}   // começa no topo
            end={{ x: 1, y: 0.6 }}       // termina embaixo
            locations={[0, 0.7]}           // 70% da cor principal
            style={style.container}      // ocupa toda a tela
        >
            {/* Topo */}
            <View style={style.boxTop}>
                <Image style={style.img} source={require("../../assets/images/logo2.png")}></Image>
            </View>

            {/* Inputs */}
            <View style={style.boxMid}>

                <Text style={style.text}>Entrar</Text>
                {/* Email */}
                <View style={style.boxInput}>
                    <MaterialIcons
                        name="person"
                        size={20}
                        color={"white"}
                        style={{ marginRight: 8, alignItems: "center" }}
                    />
                    <View style={style.separator}></View>

                    <TextInput
                        style={style.input}
                        placeholder="Usuário"
                        placeholderTextColor={"gray"}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Senha */}
                <View style={style.boxInput}>
                    <MaterialIcons
                        name="lock"
                        size={20}
                        color={"white"}
                        style={{ marginRight: 8, alignItems: "center" }}
                    />

                    <View style={style.separator}></View>

                    <TextInput
                        style={style.input}
                        placeholder="Senha"
                        placeholderTextColor={"gray"}
                        secureTextEntry={!visible}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={style.cadeado}><MaterialIcons
                        name="visibility"
                        size={20}
                        color={"white"}
                        style={{ marginRight: 8, alignItems: "center" }}
                        onPress={() => setVisible(!visible)}
                    /></TouchableOpacity >


                </View>
                <View style={style.boxEquecido}>
                    <Text style={style.textEquecido}>Esqueceu a senha!</Text>
                </View>

            </View>

            {/* Botão */}
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} onPress={() => { getLogin() }}>
                    <LinearGradient
                        colors={["#FAA916", "#C73E1D"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={style.button}
                    >
                        <Text style={style.buttonText}>Acessar</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={style.textoCadastro}>
                    Ainda não possui uma conta? <Text style={style.cadastreSe}>Cadastre-se</Text>
                </Text>
            </View>

        </LinearGradient>
    );
}
