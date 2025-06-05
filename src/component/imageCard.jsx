import { Card, Typography, Image, Col, Row, Button, Space, Layout } from "antd";

import bgImage from "../assets/header.AVIF";
import saylaniImage from "../assets/saylani.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import youtube from "../assets/youtube.png";
import { FaUserGraduate } from "react-icons/fa";

const { Title, Text } = Typography;

const ImageCard = () => {
  return (
    <Card
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 200,
        color: "#fff",

        marginLeft: "10%",
        marginRight: "10%",
        border: "none",
      }}
    >
      <Layout
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Layout
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "transparent",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 250, textAlign: "center" }}>
          <Image
            src={saylaniImage}
            preview={false}
            alt="Example"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <Row style={{ width: "100%", marginTop: 16 }} justify="center">
          <Col
            xs={{ span: 24 }}
            lg={{ span: 8 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 5,
                marginBottom: 15,
              }}
            >
              <Button
                shape="circle"
                href="https://www.facebook.com/saylani.smit"
                target="_blank"
                style={{
                  width: 35,
                  height: 35,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  background: "transparent",
                }}
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Button>

              <Button
                shape="circle"
                href="https://www.instagram.com/saylanimassittraining/"
                target="_blank"
                style={{
                  width: 35,
                  height: 35,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  background: "transparent",
                }}
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Button>

              <Button
                shape="circle"
                href="https://www.youtube.com/@SaylaniMassITTraining"
                target="_blank"
                style={{
                  width: 35,
                  height: 35,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  background: "transparent",
                }}
              >
                <img
                  src={youtube}
                  alt="YouTube"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Button>
            </Space>
          </Col>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 8 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title level={2}>Registration Form - SMIT</Title>
          </Col>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 8 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Button
              href="https://student.saylaniwelfare.com/login"
              target="_blank"
              color="primary"
              size="small"
              shape="round"
              variant="outlined"
              style={{ height: 30 }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span>
                  <FaUserGraduate
                    style={{
                      fontSize: 14,
                      verticalAlign: "middle",
                      marginBottom: 4,
                    }}
                  />
                </span>
                <span>Student Portal</span>
              </span>
            </Button>
          </Col>
        </Row>

        <Text style={{ color: "#6c757d", fontSize: "16px" }}>
          Service - Education - Registration
        </Text>
      </Layout>
    </Card>
  );
};

export default ImageCard;
