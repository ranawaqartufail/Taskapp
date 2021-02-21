import React, { Component, useState} from 'react';
import { Modal, Button, PageHeader,Divider} from 'antd';
import {
  SafetyOutlined,
  PlusCircleOutlined   
} from "@ant-design/icons";
import MainLayout from '../shared/Layout';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import { withRouter } from "react-router";

const listProjects= gql`
query QueryProjects{
  listProjects{
    items {
      description 
      estimate 
      id 
      name 
      skey 
      startdate 
      status
    }
  }
}
`

function Task(props){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.warn(props)
  return (
    <MainLayout>
      <PageHeader
        title="Project"
        avatar={{
          icon: <SafetyOutlined style={{ color: "black" }} />,
          style: {
            background: "none",
          },
        }}
      />
      <Divider />
    <>
    <div>
      <h1>Project{props.match.params.id}</h1>
    </div>
 
         {
            props.todos.map((items,i)=>(
             <p key={i}>{items.name}</p>
            ))
          }
  
      <Button type="primary"  icon={<PlusCircleOutlined  />} onClick={showModal} />
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
      
      </Modal>
    </>
        
    </MainLayout>
  );
};
export default graphql(listProjects,{
    options:{
      fetchPolicy:'cache-and-network'
    },
    props:props=>({
        todos:props.data.listProjects ? props.data.listProjects.items:[]
      })
      
  })
  (Task);
