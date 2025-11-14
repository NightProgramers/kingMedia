import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { themas } from "@/global/themas";

interface SelectInputProps {
  label: string;
  items: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  value: string | null;
}

export function SelectInput({ label, items, onValueChange, value }: SelectInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor =
    isFocused || value
      ? themas.colors.Secondary
      : themas.colors.grayDark;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.pickerContainer, { borderColor }]}>
        <RNPickerSelect
          onValueChange={onValueChange}
          value={value}
          placeholder={{ label: "Selecione", value: null }}
          items={items}
          useNativeAndroidPickerStyle={false}
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
            placeholder: { color: "#aaa" },
            iconContainer: { top: 15, right: 10 },
          }}
          Icon={() => (
            <Text style={{ color: "#ccc", fontSize: 18 }}>▼</Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: themas.colors.LowYellow,
    borderColor: themas.colors.grayDark,
  },
  input: {
    fontSize: 15,
    color: themas.colors.White,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
