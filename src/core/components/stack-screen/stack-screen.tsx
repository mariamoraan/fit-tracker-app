import { Stack } from "expo-router";
import { View } from "react-native";
import { Colors } from "../../theme/colors";

interface Props {
    title: string;
}

export const StackScreen: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const {title, children} = props;
    return (
        <>
        <Stack.Screen  
        options={{ 
            title, 
            headerStyle: {
                backgroundColor: Colors.color_zinc_900, 
            },
            headerTintColor: Colors.color_zinc_100,
            headerShadowVisible: false,
        }} 
        />
        <View style={{ 
            paddingHorizontal: 16,
                paddingBottom: 24,
                paddingTop: 24,
                flexGrow: 1,
                backgroundColor: Colors.color_zinc_900 
        }}>
            {children}
        </View>
        </>
    )
}