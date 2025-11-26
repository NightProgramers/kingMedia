// app/formsMedia/index.tsx
import { ButtonGeral } from "@/components/ButtonGeral";
import { themas } from "@/global/themas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const API_KEY = "a9939e569b6b6e3c862fc962fe6e672c";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const TMDB_SEARCH_TV = (title: string) =>
  `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
    title
  )}&language=pt-BR`;
const TMDB_TV_DETAILS = (tmdbId: number) =>
  `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${API_KEY}&language=pt-BR`;
const TMDB_SEASON_DETAILS = (tmdbId: number, seasonNumber: number) =>
  `https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}?api_key=${API_KEY}&language=pt-BR`;

const ORANGE = "#FB923C";

type EpisodeLocal = { title: string; checked: boolean; episode_number?: number };
type SeasonLocal = {
  id: number;
  season_number?: number;
  title: string;
  episodes: EpisodeLocal[];
  open: boolean;
  checked: boolean;
};

function makeStorageBase(type: string, id?: string | null, title?: string | null) {
  const base = id ?? title ?? "unknown";
  const safe = String(base).replace(/\s+/g, "_").toLowerCase();
  return `@formsmedia_${type}_${safe}`;
}

export default function FormsMedia() {
  const params = useLocalSearchParams<{ title?: string; id?: string; type?: "tv" | "movie" | "book" }>();
  const title = params.title ?? "Sem título";
  const itemId = params.id ?? null;
  const type = params.type ?? "tv";

  const storageBase = useMemo(() => makeStorageBase(type, itemId, title), [type, itemId, title]);
  const STATUS_KEY = `${storageBase}_status`;
  const SEASONS_KEY = `${storageBase}_seasons`;
  const EPISODE_KEY = `${storageBase}_currentEpisode`;

  const [loading, setLoading] = useState<boolean>(true);
  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState<"watching" | "rewatching" | "quit" | null>(null);
  const [selectedStatusText, setSelectedStatusText] = useState<string>("Assistindo!");
  const [currentEpisode, setCurrentEpisode] = useState<string>("");

  const nextSeasonId = useRef(1000);
  const [seasons, setSeasons] = useState<SeasonLocal[]>([]);
  const [seasonEpisodesCache, setSeasonEpisodesCache] = useState<Record<number, EpisodeLocal[]>>({});
  const [tmdbId, setTmdbId] = useState<number | null>(null);
  const [posterPath, setPosterPath] = useState<string | null>(null);
  const [totalEpisodes, setTotalEpisodes] = useState<number | null>(null);
  const [totalSeasons, setTotalSeasons] = useState<number | null>(null);

  function statusLabel(s: "watching" | "rewatching" | "quit" | null) {
    if (s === "watching") return "Assistindo";
    if (s === "rewatching") return "Reassistindo";
    if (s === "quit") return "Desistiu";
    return "Definir status";
  }

  async function cycleStatus() {
    const order: Array<"watching" | "rewatching" | "quit"> = ["watching", "rewatching", "quit"];
    const idx = status ? order.indexOf(status) : -1;
    const next = order[(idx + 1) % order.length];
    setStatus(next);
    setSelectedStatusText(statusLabel(next));
    try {
      await AsyncStorage.setItem(STATUS_KEY, next);
    } catch (err) {
      console.warn("Erro ao salvar status", err);
    }
  }

  async function persistSeasons(next: SeasonLocal[]) {
    setSeasons(next);
    try {
      await AsyncStorage.setItem(SEASONS_KEY, JSON.stringify(next));
    } catch (err) {
      console.warn("Erro ao salvar seasons", err);
    }
  }

  // initial load: saved state + TMDB meta (poster, totals, seasons)
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [sStatus, sSeasons, sEpisode] = await Promise.all([
          AsyncStorage.getItem(STATUS_KEY),
          AsyncStorage.getItem(SEASONS_KEY),
          AsyncStorage.getItem(EPISODE_KEY),
        ]);

        if (!mounted) return;

        if (sStatus) {
          setStatus(sStatus as any);
          setSelectedStatusText(statusLabel(sStatus as any));
        }
        if (sEpisode) setCurrentEpisode(sEpisode);

        if (sSeasons) {
          try {
            const parsed = JSON.parse(sSeasons) as SeasonLocal[];
            if (Array.isArray(parsed)) setSeasons(parsed);
          } catch {
            // ignore
          }
        }

        // TMDB: only for tv/movie to collect poster and totals
        if (type === "tv" || type === "movie") {
          const res = await fetch(type === "tv" ? TMDB_SEARCH_TV(title) : TMDB_SEARCH_TV(title)); // search tv works for both titles reasonably
          const j = await res.json();
          const first = j.results && j.results[0];
          if (first && first.id) {
            setTmdbId(first.id);
            setPosterPath(first.poster_path ? IMAGE_BASE + first.poster_path : null);

            // if tv, fetch details
            if (type === "tv") {
              const detRes = await fetch(TMDB_TV_DETAILS(first.id));
              const det = await detRes.json();
              if (det) {
                setTotalEpisodes(det.number_of_episodes ?? null);
                setTotalSeasons(det.number_of_seasons ?? (Array.isArray(det.seasons) ? det.seasons.length : null));
                // if no seasons stored yet, populate seasons from TMDB
                if (!sSeasons && Array.isArray(det.seasons)) {
                  const mapped: SeasonLocal[] = det.seasons
                    .filter((s: any) => s.season_number !== 0)
                    .map((s: any) => ({
                      id: s.id ?? nextSeasonId.current++,
                      season_number: s.season_number,
                      title: s.name ?? `Temporada ${s.season_number}`,
                      episodes: [],
                      open: false,
                      checked: false,
                    }));
                  if (mapped.length > 0) await persistSeasons(mapped);
                }
              }
            }
            // for movie, we can set totals null/1
            if (type === "movie") {
              setTotalEpisodes(null);
              setTotalSeasons(1);
            }
          }
        }
      } catch (err) {
        console.warn("Erro load FormsMedia", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, type]);

  function addSeason() {
    const id = nextSeasonId.current++;
    const newSeason: SeasonLocal = {
      id,
      title: `Temporada ${seasons.length + 1}`,
      episodes: [{ title: "Episódio 1", checked: false }],
      open: true,
      checked: false,
    };
    persistSeasons([...seasons, newSeason]);
  }

  function addEpisode(seasonId: number) {
    const next = seasons.map((s) =>
      s.id === seasonId ? { ...s, episodes: [...s.episodes, { title: `Episódio ${s.episodes.length + 1}`, checked: false }] } : s
    );
    persistSeasons(next);
  }

  function toggleSeasonOpen(seasonId: number) {
    const next = seasons.map((s) => (s.id === seasonId ? { ...s, open: !s.open } : s));
    persistSeasons(next);
  }

  function toggleSeasonChecked(seasonId: number) {
    const next = seasons.map((s) => {
      if (s.id !== seasonId) return s;
      const nextChecked = !s.checked;
      return { ...s, checked: nextChecked, episodes: s.episodes.map((ep) => ({ ...ep, checked: nextChecked })) };
    });
    persistSeasons(next);
  }

  function toggleEpisodeChecked(seasonId: number, epIndex: number) {
    const next = seasons.map((s) => {
      if (s.id !== seasonId) return s;
      const eps = s.episodes.map((ep, i) => (i === epIndex ? { ...ep, checked: !ep.checked } : ep));
      return { ...s, episodes: eps };
    });
    persistSeasons(next);
  }

  async function loadSeasonEpisodesFromTmdb(seasonNumber?: number, seasonId?: number) {
    if (!tmdbId || !seasonNumber) return;
    if (seasonEpisodesCache[seasonNumber]) {
      if (seasonId) {
        const s = seasons.find((x) => x.id === seasonId);
        if (s && s.episodes.length === 0) {
          const eps = seasonEpisodesCache[seasonNumber].map((ep) => ({
            title: ep.title ?? `Episódio ${ep.episode_number}`,
            checked: false,
            episode_number: ep.episode_number,
          }));
          const next = seasons.map((x) => (x.id === seasonId ? { ...x, episodes: eps } : x));
          persistSeasons(next);
        }
      }
      return;
    }
    try {
      const res = await fetch(TMDB_SEASON_DETAILS(tmdbId, seasonNumber));
      const j = await res.json();
      const eps = Array.isArray(j.episodes) ? j.episodes : [];
      setSeasonEpisodesCache((prev) => ({ ...prev, [seasonNumber]: eps }));
      if (seasonId) {
        const mapped = eps.map((ep: any) => ({ title: ep.name ?? `Episódio ${ep.episode_number}`, checked: false, episode_number: ep.episode_number }));
        const next = seasons.map((x) => (x.id === seasonId ? { ...x, episodes: mapped } : x));
        persistSeasons(next);
      }
    } catch (err) {
      console.warn("Erro carregar eps TMDB", err);
    }
  }

  function onToggleSeasonOpen(s: SeasonLocal) {
    if (!s.open && s.season_number) {
      loadSeasonEpisodesFromTmdb(s.season_number, s.id);
    }
    toggleSeasonOpen(s.id);
  }

  async function saveEpisode() {
    const parsed = Number(currentEpisode);
    if (!currentEpisode || isNaN(parsed) || parsed <= 0) {
      Alert.alert("Valor inválido", "Digite um número de episódio válido.");
      return;
    }
    try {
      await AsyncStorage.setItem(EPISODE_KEY, String(parsed));
      Alert.alert("Salvo", `Episódio ${parsed} salvo.`);
    } catch {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }

  function clearAll() {
    Alert.alert("Apagar progresso?", "Deseja apagar todo o progresso salvo para esta mídia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(STATUS_KEY);
            await AsyncStorage.removeItem(SEASONS_KEY);
            await AsyncStorage.removeItem(EPISODE_KEY);
            setStatus(null);
            setSeasons([]);
            setCurrentEpisode("");
            setSelectedStatusText("Assistindo!");
            Alert.alert("Removido", "Progresso apagado.");
          } catch (err) {
            Alert.alert("Erro", "Não foi possível apagar.");
          }
        },
      },
    ]);
  }

  // UI
  return (
    <View style={{ flex: 1, backgroundColor: themas?.colors?.grayStrong ?? "#0f172a" }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120, gap: 12 }} showsVerticalScrollIndicator={false}>
        {/* Poster + meta */}
        <View style={styles.posterWrap}>
          {posterPath ? (
            <ImageBackground source={{ uri: posterPath }} style={styles.poster} imageStyle={styles.posterImage}>
              <View style={styles.posterOverlay} />
              <View style={styles.posterText}>
                <Text style={styles.posterTitle}>{title}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>Temporadas: {totalSeasons ?? "—"}</Text>
                  <Text style={styles.metaText}>Episódios: {totalEpisodes ?? "—"}</Text>
                </View>
              </View>
            </ImageBackground>
          ) : (
            <View style={[styles.poster, styles.posterPlaceholder]}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>{title}</Text>
              <Text style={{ color: "#ddd", marginTop: 8 }}>Sem imagem disponível</Text>
            </View>
          )}
        </View>

        {/* Status */}
        <View style={{ gap: 8 }}>
          <Text style={localStyles.sectionLabel}>Status</Text>

          <TouchableOpacity onPress={() => setStatusOpen((v) => !v)} style={[localStyles.button, { justifyContent: "space-between" }]}>
            <Text style={localStyles.buttonText}>⟳ {selectedStatusText}</Text>
            <Text style={localStyles.buttonText}>{statusOpen ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {statusOpen && (
            <View style={{ marginTop: 8 }}>
              <TouchableOpacity
                style={localStyles.option}
                onPress={() => {
                  setStatus("watching");
                  setSelectedStatusText("Assistindo");
                  setStatusOpen(false);
                  AsyncStorage.setItem(STATUS_KEY, "watching").catch(() => {});
                }}
              >
                <Text style={localStyles.optionText}>Assistindo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={localStyles.option}
                onPress={() => {
                  setStatus("rewatching");
                  setSelectedStatusText("Reassistindo");
                  setStatusOpen(false);
                  AsyncStorage.setItem(STATUS_KEY, "rewatching").catch(() => {});
                }}
              >
                <Text style={localStyles.optionText}>Reassistindo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={localStyles.option}
                onPress={() => {
                  setStatus("quit");
                  setSelectedStatusText("Desistiu");
                  setStatusOpen(false);
                  AsyncStorage.setItem(STATUS_KEY, "quit").catch(() => {});
                }}
              >
                <Text style={localStyles.optionText}>Desistiu</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Divider */}
        <View style={{ marginTop: 6 }}>
          <Text style={{ color: themas?.colors?.Secondary ?? ORANGE }}>Episódios / Temporadas</Text>
          <View style={{ width: "100%", borderBottomWidth: 1, borderBottomColor: themas?.colors?.Secondary ?? ORANGE, marginTop: 8 }} />
        </View>

        {/* episódio atual */}
        <View style={{ marginTop: 6 }}>
          <Text style={localStyles.label}>Em qual episódio você está?</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TextInput value={currentEpisode} onChangeText={setCurrentEpisode} placeholder="Número do episódio" keyboardType="numeric" style={localStyles.input} />
            <TouchableOpacity style={[localStyles.smallBtn, { backgroundColor: ORANGE }]} onPress={saveEpisode}>
              <Text style={localStyles.smallBtnText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Temporadas list */}
        <View style={{ marginTop: 12 }}>
          {loading ? (
            <ActivityIndicator style={{ marginVertical: 12 }} />
          ) : seasons.length === 0 ? (
            <Text style={{ color: "#fff" }}>Nenhuma temporada encontrada — adicione manualmente.</Text>
          ) : (
            seasons.map((s) => (
              <View key={s.id} style={localStyles.seasonCard}>
                <View style={localStyles.seasonHeader}>
                  <TouchableOpacity
                    onPress={() => toggleSeasonChecked(s.id)}
                    style={[
                      localStyles.checkbox,
                      s.checked && { backgroundColor: ORANGE, borderColor: ORANGE },
                    ]}
                    accessibilityLabel={`Marcar todos episódios da ${s.title}`}
                  >
                    {s.checked && <Text style={{ color: "#fff", fontWeight: "700" }}>✓</Text>}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => onToggleSeasonOpen(s)} style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={localStyles.seasonTitle}>{s.title}</Text>
                    <Text style={localStyles.seasonMeta}>{s.episodes?.length ?? "?"} episódios</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => toggleSeasonChecked(s.id)} style={[localStyles.btnOutline, s.checked ? { backgroundColor: ORANGE, borderColor: ORANGE } : {}]}>
                    <Text style={[localStyles.btnOutlineText, s.checked ? { color: "#fff" } : {}]}>{s.checked ? "Concluída" : "Marcar"}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => toggleSeasonOpen(s.id)} style={{ marginLeft: 8 }}>
                    <Text style={{ color: "#fff" }}>{s.open ? "▲" : "▼"}</Text>
                  </TouchableOpacity>
                </View>

                {s.open && (
                  <View style={{ paddingLeft: 44, paddingTop: 10 }}>
                    {s.episodes.map((ep, idx) => (
                      <View key={idx} style={localStyles.episodeRow}>
                        <TouchableOpacity
                          onPress={() => toggleEpisodeChecked(s.id, idx)}
                          style={[localStyles.checkbox, ep.checked && { backgroundColor: ORANGE, borderColor: ORANGE }]}
                          accessibilityLabel={`Marcar ${ep.title}`}
                        >
                          {ep.checked && <Text style={{ color: "#fff", fontWeight: "700" }}>✓</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSelectedStatusText(ep.title)} style={{ marginLeft: 10, flex: 1 }}>
                          <Text style={{ color: "#fff" }}>{ep.title}</Text>
                        </TouchableOpacity>

                        <Text style={{ color: ep.checked ? ORANGE : "#999", width: 36, textAlign: "center" }}>{ep.checked ? "✓" : "○"}</Text>
                      </View>
                    ))}

                    <TouchableOpacity onPress={() => addEpisode(s.id)} style={{ marginTop: 8 }}>
                      <Text style={{ color: themas.colors?.Secondary ?? ORANGE }}>+ Adicionar Episódio</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* botões para adicionar temporada */}
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={addSeason}>
            <Text style={{ color: themas.colors?.Secondary ?? ORANGE }}>+ Adicionar Temporada</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* botão fixo */}
      <View style={localStyles.footer}>
        <ButtonGeral title="Enviar" path="/menu" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  posterWrap: { width: "100%", borderRadius: 12, overflow: "hidden", marginBottom: 6 },
  poster: { width: "100%", height: 180, justifyContent: "flex-end" },
  posterImage: { resizeMode: "cover" },
  posterOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.28)" },
  posterText: { padding: 12 },
  posterTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  metaRow: { flexDirection: "row", gap: 12, marginTop: 6 },
  metaText: { color: "#fff", opacity: 0.9, marginRight: 12 },
  posterPlaceholder: { height: 120, alignItems: "center", justifyContent: "center" },
});

const localStyles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800", color: "#fff" },
  sectionLabel: { color: "#fff", fontWeight: "700" },
  button: {
    backgroundColor: themas?.colors?.Primary ?? "#111827",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#222",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  option: { paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#0b1220", borderRadius: 8, marginTop: 6 },
  optionText: { color: "#fff" },
  label: { color: "#fff", fontWeight: "700", marginBottom: 6 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    color: "#fff",
    backgroundColor: "#99999aff",
  },
  smallBtn: { backgroundColor: themas.colors?.Secondary ?? ORANGE, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, marginLeft: 8 },
  smallBtnText: { color: "#fff", fontWeight: "700" },
  seasonCard: { marginBottom: 12, backgroundColor: themas.colors.LowYellow, borderRadius: 10, padding: 10, borderWidth: 1, borderColor: "#0b1724" },
  seasonHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  checkbox: { width: 36, height: 36, borderRadius: 8, backgroundColor: "#0b1724", borderWidth: 1, borderColor: "#222", alignItems: "center", justifyContent: "center" },
  seasonTitle: { color: "#fff", fontWeight: "700" },
  seasonMeta: { color: "#9ca3af", fontSize: 12 },
  btnOutline: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: "#333", backgroundColor: "#071026" },
  btnOutlineActive: { backgroundColor: themas.colors?.Secondary ?? ORANGE, borderColor: themas.colors?.Secondary ?? ORANGE },
  btnOutlineText: { color: "#fff", fontWeight: "700" },
  btnOutlineTextActive: { color: "#fff" },
  episodeRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderColor: "#071426", paddingRight: 6 },
  footer: { position: "absolute", left: 16, right: 16, bottom: 20, height: 56 },
});
