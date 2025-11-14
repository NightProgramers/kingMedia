import { themas } from "@/global/themas";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
}

export function InputField({ label, multiline, value, ...props }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasText = value && value.toString().length > 0;
  const borderColor = isFocused || hasText ? themas.colors.Secondary : themas.colors.grayDark ;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        value={value}
        multiline={multiline}
        placeholderTextColor="#888"
        textAlignVertical={multiline ? "top" : "center"} 
        enablesReturnKeyAutomatically
        style={[
            styles.input,
            multiline && styles.textarea,
            { borderColor }
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
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
  input: {
    backgroundColor: themas.colors.LowYellow,
    borderColor: themas.colors.Secondary,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
    color: themas.colors.White,
  },
  textarea: {
    height: 120, 
    paddingTop: 10,
  },
});
