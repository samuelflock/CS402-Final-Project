import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: backgroundColor,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "black",
    }}
  >
    <Text style={{ color: textColor }}>{item.key}</Text>
  </TouchableOpacity>
);

export { Item };
