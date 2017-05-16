import React from 'react'
import { Layout, Menu } from 'antd'

const {Header, Content, Footer} = Layout

export default function Frame(props) {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
    </Header>
      <Content style={{ background: '#fff', padding: 24, minHeight: '80vh' }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: 'center', minHeight: '10vh' }}>
        powered by July95685 ©2017.04 
      </Footer>
    </Layout>
  )
}