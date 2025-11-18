import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import CardSeries from "../../components/CardSeries";
import Header from "../../components/Header";
import styles from "./style";

const seriesData = [
  {
    id: "1",
    title: "Culpa Minha",
    genre: "Adolescente/Drama",
  },
  {
    id: "2",
    title: "The Rookie",
    genre: "Ação/Policial",
  },
  {
    id: "3",
    title: "Senhor dos anéis",
    genre: "fantasia/aventura"
  },
];

const filmsData = [
  {
    id: "4",
    title: "Top Gun",
    genre: "Ação",
  },
  {
    id: "5",
    title: "Tropa de Elite",
    genre: "Ação/Policial",
  },
  {
    id: "6",
    title: "It a Coisa",
    genre: "Terror"
  },
];

const livrosData = [
  {
    id: "7",
    title: "Como eu era antes de você",
    genre: "Romance",
  },
  {
    id: "8",
    title: "Querido jhon",
    genre: "Romance",
  },
  {
    id: "9",
    title: "A rainha vermelha",
    genre: "Drama"
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
      <Header title="Séries" />
      <FlatList
        data={seriesData}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardSeries title={item.title} genre={item.genre} />
        )}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />

      <Header title="Filmes" />
      <FlatList
        data={filmsData}
        horizontal
        keyExtractor={(item)=>item.id}
        renderItem={({ item }) => (
          <CardSeries title={item.title} genre={item.genre} />
        )}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
        />

        <Header title="Livros" />
        <FlatList
        data={livrosData}
        horizontal
        keyExtractor={(item) =>item.id}
        renderItem={({ item }) => (
          <CardSeries title={item.title} genre={item.genre} />
        )}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
        />
        </ScrollView>
      
    </View>
  );
}