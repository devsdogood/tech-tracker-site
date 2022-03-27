import useDevices from '@util/hooks/useDevices';

function Dashboard() {
  const devices = useDevices();

  return <div>{devices?.map((d) => d.name)}</div>;
}

export default Dashboard;
