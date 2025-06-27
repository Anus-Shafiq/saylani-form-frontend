import { Table } from "antd";
import PDFDownloadButton from "./card";

const DataTable = ({ users }) => {
  const columns = [
    {
      title: "Course/Event",
      dataIndex: "course",
      key: "course",
      width: 400,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <PDFDownloadButton user={record} />,
    },
  ];

  return <Table columns={columns} dataSource={users} pagination={false} />;
};

export default DataTable;
