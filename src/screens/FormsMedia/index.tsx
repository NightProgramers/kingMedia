import { ButtonGeral } from "@/components/ButtonGeral";
import { themas } from "@/global/themas";
import React, { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

// tipo para episódio
type Episode = {
  title: string;
  checked: boolean;
};

// tipo para temporada com id estável
type Season = {
  id: number;
  title: string;
  episodes: Episode[];
  open: boolean;
  checked: boolean; // controla apenas pelo botão da temporada
};

export default function SelectSimples() {
  const [openStatus, setOpenStatus] = useState(false);
  const [selected, setSelected] = useState("Assistindo!");

  // contador para gerar ids únicos para temporadas
  const nextSeasonId = useRef(2);

  const [seasons, setSeasons] = useState<Season[]>([
    {
      id: 1,
      title: "Temporada 1",
      episodes: [
        { title: "Episódio 1", checked: false },
        { title: "Episódio 2", checked: false },
      ],
      open: false,
      checked: false,
    },
  ]);

  // adiciona novo episódio na temporada i (não altera checked da temporada)
  function addEpisode(seasonId: number) {
    setSeasons(prev =>
      prev.map(s =>
        s.id === seasonId
          ? {
              ...s,
              episodes: [
                ...s.episodes,
                { title: `Episódio ${s.episodes.length + 1}`, checked: false },
              ],
            }
          : s
      )
    );
  }

  // adiciona nova temporada (com 1 episódio) e já abre ela
  function addSeason() {
    const id = nextSeasonId.current++;
    const newSeason: Season = {
      id,
      title: `Temporada ${seasons.length + 1}`,
      episodes: [{ title: "Episódio 1", checked: false }],
      open: true, // opcional: já abre a temporada nova
      checked: false,
    };
    setSeasons(prev => [...prev, newSeason]);
  }

  // alterna open da temporada por id
  function toggleSeasonOpen(seasonId: number) {
    setSeasons(prev => prev.map(s => (s.id === seasonId ? { ...s, open: !s.open } : s)));
  }

  // alterna checked da temporada (marca/desmarca todos os episódios)
  function toggleSeasonChecked(seasonId: number) {
    setSeasons(prev =>
      prev.map(s => {
        if (s.id !== seasonId) return s;
        const nextChecked = !s.checked;
        return {
          ...s,
          checked: nextChecked,
          episodes: s.episodes.map(ep => ({ ...ep, checked: nextChecked })),
        };
      })
    );
  }

  // alterna checked de um episódio (NÃO altera checked da temporada)
  function toggleEpisodeChecked(seasonId: number, epIndex: number) {
    setSeasons(prev =>
      prev.map(s => {
        if (s.id !== seasonId) return s;
        const newEpisodes = s.episodes.map((ep, i) =>
          i === epIndex ? { ...ep, checked: !ep.checked } : ep
        );
        return { ...s, episodes: newEpisodes };
      })
    );
  }

  // altura estimada do botão (ajuste se ButtonGeral tiver outro tamanho)
  const BUTTON_HEIGHT = 56;
  const BUTTON_BOTTOM_MARGIN = 20;
  const scrollPaddingBottom = BUTTON_HEIGHT + BUTTON_BOTTOM_MARGIN + 16; // +16 para folga

  return (
    <View style={{ flex: 1,  }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: scrollPaddingBottom, gap: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status */}
        <View style={{ gap: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Status</Text>

          <TouchableOpacity
            onPress={() => setOpenStatus(!openStatus)}
            style={styles.button}
            accessibilityLabel="Abrir opções de status"
          >
            <Text style={styles.textoIcon}>⟳ {selected} {openStatus ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {openStatus && (
            <TouchableOpacity
              onPress={() => {
                setSelected("episodio: 10");
                setOpenStatus(false);
              }}
              style={styles.caixa}
            >
              <Text>episodio: 10</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Divider e título */}
        <View style={{ gap: 10, marginTop: 8 }}>
          <Text style={{ color: "white" }}>Episodios Assistidos</Text>
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: themas.colors.Secondary,
              marginBottom: 8,
            }}
          />
        </View>

        {/* Temporadas */}
        {seasons.map(season => (
          <View key={season.id} style={{ marginBottom: 6 }}>
            {/* linha da temporada: checkbox + título + seta */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* checkbox separado */}
              <TouchableOpacity
                onPress={() => toggleSeasonChecked(season.id)}
                style={styles.inputcaixa}
                accessibilityLabel={`Marcar todos episódios da ${season.title}`}
              >
                {season.checked && <Text style={{ color: "white", fontWeight: "bold" }}>✓</Text>}
              </TouchableOpacity>

              {/* título - área que abre/fecha */}
              <TouchableOpacity
                onPress={() => toggleSeasonOpen(season.id)}
                style={[styles.check, { flex: 1, marginLeft: 8, paddingVertical: 12 }]}
                accessibilityLabel={`${season.open ? "Fechar" : "Abrir"} ${season.title}`}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>{season.title}</Text>
              </TouchableOpacity>

              <Text style={{ color: "white", marginLeft: 8 }}>{season.open ? "▲" : "▼"}</Text>
            </View>

            {/* Lista de episódios (aparece se open) */}
            {season.open && (
              <View style={{ paddingLeft: 34, paddingTop: 8, gap: 8 }}>
                {season.episodes.map((ep, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 6,
                      paddingHorizontal: 4,
                      borderRadius: 6,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => toggleEpisodeChecked(season.id, idx)}
                      style={styles.inputcaixa}
                      accessibilityLabel={`Marcar ${ep.title}`}
                    >
                      {ep.checked && <Text style={{ color: "white", fontWeight: "bold" }}>✓</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setSelected(ep.title)}
                      style={{ marginLeft: 8, flex: 1 }}
                      accessibilityLabel={`Selecionar ${ep.title}`}
                    >
                      <Text style={{ color: "white" }}>{ep.title}</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity onPress={() => addEpisode(season.id)} style={{ paddingVertical: 6 }}>
                  <Text style={{ color: themas.colors.Secondary }}>+ Adicionar Episodio</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {/* botão que adiciona temporada (fica rolando com o conteúdo) */}
        <TouchableOpacity style={{ marginTop: 12 }} onPress={addSeason}>
          <Text style={{ color: themas.colors.Secondary }}>+ Adicionar Temporada</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ButtonGeral fixo no fim da tela */}
      <View
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: BUTTON_BOTTOM_MARGIN,
          height: BUTTON_HEIGHT,
        }}
      >
        {/* Se ButtonGeral aceita estilo via props, prefira usar; aqui eu apenas renderizo */}
        <ButtonGeral title="Enviar" path="/menu" />
      </View>
    </View>
  );
}
