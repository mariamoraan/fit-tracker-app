import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

interface Props {
    value: Date;
    onChange: (date?: Date) => void;
}

export const DatePicker: React.FC<Props> = (props) => {
    const {value, onChange} = props;
    if(Platform.OS !== "web") {
        return (
            <RNDateTimePicker
                value={value}
                mode="date"
                onChange={(_, selectedDate) => onChange(selectedDate)}
            />
        )
    }

    else {
        return (
            <input
                type="date"
                value={value.toISOString().substring(0, 10)}
                onChange={(e) => onChange(new Date(e.target.value))}
            />
        )
    }
}