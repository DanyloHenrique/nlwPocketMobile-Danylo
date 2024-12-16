import { Text, View } from "react-native";

import { s } from "@/components/market/details/style";

import Info from "@/components/market/info";
import {
  IconMapPin,
  IconPhone,
  IconPhoneCall,
  IconTicket,
} from "@tabler/icons-react-native";

export type PropsDetails = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    description: string;
    id: string;
  }[];
};

type Props = {
  data: PropsDetails;
};

export default function Details({ data }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>
      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>
        {data.rules.map((item) => (
          <Text key={item.id} style={s.rule}>
            {`\u2022 ${item.description}`}
          </Text>
        ))}
      </View>
      <View style={s.group}>
        <Text style={s.title}>Informações</Text>
        <Info
          description={`${data.coupons} cupons disponíveis`}
          icon={IconTicket}
        />
        <Info description={data.address} icon={IconMapPin} />
        <Info description={data.phone} icon={IconPhone} />
      </View>
    </View>
  );
}
