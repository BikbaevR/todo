import { styles } from './Style'
import {TouchableOpacity, View, Text} from "react-native";

export const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('CreateTask')}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}