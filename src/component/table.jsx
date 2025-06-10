import { Table, Button } from "antd";
import PDFDownloadButton from "./card";

const data = [
  { key: "1", course: "John Brown", batch: 32 },
  { key: "2", course: "Jim Green", batch: 42 },
];

const DataTable = () => {
  const columns = [
    {
      title: "Course/Event",
      dataIndex: "course",
      key: "course",
      width: 400,
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          style={{
            boxShadow: "none",
          }}
          onClick={() => handleDownload(record)}
        >
          <PDFDownloadButton />
        </Button>
      ),
    },
  ];

  const handleDownload = (record) => {
    console.log("Download triggered for:", record);
  };

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default DataTable;
