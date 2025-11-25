import { router, Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { themas } from "@/global/themas";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: themas.colors.Secondary,
                tabBarInactiveTintColor: themas.colors.White,
                tabBarStyle: {
                    backgroundColor: themas.colors.grayDark,
                },
            }}
        >
            <Tabs.Screen
                name="menu"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="add" 
                options={{
                    title: '', 
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            onPress={() => router.push('/criarMidia')} 
                            style={{
                                top: -20,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons
                                name="add-circle"
                                size={50}
                                color={themas.colors.Secondary}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Tabs.Screen
                name="perfil"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}