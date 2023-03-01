import { Text, View } from "react-native";

export default function AboutScreen({ route, navigation }) {

    const { item, numberEmployee } = route.params
    return (
        <View>
            <Text>{item.name}</Text>
        </View>
    )
}