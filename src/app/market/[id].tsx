import { useEffect, useState, useRef } from "react";
import { Alert, Text, View, Modal, StatusBar, ScrollView } from "react-native";
import { useLocalSearchParams, router, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import Details, { PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";

import { api } from "@/services/api";
import { Button } from "@/components/button";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponIsFetching, setCouponIsFetching] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();
  console.log("🚀 ~ Market ~ params:", params.id);

  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      console.log("🚀 ~ fetchMarket ~ data:", data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados");
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Câmera", "Você precisa habilitar o uso da Câmera");
      }
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log("🚀 ~ handleOpenCamera ~ error:", error);
      Alert.alert("Câmera", "Não foi possível utilizar a Câmera");
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);
    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ],
    );
  }

  async function getCoupon(id: string) {
    console.log("🚀 ~ getCoupon ~ id:", id);
    try {
      setCouponIsFetching(true);

      const { data } = await api.patch("/coupons/" + id);

      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.log("🚀 ~ getCoupon ~ error:", error);
      Alert.alert("Erro", "Não foi possível utilizar o cupom");
    } finally {
      setCouponIsFetching(false);
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Cover uri={data.cover} />
          <Details data={data} />
          {coupon && <Coupon code={coupon} />}
        </ScrollView>

        <View style={{ padding: 32 }}>
          <Button onPress={() => handleOpenCamera()}>
            <Button.Title>Ler QR Code</Button.Title>
          </Button>
        </View>

        <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            onBarcodeScanned={({ data }) => {
              if (data && !qrLock.current) {
                qrLock.current = true;
                setTimeout(() => handleUseCoupon(data), 500);
              }
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              right: 32,
            }}
          >
            <Button
              isLoading={couponIsFetching}
              onPress={() => setIsVisibleCameraModal(false)}
            >
              <Button.Title>Voltar</Button.Title>
            </Button>
          </View>
        </Modal>
    </View>
  );
}
