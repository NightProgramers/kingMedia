import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import CardSeries from "../../components/CardSeries";
import Header from "../../components/Header";
import styles from "./style";

const API_KEY = "a9939e569b6b6e3c862fc962fe6e672c"; // <- substitua pela sua chave do TMDB
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type Item = {
  id: string;
  title: string;
  genre: string;
  imageUrl?: string | null;
};

// dados iniciais tipados
const seriesData: Item[] = [
  { id: "1", title: "Culpa Minha", genre: "Adolescente/Drama" },
  { id: "2", title: "The Rookie", genre: "Ação/Policial" },
  { id: "3", title: "Senhor dos anéis", genre: "fantasia/aventura" },
];

const filmsData: Item[] = [
  { id: "4", title: "Top Gun", genre: "Ação" },
  { id: "5", title: "Tropa de Elite", genre: "Ação/Policial" },
  { id: "6", title: "It a Coisa", genre: "Terror" },
];

const livrosData: Item[] = [
  { id: "7", title: "Como eu era antes de você", genre: "Romance" },
  { id: "8", title: "harry potter", genre: "Romance" },
  { id: "9", title: "A rainha vermelha", genre: "Drama" },
];

// funções com tipos explícitos
async function fetchPosterForMovie(title: string): Promise<string | null> {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      title
    )}&language=pt-BR`;
    const res = await fetch(url);
    const json = await res.json();
    const first = json.results && json.results[0];
    if (first && first.poster_path) return IMAGE_BASE + first.poster_path;
  } catch (err) {
    // console.warn("movie search error", err);
  }
  return null;
}

async function fetchPosterForTv(title: string): Promise<string | null> {
  try {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      title
    )}&language=pt-BR`;
    const res = await fetch(url);
    const json = await res.json();
    const first = json.results && json.results[0];
    if (first && first.poster_path) return IMAGE_BASE + first.poster_path;
  } catch (err) {
    // console.warn("tv search error", err);
  }
  return null;
}

export default function Home(){
  // useState com tipagem explícita
  const [series, setSeries] = useState<Item[]>(seriesData);
  const [films, setFilms] = useState<Item[]>(filmsData);
  const [books, setBooks] = useState<Item[]>(livrosData);

  useEffect(() => {
    async function attachImages(): Promise<void> {
      // Series (use search/tv)
      const seriesWithImages = await Promise.all(
        seriesData.map(async (item) => {
          const poster = await fetchPosterForTv(item.title);
          return { ...item, imageUrl: poster };
        })
      );
      setSeries(seriesWithImages);

      // Filmes (use search/movie)
      const filmsWithImages = await Promise.all(
        filmsData.map(async (item) => {
          const poster = await fetchPosterForMovie(item.title);
          return { ...item, imageUrl: poster };
        })
      );
      setFilms(filmsWithImages);

      // Livros: TMDB não é fonte de livros — tentativa como movie (fallback null)
      const booksWithImages = await Promise.all(
        livrosData.map(async (item) => {
          const poster = await fetchPosterForMovie(item.title);
          return { ...item, imageUrl: poster };
        })
      );
      setBooks(booksWithImages);
    }

    attachImages();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Header title="Séries" />
        <FlatList<Item>
          data={series}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardSeries title={item.title} genre={item.genre} image={item.imageUrl} />
          )}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
        />

        <Header title="Filmes" />
        <FlatList<Item>
          data={films}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardSeries title={item.title} genre={item.genre} image={item.imageUrl} />
          )}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
        />

        <Header title="Livros" />
        <FlatList<Item>
          data={books}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardSeries title={item.title} genre={item.genre} image={item.imageUrl} />
          )}
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
}