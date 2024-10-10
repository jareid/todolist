import React, { useState, useEffect } from 'react';
import { List, Button, Form, Input } from 'antd';
import axios from 'axios';

interface Duty {
  id: string;
  name: string;
}

const Duties: React.FC = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [newDuty, setNewDuty] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDuties = async () => {
      const response = await axios.get('/duties');
      setDuties(response.data);
    };
    fetchDuties();
  }, []);

  const handleAddDuty = async () => {
    const response = await axios.post('/duties', { name: newDuty });
    setDuties([...duties, response.data]);
    setNewDuty('');
  };

  const handleEditDuty = async (id: string, name: string) => {
    const response = await axios.put(`/duties/${id}`, { name });
    setDuties(duties.map(d => (d.id === id ? response.data : d)));
    setEditingId(null);
  };

  return (
    <div>
      <List
        header={<h3>To-Do List</h3>}
        bordered
        dataSource={duties}
        renderItem={item => (
          <List.Item>
            {editingId === item.id ? (
              <Input
                value={item.name}
                onChange={e => handleEditDuty(item.id, e.target.value)}
              />
            ) : (
              <span>{item.name}</span>
            )}
            <Button onClick={() => setEditingId(item.id)}>Edit</Button>
          </List.Item>
        )}
      />
      <Form onFinish={handleAddDuty}>
        <Form.Item>
          <Input
            placeholder="Enter new duty"
            value={newDuty}
            onChange={e => setNewDuty(e.target.value)}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Duty
        </Button>
      </Form>
    </div>
  );
};

export default Duties;
