import { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import axios from "axios";
import DataTable from "./table";

const DownloadForm = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [cnic, setCnic] = useState("");
  const [matchedUsers, setMatchedUsers] = useState([]);
  const getUrl = import.meta.env.VITE_GET_API;
  // Fetch data from API
  useEffect(() => {
    axios
      .get(getUrl)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const onFinish = (values) => {
    const enteredCnic = values.cnic;
    const matched = data.users.filter((user) => user.cnic === enteredCnic);

    if (matched.length === 0) {
      message.warning("No record found for the entered CNIC.");
    }

    setMatchedUsers(matched);
  };
  return (
    <>
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
              required={false}
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
          {matchedUsers.length > 0 && <DataTable users={matchedUsers} />}
        </Col>
      </Row>
    </>
  );
};

export default DownloadForm;
