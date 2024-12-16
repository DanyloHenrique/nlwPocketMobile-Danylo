import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    paddingBottom: 16,
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.green.soft,
    borderRadius: 8,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  code: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.gray[600],
    textTransform: "uppercase",
  },
});
