// import React from "react";
// import { Card, Row, Col, Typography, Image } from "antd";
// import { QRCodeCanvas } from "qrcode.react";
// import smit from "../assets/smit.png";
// import facebook from "../assets/facebook.png";

// const { Title, Text } = Typography;

// const IDCard = () => {
//   return (
//     <Row gutter={16} justify="center" style={{ padding: 24 }}>
//       {/* Front Side */}
//       <Col xs={24} md={11}>
//         <Card
//           style={{
//             height: 400,
//             borderRadius: 10,
//             textAlign: "center",
//             background: "#fff",
//             boxShadow: "0 0 4px rgba(0,0,0,0.2)",
//             padding: 10,
//           }}
//         >
//           <Image width={100} src={smit} preview={false} />
//           <Text
//             strong
//             style={{ display: "block", marginTop: 8, marginBottom: 16 }}
//           >
//             SAYLANI MASS IT TRAINING PROGRAM
//           </Text>
//           <Image
//             width={100}
//             src={facebook}
//             preview={false}
//             style={{ borderRadius: 4, border: "3px solid #8bc34a" }}
//           />
//           <Title level={5} style={{ marginTop: 12, marginBottom: 12 }}>
//             ANUS SHAFIQ
//           </Title>
//           <Text>Web and Mobile App Development</Text>
//           <br />
//           <Text style={{ display: "block", marginTop: 12 }} strong>
//             WMA-253881
//           </Text>
//         </Card>
//       </Col>

//       {/* Back Side */}
//       <Col xs={24} md={11}>
//         <Card
//           style={{
//             height: 400,
//             borderRadius: 10,
//             background: "#fff",
//             boxShadow: "0 0 4px rgba(0,0,0,0.2)",
//             padding: 16,
//           }}
//         >
//           <Text>
//             <strong>Name:</strong> ANUS SHAFIQ
//           </Text>
//           <br />
//           <Text>
//             <strong>Father name:</strong> SHAFIQ AHMED
//           </Text>
//           <br />
//           <Text>
//             <strong>CNIC:</strong> 421013782273
//           </Text>
//           <br />
//           <Text>
//             <strong>Course:</strong> WMA BATCH (12)
//           </Text>

//           <div style={{ margin: "20px 0", textAlign: "center" }}>
//             <QRCodeCanvas value="WMA-253881" size={80} />
//           </div>

//           <Text type="danger" style={{ fontSize: 10 }}>
//             <strong>Note:</strong> This card is for SMIT premises only. <br />
//             If found please return to SMIT
//           </Text>

//           <div
//             style={{
//               borderTop: "2px solid #000",
//               marginTop: 50,
//               paddingTop: 8,
//             }}
//           >
//             <Text strong>Issuing authority</Text>
//           </div>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default IDCard;

import React, { useEffect, useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import ErrorBoundary from "../boundary/boundaryError";
import QRCode from "qrcode";
import { Button } from "antd";
import smitLogo from "../assets/smit.png";

const styles = StyleSheet.create({
  page: { padding: 20, flexDirection: "row", flexWrap: "wrap" },
  card: {
    width: "45%",
    margin: "2.5%",
    border: "1pt solid green",
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  cardBack: {
    width: "45%",
    margin: "2.5%",
    border: "1pt solid green",
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,
    alignItems: "flex-start",
  },
  image: { width: 100, marginBottom: 10 },
  title: {
    fontSize: 12,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: { fontSize: 10, marginVertical: 4 },
  id: { fontSize: 10, marginVertical: 4 },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});

const IDCardPDF = ({ user, qrCodeUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Front Side */}
      <View style={styles.card}>
        <Image style={styles.image} src={smitLogo} />
        <Text style={styles.title}>
          SAYLANI MASS IT {"\n"} TRAINING PROGRAM
        </Text>
        <Image
          style={[styles.image, { border: "1pt solid green" }]}
          src={user.image}
        />
        <Text style={styles.title}>{user.fullName}</Text>
        <Text style={styles.title}>{user.course}</Text>
        <Text style={styles.id}>{user.id}</Text>
      </View>

      {/* Back Side */}
      <View style={styles.cardBack}>
        <Text style={styles.text}>Name: {user.fullName}</Text>
        <Text style={styles.text}>Father Name: {user.fatherName}</Text>
        <Text style={styles.text}>CNIC: {user.cnic}</Text>
        <Text style={styles.text}>Course: WMA BATCH (12)</Text>
        {qrCodeUrl && (
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image style={styles.qrCode} src={qrCodeUrl} />
          </View>
        )}
        <Text
          style={[
            styles.text,
            {
              color: "red",
              marginTop: 20,
            },
          ]}
        >
          Note: This card is for SMIT premises only. If found, please return to
          SMIT.
        </Text>
        <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
          <Text style={styles.text}>Issuing Authority</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const PDFDownloadButton = ({ user }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    if (user) {
      QRCode.toDataURL(user.id, { width: 100 })
        .then(setQrCodeUrl)
        .catch(console.error);
    }
  }, [user]);

  return qrCodeUrl ? (
    <ErrorBoundary>
      <PDFDownloadLink
        document={<IDCardPDF user={user} qrCodeUrl={qrCodeUrl} />}
        fileName={user.id}
      >
        {({ loading }) => (
          <Button
            type="primary"
            size="small"
            style={{
              boxShadow: "none",
            }}
          >
            {loading ? "Download" : "Download"}
          </Button>
        )}
      </PDFDownloadLink>
    </ErrorBoundary>
  ) : (
    "Preparing QR..."
  );
};

export default PDFDownloadButton;
