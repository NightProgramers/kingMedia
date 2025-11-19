import { Text, View, StyleSheet } from "react-native";
import { themas } from "@/global/themas";
import { ImagemInput } from "@/components/ImagemInput";
import { InputField } from "@/components/Input";
import { DropdownSelect } from "@/components/DropdownSelect";
import React, { useState } from "react";

export default function FilmeStep3() {
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [url, setURL] = useState("");

    const [status, setStatus] = useState("Assistindo");
    const opcoesStatus = ["Assistindo", "Pausado", "Completo", "Planejo Ver"];

    // Estado para o Episódio
    const [episodio, setEpisodio] = useState("Episódio 1");
    // Dica: Você pode gerar essa lista com código se forem muitos episódios
    const opcoesEpisodios = ["Episódio 1", "Episódio 2", "Episódio 3", "Episódio 4"];

    return (
        <View style={styles.container}>
            <ImagemInput />

            <InputField
                label="Título"
                value={title}
                onChangeText={setTitle}
                placeholder="Digite o nome do filme..."
            />

            <InputField
                label="Sinopse"
                value={synopsis}
                onChangeText={setSynopsis}
                placeholder="Escreva um breve resumo ou suas notas pessoais..."
                multiline
            />

            <InputField
                label="URL"
                value={url}
                onChangeText={setURL}
                placeholder="Digite o link de origem..."
            />

            <DropdownSelect
                label="Status da Série"
                options={opcoesStatus}
                selectedValue={status}
                onSelect={(item) => setStatus(item)}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: themas.colors.grayStrong,
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        gap: 24,
        paddingTop: 38,
        paddingBottom: 70,
        paddingHorizontal: 24,
    },

    line: {
        flex: 1,
        height: 2,
        backgroundColor: themas.colors.Secondary,
        marginHorizontal: 10,
        marginVertical: 15
    },

    lineBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    }
});