import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw } from 'lucide-react';

interface CameraCaptureProps {
    onCapture: (imageSrc: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string | null>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImage(imageSrc);
            onCapture(imageSrc);
        }
    }, [webcamRef, onCapture]);

    const retake = () => {
        setImage(null);
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border-2 border-primary/20">
                {image ? (
                    <img src={image} alt="Captured" className="w-full h-full object-cover" />
                ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: "user",
                            width: 1280,
                            height: 720
                        }}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            <div className="flex gap-4">
                {image ? (
                    <Button onClick={retake} variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Retake Photo
                    </Button>
                ) : (
                    <Button onClick={capture} className="gap-2 bg-red-500 hover:bg-red-600 text-white">
                        <Camera className="w-4 h-4" />
                        Capture Photo
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CameraCapture;
