import React, { useState } from 'react';
import { Device } from '@prisma/client';
import {
  ActionIcon, Input, Badge, Paper,
} from '@mantine/core';
import { Adjustments } from 'tabler-icons-react';
import styles from './Status.module.css';

type StatusProps = {
  device: Device;
};

function Status({ device }: StatusProps) {
  const color = device.status === 'ONLINE' ? 'green' : 'red';
  const [Edit, toggleEdit] = useState<Boolean>(true);

  return (
    <div className={styles['title-text']}>
      <Paper shadow="xs" radius="xl" p="md" withBorder>
        <Badge color={color} size="xl" variant="dot">{device.name}</Badge>
        <ActionIcon onClick={() => toggleEdit(!Edit)}>
          <Adjustments size={16} />
        </ActionIcon>
        <Input variant="default" placeholder="Enter ID" disabled={!Edit} />
        <Input variant="default" placeholder="Enter IP" disabled={!Edit} />
        <div>
          Last Updated:
          {device.lastUpdated}
        </div>
      </Paper>
    </div>

  );
}

export default Status;
