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

    for (const key in values) {
      formDataToSend.append(key, values[key]);
    }

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formDataToSend.append("image", fileList[0].originFileObj);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000//student/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }

    form.resetFields();
    setFileList([]);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    cnic: "",
    country: "",

    course: "",
    city: "",
    phone: "",
    email: "",
    gender: "",
    address: "",

    qualification: "",
    laptop: "",
    computuerProficiency: "",
    image: null,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImage = ({ fileList }) => {
    if (fileList.length > 0 && fileList[0].originFileObj) {
      setFormData((prev) => ({
        ...prev,
        image: fileList[0].originFileObj,
      }));
    }
  };
  const handleSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      dob: dateString,
    }));
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
            <Select
              onChange={(value) => handleSelect("country", value)}
              placeholder="Select country"
            >
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
            <Select
              onChange={(value) => handleSelect("city", value)}
              placeholder="Select city"
            >
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
            <Select
              onChange={(value) => handleSelect("course", value)}
              placeholder="Select course or event"
            >
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
            <Select
              onChange={(value) => handleSelect("computerProficiency", value)}
              placeholder="Select your computer proficiency"
            >
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
            <Input onChange={handleInput} placeholder="Full name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Father name"
            name="fatherName"
            rules={[{ required: true }]}
            required={false}
          >
            <Input onChange={handleInput} placeholder="Father name" />
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
            <Input onChange={handleInput} placeholder="Email" />
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
            <Input onChange={handleInput} placeholder="Phone" />
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
            <Input onChange={handleInput} placeholder="CNIC" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Father's CNIC (optional)"
            name="fatherCnic"
            rules={[
              {
                required: true,
                pattern: /^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+/,
                message: "Enter a CNIC number in format XXXXX-XXXXXXX-X",
              },
            ]}
            required={false}
          >
            <Input
              onChange={handleInput}
              placeholder="Father's CNIC(optional)"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Date of birth"
            name="dob"
            required={false}
            rules={[{ required: CSSViewTransitionRule }]}
          >
            <DatePicker
              onChange={handleDateChange}
              placeholder="mm/dd/yyyy"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Select gender"
            name="gender"
            required={false}
            rules={[{ required: true }]}
          >
            <Select
              onChange={(value) => handleSelect("gender", value)}
              placeholder="Select gender"
            >
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
            <Input onChange={handleInput} placeholder="Address" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Last qualification"
            name="qualification"
            required={false}
            rules={[{ required: true }]}
          >
            <Select
              onChange={(value) => handleSelect("qualification", value)}
              placeholder="Last qualification"
            >
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
            <Select
              onChange={(value) => handleSelect("laptop", value)}
              placeholder="Do you have a Laptop?"
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            required={false}
            label="Picture"
            name="image"
            rules={[{ required: true }]}
          >
            <div style={{ display: "flex", gap: 16 }}>
              <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                preview={false}
                onPreview={handlePreview}
                onChange={(e) => {
                  handleChange(e);
                  handleImage(e);
                }}
                showUploadList={{ showRemoveIcon: true }}
                beforeUpload={() => false}
              >
                {fileList.length >= 8 ? null : uploadButton}
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
