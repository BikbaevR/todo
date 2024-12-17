import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: 20
    },
    text: {
        fontSize: 18,
    },
        floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007BFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Тень на Android
        shadowColor: '#000', // Тень на iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    floatingButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});