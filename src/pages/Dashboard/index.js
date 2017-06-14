import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './index.css';

import Products from '../Products';
import Purchase from '../Purchase';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class DashBoard extends Component {
	constructor() {
		super();
		this.state = {
			content: 'products'
		};
		this.changeMenu = this.changeMenu.bind(this);
	}

	changeMenu(next) {
		this.setState({content: next.key});
	}

	render() {
		const map = {
			'products': Products,
			'purchase': Purchase
		}
		const MenuContent = map[this.state.content] || Products;
    const menuList = [
        {
            key: 'userAdmin',
            icon: 'user',
            title: '用户管理',
            items:[
                ['users','会员管理']
            ]
        },
        {
            key: 'productAdmin',
            icon: 'laptop',
            title: '商品管理',
            items:[
            	['products','商品库存'],
            	['purchase','进货管理']
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
                ['stuff','员工管理'],
                ['economic','工资管理'],
                ['attendance','出勤管理']
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
		          onClick={this.changeMenu}
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
		          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
		          <Breadcrumb.Item>商品库存</Breadcrumb.Item>
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
