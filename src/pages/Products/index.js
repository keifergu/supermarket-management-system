import React, { Component } from 'react';
import { Table } from 'antd';

import AV from 'leancloud-storage';
const appId = 'Nm3hDM8b75jzvnJV7fEOdDRv-gzGzoHsz';
const appKey = '4KCuUxCOkAj0KjqpBWRjEOfs';
AV.init({ appId, appKey });
const ProductsObject = AV.Object.extend('Products');
const productsObject = new ProductsObject();

productsObject.save({
  name:'娃哈哈矿泉水 500ml',
  amount: 20,
  price: 1
})



const columns = [{
  title: '编号',
  dataIndex: 'cid',
  key: 'cid',
  render: text => <a href={text}>{text}</a>,
}, {
  title: '商品名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '数量',
  dataIndex: 'amount',
  key: 'amount',
}, {
  title: '单价',
	dataIndex: 'price',
  key: 'price',
}];

export default class Products extends Component {
	constructor() {
		super();
		this.state = {
			products: []
		};
		this.fetchProducts();
	}

	fetchProducts() {
		var query = new AV.Query('Products');
		query.find().then(items => {
			console.log(items)
			let products = items.map(item => ({
				...item.attributes,
				cid: item.cid,
				id: item.id
			}));
			this.setState({products});
		})
	}
	render() {
		const { products } = this.state;
		return (
			<div>
				<Table columns={columns} dataSource={products} />
			</div>
		);
	}
}
