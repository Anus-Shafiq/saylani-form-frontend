var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Row,
  Col,
  Image,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const { Option } = Select;

const postUrl = import.meta.env.VITE_POST_API;

const RegistrationForm = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = (file) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (!file.url && !file.preview) {
        file.preview = yield getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    });
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formDataToSend = new FormData();

    // Format DOB
    if (values.dob) {
      values.dob = values.dob.format("YYYY-MM-DD");
    }

    formDataToSend.append("address", values.address);
    formDataToSend.append("city", values.city);
    formDataToSend.append("cnic", values.cnic);
    formDataToSend.append("computerProficiency", values.computerProficiency);
    formDataToSend.append("country", values.country);
    formDataToSend.append("course", values.course);
    formDataToSend.append("dob", values.dob);
    formDataToSend.append("email", values.email);
    formDataToSend.append("fatherCnic", values.fatherCnic);
    formDataToSend.append("fatherName", values.fatherName);
    formDataToSend.append("fullName", values.fullName);
    formDataToSend.append("gender", values.gender);
    formDataToSend.append("laptop", values.laptop);
    formDataToSend.append("phone", values.phone);
    formDataToSend.append("qualification", values.qualification);

    // Append the image file
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formDataToSend.append("image", fileList[0].originFileObj);
    }

    try {
      const response = await axios.post(postUrl, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }

    form.resetFields();
    setFileList([]);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: 1000, margin: "0 auto" }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Select country"
            name="country"
            rules={[{ required: true }]}
            required={false}
          >
            <Select placeholder="Select country">
              <Option value="pakistan">Pakistan</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Select city"
            name="city"
            rules={[{ required: true }]}
            required={false}
          >
            <Select placeholder="Select city">
              <Option value="karachi">Karachi</Option>
              <Option value="islamabad">Islamabad</Option>
              <Option value="lahore">Lahore</Option>
              <Option value="quetta">Quetta</Option>
              <Option value="peshawar">Peshawar</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Select course or event"
            name="course"
            rules={[{ required: true }]}
            required={false}
          >
            <Select placeholder="Select course or event">
              <Option value="graphic-design">Graphic Design</Option>
              <Option value="web-development">Web Development</Option>
              <Option value="video-animation">Video Animation</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Select your computer proficiency"
            name="computerProficiency"
            rules={[{ required: true }]}
            required={false}
          >
            <Select placeholder="Select your computer proficiency">
              <Option value="none">None</Option>
              <Option value="beginner">Beginner</Option>
              <Option value="intermediate">Intermediate</Option>
              <Option value="advance">Advance</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[{ required: true }]}
            required={false}
          >
            <Input placeholder="Full name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Father name"
            name="fatherName"
            rules={[{ required: true }]}
            required={false}
          >
            <Input placeholder="Father name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Enter a valid email address",
              },
            ]}
            required={false}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                pattern: /((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/,
                message: "Enter a valid phone number",
              },
            ]}
            required={false}
          >
            <Input placeholder="Phone" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="CNIC"
            name="cnic"
            rules={[
              {
                required: true,
                pattern: /^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+/,
                message: "Enter a CNIC number in format XXXXX-XXXXXXX-X",
              },
            ]}
            required={false}
          >
            <Input placeholder="CNIC" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Father's CNIC (optional)"
            name="fatherCnic"
            rules={[
              {
                pattern: /^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+/,
                message: "Enter a CNIC number in format XXXXX-XXXXXXX-X",
              },
            ]}
            required={false}
          >
            <Input placeholder="Father's CNIC" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Date of birth"
            name="dob"
            required={false}
            rules={[{ required: CSSViewTransitionRule }]}
          >
            <DatePicker placeholder="mm/dd/yyyy" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Select gender"
            name="gender"
            required={false}
            rules={[{ required: true }]}
          >
            <Select placeholder="Select gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            required={false}
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Last qualification"
            name="qualification"
            required={false}
            rules={[{ required: true }]}
          >
            <Select placeholder="Last qualification">
              <Option value="matric">Matric</Option>
              <Option value="intermediate">Intermediate</Option>
              <Option value="underGraduate">UnderGraduate</Option>
              <Option value="graduate">Graduate</Option>
              <Option value="master">Master</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Do you have a Laptop?"
            name="laptop"
            required={false}
            rules={[{ required: true }]}
          >
            <Select placeholder="Do you have a Laptop?">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            required={false}
            name="image"
            label="Picture"
            rules={[{ required: true }]}
          >
            <div style={{ display: "flex", gap: 16 }}>
              <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                preview={false}
                onPreview={handlePreview}
                onChange={handleChange}
                showUploadList={{ showRemoveIcon: true }}
                beforeUpload={() => false}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              <div style={{ fontSize: 18, color: "#333" }}>
                <div>With white or blue background</div>
                <div>File size must be less than 1MB</div>
                <div>File type: jpg, jpeg, png</div>
                <div>Upload your recent passport size picture</div>
                <div>
                  Your face should be clearly visible without any glasses
                </div>
              </div>
            </div>
          </Form.Item>
        </Col>

        <Col span={24} style={{ marginTop: 10 }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                border: "none",
                paddingTop: 20,
                paddingBottom: 20,
                outline: "none",
              }}
            >
              SUBMIT
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RegistrationForm;
