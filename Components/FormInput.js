import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function FormInput({ placeholder, value, onChangeText }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#A5ABA5"
            value={value}
            onChangeText={onChangeText}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#3C4A3D',
        color: '#EFF1EF',
        borderWidth: 1,
        borderColor: '#5A6E5B',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },
});
