import "./App.css";
import { useEffect, useState } from "react";
import { Image, Button } from "antd";
import React from "react";
import { Card } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import useImageUploader from "./useImageUploader";

function CoverImage({ coverImage }: { coverImage?: string }) {
  const [preview, setPreview] = useState<string | undefined>(coverImage);
  const { ImageUploader, fileProps } = useImageUploader();

  useEffect(() => {
    if (!fileProps) return;
    const logoUrl = URL.createObjectURL(fileProps);
    setPreview(logoUrl);
  }, [fileProps]);

  const handleDelete = (e: any) => {
    setPreview("");
  };

  return (
    <>
      <Card
        title="Upload cover image"
        style={{ minWidth: 450, boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)" }}
        headStyle={{ background: "#D0F7FA", textAlign: "start" }}
      >
        <>
          {preview ? (
            <>
              <Image height={200} width={"100%"} src={preview} alt="cover photo" />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="underline table-drop-wrap max-w-[65%]">
                  <span className="ml-1 mt-1 truncate">{fileProps?.name}</span>
                </span>
                <Button
                  type="text"
                  danger
                  onClick={handleDelete}
                  icon={<DeleteFilled />}
                >
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <ImageUploader label="" accept="image/*" />
          )}
        </>
      </Card>
    </>
  );
}

export default CoverImage;
