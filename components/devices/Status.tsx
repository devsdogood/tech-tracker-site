import React, { useState } from 'react';
import { Device } from '@prisma/client';
import {
  ActionIcon, Input, Badge, Paper, Grid,
} from '@mantine/core';
import { Edit } from 'tabler-icons-react';
import Moment from 'react-moment';
import styles from './Status.module.css';

type StatusProps = {
  device: Device;
};

function Status({ device }: StatusProps) {
  const color = device?.status === 'ONLINE' ? 'green' : 'red';
  const [edit, toggleEdit] = useState(false);

  return (
    <div className={styles['title-text']}>
      <Paper shadow="xl" radius="xl" p="md" withBorder>
        <Grid className={styles['paper-grid']} justify="space-between">
          <Grid.Col span={3}>
            <Badge color={color} size="xl" variant="dot">{device?.name}</Badge>
          </Grid.Col>
          <Grid.Col span={2}>
            <ActionIcon color="blue" size="md" variant="hover" onClick={() => toggleEdit(!edit)}>
              <Edit size={16} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
        <Input className={styles['input-box']} variant="default" placeholder="Enter Name" defaultValue={device?.name} disabled={!edit} />
        <Input className={styles['input-box']} variant="default" placeholder="Enter IP" defaultValue={device?.ip} disabled={!edit} />
        <div>
          Last Updated:
          <Moment className={styles.moment} fromNow>
            {device?.lastUpdated}
          </Moment>
        </div>
      </Paper>
    </div>

  );
}

export default Status;
