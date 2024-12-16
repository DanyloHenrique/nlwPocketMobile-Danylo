import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    lineHeight: 22.4,
    flex: 1,
  },
});
