import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { addItemToList } from '../storage/storage';

export default function CameraScreen({ navigation, onAddLink }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    if (!permission) {
        return <View style={styles.container}><Text>Solicitando permissão da câmera...</Text></View>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginBottom: 10 }}>Precisamos da sua permissão para abrir a câmera</Text>
                <Button onPress={requestPermission} title="Conceder Permissão" />
            </View>
        );
    }

    const handlebarcodeScanned = async ({ data }) => {
        setScanned(true);

        try {
            const dadosDoQrCode = JSON.parse(data);

            const newLink = {
                id: dadosDoQrCode.id || String(Date.now()),
                title: dadosDoQrCode.title || "Item Escaneado",
                content: dadosDoQrCode.content || "Sem conteúdo"
            };

            await addItemToList('links', newLink);

            alert(`QR Code escaneado com sucesso!`);
            navigation.navigate('Home');

        } catch (error) {
            console.error("Erro ao processar dados do QR Code:", error);
            alert("O QR Code escaneado não contém um formato JSON válido.");
        }
    };

    return (
        <View style={styles.container}>
            <CameraView style={{ flex: 1, }}
                onbarcodeScanned={scanned ? undefined : handlebarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            >
            </CameraView>
            {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
