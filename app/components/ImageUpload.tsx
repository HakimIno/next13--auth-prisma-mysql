"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
import { ImagePlus, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}


const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        console.log(result)
        onChange(result.info.secure_url);
    }

    if (!isMounted) {
        return null;
    }


    return (
        <>
            <div className="flex items-center gap-4  justify-center">
                {value.map((url) => (
                    <div key={url} className=" relative w-[140px] h-[180px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-1 right-1">
                            <Trash2 className="h-5 w-5 cursor-pointer text-white" onClick={() => onRemove(url)} />
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="uwigbevs">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="outlined"
                            onClick={onClick}
                            className="flex items-center justify-center"
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            อัพโหลดรูป
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </>
    )
}

export default ImageUpload;