import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface CardSeriesProps {
  title: string;
  genre: string;
  image?: string; // opcional, imagem de capa
}

export default function CardSeries({ title, genre, image }: CardSeriesProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <ImageBackground
        source={{
          uri: image
            ? image
            : "https://via.placeholder.com/150x200.png?text=Sem+Imagem",
        }}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.genre} numberOfLines={1}>
            {genre}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

///boa noite///