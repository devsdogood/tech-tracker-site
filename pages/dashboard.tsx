import useDevices from '@util/hooks/useDevices';
import Status from 'components/devices/Status';
import DeviceForm from 'components/devices/DeviceForm';

function Dashboard() {
  const devices = useDevices();

  return (
    <div>
      {devices?.map((d) => <Status device={d} key={d.id} />)}
      {' '}
      <DeviceForm />
    </div>
  );
}

export default Dashboard;
