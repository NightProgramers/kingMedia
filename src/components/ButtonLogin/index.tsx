import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function ButtonLogin() {
    const router = useRouter();
   
    function login(){
        router.push("/login");
      }

    return (

        <TouchableOpacity onPress={login} style={styles.buttonUm}>
            <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>
        
    )
};