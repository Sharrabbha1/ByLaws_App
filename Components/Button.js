import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function Button({ label, onPress }) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#5A6E5B',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        color: '#EFF1EF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
