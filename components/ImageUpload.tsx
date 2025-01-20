"use client";

import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status code: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error("Authentication Request failed: ", error);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{
    url: string | undefined;
    filePath: string;
  } | null>(null);

  const onError = () => {
    toast({
      title: "Image Upload Failed",
      description: "Your image could not be uploaded. Please try again.",
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} upload successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      authenticator={authenticator}
      urlEndpoint={urlEndpoint}
    >
      <IKUpload
        onError={onError}
        onSuccess={onSuccess}
        className="hidden"
        ref={ikUploadRef}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
        className="upload-btn"
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage alt={file.filePath} src={file.url} width={500} height={300} />
      )}
    </ImageKitProvider>
  );
};
export default ImageUpload;
