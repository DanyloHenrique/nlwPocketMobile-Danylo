import { StyleSheet } from "react-native";

import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    maxHeight: 56,
    backgroundColor: colors.green.base,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    flexDirection: "row",
    gap: 14,
  },
  title: {
    color: colors.gray[100],
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
  },
});
