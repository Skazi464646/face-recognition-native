import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, useCameraDevice, PhotoFile, CameraPermissionStatus, CameraPermissionRequestResult, TakePhotoOptions } from 'react-native-vision-camera';

type UseCameraReturn = {
    camera: React.RefObject<Camera>;
    device: ReturnType<typeof useCameraDevice> | null;
    hasPermission: boolean;
    isCapturing: boolean;
    showPreview: boolean;
    capturedPhoto: string | null;
    captureScale: number;
    capturePhoto: () => Promise<void>;
    retakePhoto: () => void;
};

const useCamera = (): UseCameraReturn => {
    const camera = useRef<Camera>(null as unknown as Camera);
    const device = useCameraDevice('front');

    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [isCapturing, setIsCapturing] = useState<boolean>(false);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [captureScale] = useState<number>(1);

    useEffect(() => {
        const requestPermissions = async () => {
            const cameraStatus: CameraPermissionStatus = await Camera.getCameraPermissionStatus();
            if (cameraStatus === 'not-determined' || cameraStatus === 'denied' || cameraStatus === 'restricted') {
                const result: CameraPermissionRequestResult = await Camera.requestCameraPermission();
                setHasPermission(result === 'granted');
            } else {
                setHasPermission(cameraStatus === 'granted');
            }
        };
        requestPermissions();
    }, []);

    const capturePhoto = async () => {
        if (!camera.current) return;
        try {
            setIsCapturing(true);
            const options: TakePhotoOptions = {};
            const photo: PhotoFile = await camera.current.takePhoto(options);
            // On iOS path already includes file://, on Android it may not. We handle in screen memo.
            setCapturedPhoto(photo.path);
            setShowPreview(true);
        } catch (e) {
            // no-op for minimal implementation
        } finally {
            setIsCapturing(false);
        }
    };

    const retakePhoto = () => {
        setShowPreview(false);
        setCapturedPhoto(null);
    };

    return {
        camera,
        device,
        hasPermission,
        isCapturing,
        showPreview,
        capturedPhoto,
        captureScale,
        capturePhoto,
        retakePhoto,
    };
};

export default useCamera;


