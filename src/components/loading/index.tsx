import { ActivityIndicator } from "react-native";

ActivityIndicator;

import { s } from "./styles";
import { colors } from "@/styles/theme";

export function Loading() {
  return <ActivityIndicator color={colors.green.base} style={s.container} />;
}
