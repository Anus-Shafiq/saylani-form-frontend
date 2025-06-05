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

const DownloadForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);

    form.resetFields();
  };
  return (
    <Row justify="center" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={22} md={10}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            label="CNIC (Which you provided during form submission)"
            name="cnic"
            rules={[
              {
                required: true,
                pattern: /^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+$/,
                message: "Enter CNIC in format XXXXX-XXXXXXX-X",
              },
            ]}
          >
            <Input placeholder="CNIC (Which you provided during form submission)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default DownloadForm;
