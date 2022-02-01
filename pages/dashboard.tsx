import useDevices from '@util/hooks/useDevices';
import Status from 'components/devices/Status';

function Dashboard() {
  const devices = useDevices();

  return <div>{devices?.map((d) => <Status device={d} key={d.id} />)}</div>;
}

export default Dashboard;
