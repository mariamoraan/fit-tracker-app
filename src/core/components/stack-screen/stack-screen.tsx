import { Stack } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../theme/colors";

interface Props {
    title: string;
}

export const StackScreen: React.FC<React.PropsWithChildren<Props>> = ({ title, children }) => {
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
            <KeyboardAwareScrollView
                style={{ backgroundColor: Colors.color_zinc_900 }}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 48,
                    paddingTop: 24,
                    flexGrow: 1,
                }}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                extraScrollHeight={24}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </KeyboardAwareScrollView>
        </>
    );
};