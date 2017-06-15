import React, { Component } from 'react';
import { Table, Button, Input } from 'antd';

import AV from 'leancloud-storage';
const appId = 'Nm3hDM8b75jzvnJV7fEOdDRv-gzGzoHsz';
const appKey = '4KCuUxCOkAj0KjqpBWRjEOfs';
AV.init({ appId, appKey });

const ButtonGroup = Button.Group;

export default class Products extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			editable: {}
		};
		this.fetchProducts();
	}
	fetchProducts() {
		var query = new AV.Query('Products');
		query.find().then(items => {
			let products = items.map(item => ({
				...item.attributes,
				cid: item.cid,
				id: item.id
			}));
			this.setState({products});
		})
	}
	changeProduct() {

	}
	deleteProduct() {

	}
	handleDelete = (record) => {
		const index = this.state.products.findIndex( v => {
			return v.id === record.id
		})
		const products = this.state.products;
		products.splice(index, 1)
		this.setState({products});
	}
	handleTableChange = (record, e) => {
		const value = e.target.value;
		const name = e.target.name;
		const products = this.state.products.map(v => {
			return v.id === record.id ? {
				...v,
				[name]: value
			} : v
		})
		this.setState({products});
	}
	render() {
		const { products, editable } = this.state;
		const columns = [{
		  title: '编号',
		  dataIndex: 'cid',
		  key: 'cid',
		}, {
		  title: '商品名',
		  dataIndex: 'name',
		  key: 'name',
		  render: (text, record) => (
		  	<div>
		  		{editable[record.id] ? 
		  			<Input type="text" value={text} name="name" onChange={e => this.handleTableChange(record, e)}/> : 
		  			text
		  		}
		  	</div>
		  )
		}, {
		  title: '数量',
		  dataIndex: 'amount',
		  key: 'amount',
		  render: (text, record) => (
		  	<div>
		  		{editable[record.id] ? 
		  			<Input type="number" value={text} name="amount" onChange={e => this.handleTableChange(record, e)}/> : 
		  			text
		  		}
		  	</div>
		  )
		}, {
		  title: '单价(元)',
			dataIndex: 'price',
		  key: 'price',
		  render: (text, record) => (
		  	<div>
		  		{editable[record.id] ? 
		  			<Input type="number" value={text} name="price" onChange={e => this.handleTableChange(record, e)}/> : 
		  			text
		  		}
		  	</div>
		  )
		}, {
			title: '操作',
			key: 'action',
			render: (text, record) => (
			    <span>
				    {editable[record.id] ?
				    	<Button type="primary" icon="save" onClick={() => {
				    		this.setState({
				    			editable: {
				    				[record.id]: false
				    			}})
				    	}}
				    	>Save</Button>
				    	:
				      <ButtonGroup>
					      <Button type="primary" icon="edit" onClick={() => {
					      	this.setState({
					      		editable: {
					      			[record.id]: true
					      		}})
					      }}
					      />
					      <Button type="danger" icon="delete" onClick={()=>this.handleDelete(record)}/>
					    </ButtonGroup>
				    }
			    </span>
			  ),
		}];
		return (
			<div>
				<Table columns={columns} dataSource={products} onChange={this.handleTableChange}/>
			</div>
		);
	}
}
