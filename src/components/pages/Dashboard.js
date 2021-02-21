import React, { useState, useEffect } from "react";
import MainLayout from "../shared/Layout";
import { PageHeader, Divider, Form, Input } from "antd";
import {
  PlusCircleOutlined,
  SafetyOutlined
} from "@ant-design/icons";
import { Modal, Button, DatePicker, Space } from 'antd';

const gridStyle = {
  width: "33.33%",
  textAlign: "center",
  cursor: "pointer",
};

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date());
  const [item, setitem] = useState([]);
  const [name, setName] = useState('')
  const [resources, setResources] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { RangePicker } = DatePicker;

  function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {

    setitem([...item, { name: name, resources: resources}])
    setName('')
    setResources('')

  };
  useEffect(() => {

    const data = localStorage.getItem('task')

    if (data) {
      setitem(JSON.parse(data))
    }

    console.log(item)

  }, [])

  useEffect(() => {

    localStorage.setItem('task', JSON.stringify(item))

  })

  return (
    <MainLayout>
      <PageHeader
        title="Task"
        avatar={{
          icon: <SafetyOutlined style={{ color: "black" }} />,
          style: {
            background: "none",
          },
        }}
      />
      <Divider />
         {item.map((inputfield) =>
         <div>
          <p>{inputfield.name}</p>
          <p>{inputfield.resources}</p>
          <p>{inputfield.startDate}</p>
         </div>
          )}

      <Button type="primary" onClick={showModal} icon={<PlusCircleOutlined />}>
      </Button>
      <Modal title="Task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form onFinish={handleSubmit}>
          <p>Name</p>
          <Form.Item >
            <Input type='textarea' name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <p>Resources</p>
          <Form.Item >
            <Input type='text' name="resources" value={resources} onChange={(e) => setResources(e.target.value)} />
          </Form.Item>
          <p>Date</p>
          <Form.Item >
            <Space direction="vertical" size={12}>
              <RangePicker
                //showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                onOk={onOk}
               // value={startDate}
               // onChange={(e) => setStartDate(e.target.value)} 
              />
            </Space>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" value="Submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
}
