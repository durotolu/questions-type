import { Card, Form } from "antd";
import { useRef, useState } from "react";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";

type UploadProps = {
  label: string;
  accept?: string;
  showFileBelow?: boolean;
  required?: boolean;
};

const useImageUploader = () => {
  const [fileProps, setFileProps] = useState<Blob | undefined>();

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFileProps(file);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const ImageUploader = ({ label, accept, required }: UploadProps) => (
    <>
      <div className="responsive-form-wrap">
        <div onClick={() => inputRef?.current?.click()}>
          <label className="form-label">{label}</label>
          <Form.Item
            name="company_type"
            style={{ marginBottom: "18px" }}
            rules={[{ required: required, message: "Required" }]}
          >
            <>
              <Card style={{ textAlign: "center" }}>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ fontSize: "24px" }} />
                </p>
                <p className="ant-upload-text">Upload cover image</p>
                <p className="ant-upload-hint" style={{ color: "#979797" }}>
                  16:9 ratio is recommended. Max image size 1mb
                </p>
              </Card>
              <input
                onChange={handleChange}
                ref={inputRef}
                style={{ display: "none" }}
                type="file"
                accept={accept}
              />
            </>
          </Form.Item>
        </div>
      </div>
    </>
  );

  return {
    ImageUploader,
    fileProps,
  };
};

export default useImageUploader;
