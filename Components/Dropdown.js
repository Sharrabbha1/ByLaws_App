import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';

export default function Dropdown({ selectedValue, onValueChange, items, label }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={styles.picker}
            >
                {items.map((item, index) => (
                    <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        color: '#EFF1EF',
        fontSize: 14,
        marginBottom: 5,
    },
    picker: {
        backgroundColor: '#3C4A3D',
        color: '#EFF1EF',
        borderRadius: 8,
        padding: 10,
    },
});
