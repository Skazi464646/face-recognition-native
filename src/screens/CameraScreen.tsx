import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Camera,
    useCameraDevice,
    useCameraFormat,
} from 'react-native-vision-camera';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
const CameraScreen = () => {
    const camera = useRef<Camera | null>(null);
    const [switchCameraValue, setSwitchCameraValue] = useState<any>('front');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [flash, setFlash] = useState<'on' | 'off'>('off');
    const [showBorder, setShowBorder] = useState(false);
    const [saveError, setSaveError] = useState<any>(null);
    const device = useCameraDevice(switchCameraValue);
    const format = useCameraFormat(device, [{ photoHdr: true }, { videoHdr: true }]);
    const supportsFlash = device?.hasFlash ?? false;


    useEffect(() => {
        async function getPermission() {
            // Camera permission
            const cameraPermission = await Camera.requestCameraPermission();
            console.log(`Camera permission status: ${cameraPermission}`);
            if (cameraPermission === 'denied') await Linking.openSettings();

            // Request photo library permission for iOS
            if (Platform.OS === 'ios') {
                const photoLibraryPermission =
                    await Camera.requestCameraPermission();
                console.log(
                    `Photo library permission status: ${photoLibraryPermission}`,
                );
                if (photoLibraryPermission === 'denied') await Linking.openSettings();
            } else {
                // For Android, request storage permission
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission',
                            message: 'App needs access to your storage to save photos',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Storage permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        }
        getPermission();
    }, []);

    if (device == null) return (
        <View style={styles.loadingContainer}>
            <Text style={{ color: 'white', marginTop: 40 }}>
                Camera not available
            </Text>
        </View>
    );

    const handleUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post("http://localhost:8000/face-detection", formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            const imageBlob = new Blob([response.data], { type: 'image/png',lastModified: Date.now() });
            const imageObjectURL = URL.createObjectURL(imageBlob);
        } catch (error) {
            console.error('Error uplaoding file', error);
        } finally {
            setLoading(false);
        }
    }

    const capturePhoto = async () => {
        if (camera.current !== null) {
            try {
                const photo = await camera.current?.takePhoto({
                    flash: switchCameraValue === 'back' ? flash : 'off',
                });

                // For iOS, we need to ensure the file URL is in the correct format
                const photoPath =
                    Platform.OS === 'ios'
                        ? photo.path.replace('file://', '')
                        : photo.path;

                try {
                    const file = await camera.current.takePhoto()
                    const result = await fetch(`file://${file.path}`)
                    const data = await result.blob();
                    //TODO:- Save the photo to the python backend for face recognition

                    //
                    // await CameraRoll.save(`file://${photoPath}`, {
                    //     type: 'photo',
                    //     album: 'MyAppPhotos',
                    // });

                    console.log('Photo saved successfully!');
                    setShowBorder(true);
                    setTimeout(() => setShowBorder(false), 1000);
                } catch (saveError) {
                    console.log('Failed to save photo:', saveError);
                    setSaveError('Failed to save photo. Please check permissions.');
                    setTimeout(() => setSaveError(null), 3000);
                }
            } catch (error) {
                console.error('Failed to take photo:', error);
                setSaveError('Failed to capture photo. Please try again.');
                setTimeout(() => setSaveError(null), 3000);
            }
        }
    };



    return (
        <SafeAreaProvider>
            <View style={[styles.main, { borderWidth: showBorder ? 5 : 0 }]}>
                <Camera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    photo={true}
                    format={format}
                />
                <TouchableOpacity
                    style={styles.touchButton}
                    onPress={capturePhoto}>
                    <View style={styles.iconHolder}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Capture</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        borderColor: 'green',
    },
    loadingContainer: {
        flex: 1,
        textAlign: 'center',
        alignContent: 'center'
        , alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    touchButton: {
        backgroundColor: 'red',
        width: 80,
        height: 80,
        borderRadius: 40,
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconHolder: {
        borderRadius: 15,
        overflow: 'hidden',
        borderColor: 'blue',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        right: 10,
    },
    errorContainer: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'white',
        fontSize: 16,
    },
    icon: {
        borderWidth: 2,
        width: 80,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    recordingButtonDesign: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        position: 'absolute',
        bottom: 50,
    },
    recordButton: {
        width: 80,
        backgroundColor: 'red',
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerView: {
        borderWidth: 2,
        width: 100,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        borderColor: 'green',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    timerText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
});