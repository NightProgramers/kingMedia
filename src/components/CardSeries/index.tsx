import React from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  title: string;
  genre?: string;
  image?: string | null;
  onPress?: () => void;
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = 140;
const CARD_HEIGHT = 210;

export default function CardSeries({ title, genre, image, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(0,0,0,0.08)" }}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${title}`}
    >
      <View style={styles.card}>
        <ImageBackground
          source={image ? { uri: image } : undefined}
          style={styles.image}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          {/* overlay para legibilidade */}
          <View style={styles.overlay} />
          {/* gênero como badge */}
          {genre ? (
            <View style={styles.badge}>
              <Text numberOfLines={1} style={styles.badgeText}>
                {genre}
              </Text>
            </View>
          ) : null}
        </ImageBackground>

        {/* title com truncamento */}
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>

        {/* placeholder / pequena informação */}
        <Text numberOfLines={1} style={styles.subtitle}>
          {image ? "Ver detalhes" : "Sem imagem disponível"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 14,
    width: CARD_WIDTH,
  },
  pressed: {
    opacity: 0.85,
  },
  card: {
    width: CARD_WIDTH,
    // sombra iOS
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: CARD_HEIGHT,
    justifyContent: "flex-start",
  },
  imageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 100%)",
  },
  // badge de gênero no canto superior esquerdo
  badge: {
    margin: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 11,
    color: "#fff",
    maxWidth: CARD_WIDTH - 40,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    marginHorizontal: 8,
    color: "#111",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: 8,
    marginBottom: 10,
  },
});
