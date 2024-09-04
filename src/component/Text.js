import { Text } from "react-native"
import { Colors } from "../utilities/colors"

export const CustomText = ({ 
    color, 
    text, 
    align, 
    size, 
    fontWeight, 
    fontFamily, 
    width
}) => {
    return (
        <Text
            style={{
                fontSize: size || 16, 
                fontFamily: fontFamily || "Grotesk-Regular", 
                fontWeight: fontWeight || '600',  
                color: color || Colors.Blue, 
                textAlign: align || 'auto',
                width: width
            }}
        >
            {text}
        </Text>
    )
}
