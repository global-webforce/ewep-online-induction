"use client";

import React, { useCallback, useState } from "react";
import { Loader2, Upload } from "lucide-react";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  size?: number;
  enforceSquare?: boolean;
  placeholder?: string;
}

export function ImageUpload({
  onChange,
  size = 300,
  enforceSquare = true,
  placeholder,
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange]
  );

  const handleFile = useCallback(
    (file: File) => {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (enforceSquare && img.width !== img.height) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const minDimension = Math.min(img.width, img.height);
            canvas.width = minDimension;
            canvas.height = minDimension;
            ctx?.drawImage(
              img,
              (img.width - minDimension) / 2,
              (img.height - minDimension) / 2,
              minDimension,
              minDimension,
              0,
              0,
              minDimension,
              minDimension
            );
            canvas.toBlob((blob) => {
              if (blob) {
                const croppedFile = new File([blob], file.name, {
                  type: file.type,
                });
                setImage(URL.createObjectURL(croppedFile));
                setIsLoading(false);
                onChange(croppedFile);
              }
            }, file.type);
          } else {
            setImage(URL.createObjectURL(file));
            setIsLoading(false);
            onChange(file);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    },
    [onChange, enforceSquare]
  );

  return (
    <>
      <input
        type="file"
        className="sr-only"
        onChange={handleChange}
        accept="image/*"
        id="image-upload-input"
      />
      <label
        htmlFor="image-upload-input"
        className="relative flex items-center justify-center border-2 border-solid border-gray-300 rounded-lg cursor-pointer overflow-hidden"
        style={{ width: size, height: size }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {isLoading ? (
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : placeholder ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={placeholder}
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center p-4">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              {enforceSquare ? "Upload a square image" : "Upload an image"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Drag and drop or click to select
            </p>
          </div>
        )}
      </label>
    </>
  );
}
