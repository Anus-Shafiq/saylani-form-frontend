import { Tabs } from "antd";
import RegistrationForm from "./form";
import DownloadForm from "./download";

const Tab = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        centered
        size="small"
        style={{ marginBottom: 32 }}
        items={[
          {
            label: "Registration Form",
            key: "1",
            children: <RegistrationForm />,
          },
          {
            label: "Download ID Card",
            key: "2",
            children: <DownloadForm />,
          },
        ]}
      />
    </div>
  );
};
export default Tab;
