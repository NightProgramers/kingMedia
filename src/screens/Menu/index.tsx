// app/media/index.tsx
import { themas } from "@/global/themas";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import CardSeries from "../../components/CardSeries";
import Header from "../../components/Header";

const TMDB_API_KEY = "a9939e569b6b6e3c862fc962fe6e672c";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type TvItem = { id: number; name: string; overview?: string; poster_path?: string | null };
type MovieItem = { id: number; title: string; overview?: string; poster_path?: string | null };
type BookItem = {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string };
    description?: string;
  };
};

export default function MediaScreen() {
  const [series, setSeries] = useState<TvItem[]>([]);
  const [films, setFilms] = useState<MovieItem[]>([]);
  const [books, setBooks] = useState<BookItem[]>([]);

  const [loadingSeries, setLoadingSeries] = useState(true);
  const [loadingFilms, setLoadingFilms] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // séries populares
    async function loadSeries() {
      setLoadingSeries(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=pt-BR&page=1`
        );
        const j = await res.json();
        setSeries(j.results || []);
      } catch (err) {
        console.warn("Erro TMDB series", err);
      } finally {
        setLoadingSeries(false);
      }
    }

    // filmes populares
    async function loadFilms() {
      setLoadingFilms(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR&page=1`
        );
        const j = await res.json();
        setFilms(j.results || []);
      } catch (err) {
        console.warn("Erro TMDB films", err);
      } finally {
        setLoadingFilms(false);
      }
    }

    // livros (Google Books — busca geral, pode alterar a query)
    async function loadBooks() {
      setLoadingBooks(true);
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=20`
        );
        const j = await res.json();
        setBooks(j.items || []);
      } catch (err) {
        console.warn("Erro Google Books", err);
      } finally {
        setLoadingBooks(false);
      }
    }

    loadSeries();
    loadFilms();
    loadBooks();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: themas.colors.grayStrong }}>
      <View style={{ paddingTop: 8 }}>
        {/* SÉRIES */}
        <Header title="Séries Populares" />
        {loadingSeries ? (
          <ActivityIndicator style={{ marginVertical: 24 }} size="large" />
        ) : series.length === 0 ? (
          <Text style={{ paddingHorizontal: 16, marginBottom: 12 }}>Nenhuma série encontrada.</Text>
        ) : (
          <FlatList
            data={series}
            horizontal
            keyExtractor={(i) => String(i.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <CardSeries
                title={item.name}
                genre={item.overview ? item.overview.slice(0, 40) : "Série"}
                image={item.poster_path ? IMAGE_BASE + item.poster_path : null}
                onPress={() =>
                  router.push(
                    `/formsMedia?title=${encodeURIComponent(item.name)}&id=${item.id}&type=tv`
                  )
                }
              />
            )}
          />
        )}

        {/* FILMES */}
        <Header title="Filmes Populares" />
        {loadingFilms ? (
          <ActivityIndicator style={{ marginVertical: 24 }} size="large" />
        ) : films.length === 0 ? (
          <Text style={{ paddingHorizontal: 16, marginBottom: 12 }}>Nenhum filme encontrado.</Text>
        ) : (
          <FlatList
            data={films}
            horizontal
            keyExtractor={(i) => String(i.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <CardSeries
                title={item.title}
                genre={item.overview ? item.overview.slice(0, 40) : "Filme"}
                image={item.poster_path ? IMAGE_BASE + item.poster_path : null}
                onPress={() =>
                  router.push(
                    `/formsMedia?title=${encodeURIComponent(item.title)}&id=${item.id}&type=movie`
                  )
                }
              />
            )}
          />
        )}

        {/* LIVROS */}
        <Header title="Livros" />
        {loadingBooks ? (
          <ActivityIndicator style={{ marginVertical: 24 }} size="large" />
        ) : books.length === 0 ? (
          <Text style={{ paddingHorizontal: 16, marginBottom: 12 }}>Nenhum livro encontrado.</Text>
        ) : (
          <FlatList
            data={books}
            horizontal
            keyExtractor={(i) => String(i.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            renderItem={({ item }) => {
              const info = item.volumeInfo;
              return (
                <CardSeries
                  title={info.title ?? "Sem título"}
                  genre={info.authors ? info.authors.join(", ") : "Autor desconhecido"}
                  image={info.imageLinks?.thumbnail ?? null}
                  onPress={() =>
                    router.push(
                      `/formsMedia?title=${encodeURIComponent(
                        info.title ?? "Livro"
                      )}&id=${item.id}&type=book`
                    )
                  }
                />
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}
