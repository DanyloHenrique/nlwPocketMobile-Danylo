import { s } from "@/components/place/styles";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  Image,
} from "react-native";

import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/theme";


export type PlaceProps = {
  address: string;
  coupons: number;
  cover: string;
  description: string;
  id: string;
  name: string;
};

type Props = TouchableOpacityProps & {
  data: PlaceProps;
};

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={s.container}
      {...rest}
    >
      <Image source={{ uri: data.cover }} style={s.image} />

      <View style={s.content}>
        <View>
          <Text style={s.name}>{data.name}</Text>
          <Text style={s.description} numberOfLines={2}>
            {data.description}
          </Text>
        </View>
        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={s.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
