import { themas } from '@/global/themas';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Se você tiver um arquivo de tema, importe ele aqui.
// import { themas } from '../caminho/do/seu/tema';

export function DropdownSelect({ label, options, selectedValue, onSelect }) {
    const [open, setOpen] = useState(false);

    const handleSelect = (item) => {
        onSelect(item); // Avisa o pai qual item foi escolhido
        setOpen(false); // Fecha o menu
    };

    return (
        <View style={styles.container}>
            {/* Label do Dropdown (ex: "Status" ou "Temporada") */}
            <Text style={styles.label}>{label}</Text>

            {/* Botão Principal */}
            <TouchableOpacity onPress={() => setOpen(!open)} style={styles.button}>
                <Text style={styles.textoIcon}>
                    {/* Mostra o valor selecionado ou um texto padrão */}
                    ⟳ {selectedValue || "Selecione"} {open ? "▲" : "▼"}
                </Text>
            </TouchableOpacity>

            {/* Lista de Opções (Só aparece se open for true) */}
            {open && (
                <View style={styles.dropdownContainer}>
                    <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 150 }}>
                        {options.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelect(item)}
                                style={styles.optionItem}
                            >
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    label: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        width: "100%",
    },
    button: {
        backgroundColor: themas.colors.Secondary,
        padding: 12,
        borderRadius: 10,
    },
    textoIcon: {
        textAlign: "center",
        fontWeight: "600"
    },
    dropdownContainer: {
        backgroundColor: '#222',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        overflow: 'hidden', // Garante que o conteúdo não saia das bordas arredondadas
        width: "100%",
    },
    optionItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        width: "100%",
    },
    optionText: {
        color: '#ccc',
        textAlign: 'center',
        width: "100%",
    }
});