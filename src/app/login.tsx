import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import { useRouter } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const router = useRouter(); // ✅ inicializa o hook aqui

    function getLogin() {
        try {
            if (!email || !password) {
                return Alert.alert("Atenção", "Informe os campos obrigatórios!");
            }
            if (email === "gionata" && password === "123") {
                console.log("Logado com sucesso!");
            } else {
                Alert.alert("Usuário não encontrado!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LinearGradient
            colors={["#C73E1D", "#FAA916"]}
            start={{ x: 0.1, y: 0.54 }}
            end={{ x: 1, y: 0.6 }}
            locations={[0, 0.7]}
            style={style.container}
        >
            {/* 🔙 Botão Voltar */}
            <TouchableOpacity onPress={() => {router.back();}}
                style={{ position: "absolute", top: 50, left: 20, zIndex: 10 }}
            ><Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>

            {/* 🔙 Botão Voltar */}


            {/* Topo */}
            <View style={style.boxTop}>
                <Image
                    style={style.img}
                    source={require("../../assets/images/logo2.png")}
                />
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
                        style={{ marginRight: 8 }}
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
                        style={{ marginRight: 8 }}
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
                    <TouchableOpacity onPress={() => setVisible(!visible)}>
                        <MaterialIcons
                            name={visible ? "visibility-off" : "visibility"}
                            size={20}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </View>

                <View style={style.boxEquecido}>
                    <Text style={style.textEquecido}>Esqueceu a senha!</Text>
                </View>
            </View>

            {/* Botão */}
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} onPress={getLogin}>
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
                    Ainda não possui uma conta?{" "}
                    <Text style={style.cadastreSe}>Cadastre-se</Text>
                </Text>
            </View>
        </LinearGradient>
    );
}
