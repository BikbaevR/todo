import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // Убедитесь, что вы установили библиотеку react-native-paper

const taskProgress = (createdAt, updatedAt) => {
    const now = Date.now();
    const totalDuration = updatedAt - createdAt;
    const elapsedTime = now - createdAt;
    return Math.min(elapsedTime / totalDuration, 1);
};

export const TaskProgress = ({ task }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(taskProgress(task._created_at, task._updated_at));
        }, 500);

        return () => clearInterval(interval);
    }, [task]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task._title}</Text>
            <ProgressBar progress={progress} color={task._color} style={styles.progressBar} />
            <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
    },
    progressText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});

