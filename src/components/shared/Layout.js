import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Modal, Input, Form } from "antd";
import {
  PlusCircleOutlined
} from "@ant-design/icons";
import { Link, useHistory, withRouter } from "react-router-dom";


const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;


const MainLayout = ({ children }) => {
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [item, setitem] = useState([]);
  const [ProjectName, setProjectName] = useState('')
  const [Id, setId] = useState('')

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

    setitem([...item, { ProjectName: ProjectName, Id: Id }])
    setProjectName('')
    setId('')

  };


  useEffect(() => {

    const data = localStorage.getItem('data')

    if (data) {
      setitem(JSON.parse(data))
    }

    console.log(item)

  }, [])

  useEffect(() => {

    localStorage.setItem('data', JSON.stringify(item))

  })

  // const onMenuSelect = ({ key }) => {
  //   history.push(key);
  //  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="main-logo">
          <h3 style={{ color: "white" }}>
            <b>Task App</b>
          </h3>
        </div>
        <div
          style={{
            float: "right",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          breakpoint="md"
          collapsedWidth="0"
        >
          {item.map((inputfield) =>
            <Menu
              mode="inline"
              style={{ height: "12%", borderRight: 0 }}
              theme="dark"
            //onSelect={onMenuSelect}
            >
              <Menu.Item >
                <span>
                  <Link to={"/project/" + inputfield.Id}>{inputfield.ProjectName}</Link>
                </span>
              </Menu.Item>
            </Menu>
          )}

          <Button type="primary" style={{ marginLeft: "40px", marginTop: "100px" }} onClick={showModal} icon={<PlusCircleOutlined />} />
          <Modal title="Task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form onFinish={handleSubmit}>
              <p>Id:</p>
              <Form.Item
                type="text" name="Id" value={Id} onChange={(e) => setId(e.target.value)}
              >
                <Input />
              </Form.Item>
              <p>ProjectName:</p>
              <Form.Item
                type="text" name="ProjectName" value={ProjectName} onChange={(e) => setProjectName(e.target.value)}
              >
                <Input />
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Submit
               </Button>
              </Form.Item>
            </Form>


          </Modal>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="main-content site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              background: "#fff",
              marginTop: 10,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default withRouter(MainLayout);
