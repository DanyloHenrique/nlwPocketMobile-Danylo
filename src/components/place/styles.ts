import { StyleSheet } from "react-native";

import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    maxWidth: 350,
    width: 350,
    padding: 8,
    paddingRight: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.gray[200],
    backgroundColor: colors.gray[100],
    margin: "auto",
  },
  image: {
    height: 104,
    width: 116,
    borderRadius: 8,
  },

  content: {
    maxWidth: 194,
    gap: 10,
    justifyContent: "center",
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.gray[600],
    marginBottom: 4,
  },

  description: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
  },

  footer: {
    flexDirection: "row",
    gap: 6,
  },

  tickets: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[400],
  },
});
