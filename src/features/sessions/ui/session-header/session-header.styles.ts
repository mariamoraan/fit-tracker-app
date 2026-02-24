import { Colors } from "@/src/core/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    sessionHeader: {
        flexDirection: 'row'
    },
    sessionHeaderInfo: {
        flex: 1,
        gap: 4,
    },
    sessionHeaderDate: {
        color: Colors.color_zinc_100
    },
    sessionHeaderTitle: {
        color: Colors.color_zinc_100
    },
    completeButton: {
        padding: 2,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: Colors.color_zinc_100,
        borderStyle: 'dashed',
        alignSelf: 'flex-start',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease-in-ease-out'
    },
    completeButtonCompleted: {
        borderStyle: 'solid',
        borderColor: Colors.color_semantic_green,
        backgroundColor: Colors.color_semantic_green,
    },
})