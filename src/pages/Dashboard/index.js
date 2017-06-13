import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './index.css';

import Products from '../Products';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class DashBoard extends Component {
	constructor() {
		super();
		this.state = {
			content: 'products'
		};
	}

	changeContent(next) {

	}

	render() {
		const map = {
			'products': Products
		}
		const MenuContent = map[this.state.content];
    const menuList = [
        {
            key: 'map',
            icon: 'user',
            title: '进货管理',
            items:[
                ['currentProduct','当前进货'],
                ['inserSort','商家管理'],
            ]
        },
        {
            key: 'productAdmin',
            icon: 'laptop',
            title: '库存管理',
            items:[
            	['products','库存'],
            	['2','仓库']
            ]
        },
        {
            key: 'dynamic',
            icon: 'notification',
            title: '销售管理',
            items:[
            	['3','销售清单'],
            	['4','历史销售']
            ]
        },
        {
            key: 'stuffAdmin',
            icon: 'user',
            title: '人员管理',
            items:[
                ['stuff','员工列表'],
                ['economic','工资管理'],
            ]
        },
    ];
		return (
		  <Layout>
		    <Header className="header">
		      <div className="logo" />
		      <Menu
		        theme="dark"
		        mode="horizontal"
		        defaultSelectedKeys={['1']}
		        style={{ lineHeight: '64px' }}
		      >
		        <Menu.Item key="1">DashBoard</Menu.Item>
		      </Menu>
		    </Header>
		    <Layout>
		      <Sider width={200} style={{ background: '#fff' }}>
		        <Menu
		          mode="inline"
		          defaultSelectedKeys={['products']}
		          defaultOpenKeys={['productAdmin']}
		          style={{ height: '100%' }}
		        >
	            {menuList.map((menu) => (
	                <SubMenu key={menu.key} title={<span><Icon type={menu.icon} />{menu.title}</span>}>
	                    {menu.items.map((item) =>
	                    		<Menu.Item key={item[0]}>{item[1]}</Menu.Item>
	                    )}
	                </SubMenu>
	            ))}
		        </Menu>
		      </Sider>
		      <Layout style={{ padding: '0 24px 24px' }}>
		        <Breadcrumb style={{ margin: '12px 0' }}>
		          <Breadcrumb.Item>Home</Breadcrumb.Item>
		          <Breadcrumb.Item>List</Breadcrumb.Item>
		          <Breadcrumb.Item>App</Breadcrumb.Item>
		        </Breadcrumb>
		        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
		          <MenuContent />
		        </Content>
		      </Layout>
		    </Layout>
		  </Layout>
		);
	}
}
