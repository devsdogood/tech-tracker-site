import useDevices from "@util/hooks/useDevices";

const Dashboard: React.FC = () => {
  const devices = useDevices();

  return <div>{devices?.map((d) => d.name)}</div>;
};

export default Dashboard;
