import {Dimensions, StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',

        // width: '100%',
        // height: '100%',

        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        marginTop: 20
    },
    text: {
        fontSize: 18,
    },
    // floatingButton: {
    //     position: 'absolute',
    //     bottom: 0,
    //     right: 20,
    //     backgroundColor: '#007BFF',
    //     width: 60,
    //     height: 60,
    //     borderRadius: 30,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     elevation: 5, // Тень на Android
    //     shadowColor: '#000', // Тень на iOS
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 3,
    // },
    floatingButton: {
        position: 'absolute',
        bottom: 20, // Отступ от нижнего края
        right: 20,  // Отступ от правого края
        backgroundColor: '#007BFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    floatingButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    mainText: {
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 20,
    },
    buttonPosition: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});