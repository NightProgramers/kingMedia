import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "@/global/themas";

export function ImagemInput() {
  const [image, setImage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false); // 👈 controla o foco visual

  const pickImage = async () => {
    try {
      setIsFocused(true); // 👈 ativa o foco (borda amarela)
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        alert("Permissão para acessar as imagens é necessária!");
        setIsFocused(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // 👇 pequeno atraso pra deixar a transição suave
      setTimeout(() => setIsFocused(false), 200);
    }
  };

  // 💡 Borda dinâmica:
  const borderColor = image || isFocused
    ? themas.colors.Secondary // amarela se selecionando ou imagem escolhida
    : themas.colors.grayDark; // cinza quando vazio

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor }]}
      onPress={pickImage}
      activeOpacity={0.8}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <MaterialIcons name="add-photo-alternate" size={120} color="#ccc" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 189,
    height: 252,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: themas.colors.LowYellow,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
