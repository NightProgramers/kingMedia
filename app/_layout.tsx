import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#313d49',
    },
    headerTintColor: '#D9D9D9',
    headerTitleStyle: {
      fontWeight: 'medium',
      fontSize: 22,
    },
    headerTitleAlign: 'left',
    headerShown: true,
    presentation: 'transparentModal',
    contentStyle: {
      backgroundColor: '#313d49'
    },


  }}>
    <Stack.Screen name="index" options={{ title: "", headerShown: false }}></Stack.Screen>

    <Stack.Screen name="login" options={{ title: "", headerShown: false, }}></Stack.Screen>

    <Stack.Screen name="cadastro" options={{
      title: "",
      headerTransparent: true,     // 🔑 deixa o header transparente
      headerBackTitle: "",
      headerTintColor: "#fff",     // cor da seta
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: "transparent", // garante fundo transparente
      }
    }}></Stack.Screen>

    <Stack.Screen name="menu" options={{ title: "Criar midia", headerShown: false }}></Stack.Screen>
    <Stack.Screen name="criar-midia" options={{ title: "Criar midia" }}></Stack.Screen>
  </Stack >;

}


