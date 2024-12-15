import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
  ActivityIndicator,
} from "react-native";

import { s } from "@/components/button/styles";
import { colors } from "@/styles/theme";

import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

//criando uma tipagem personalizada
type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
};

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[s.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text style={s.title}>{children}</Text>;
}

type IconProps = {
  icon: React.ComponentType<TablerIconProps>;
};

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]}></Icon>;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
