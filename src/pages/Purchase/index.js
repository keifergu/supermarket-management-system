import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import AV from 'leancloud-storage';

const FormItem = Form.Item;

const appId = 'Nm3hDM8b75jzvnJV7fEOdDRv-gzGzoHsz';
const appKey = '4KCuUxCOkAj0KjqpBWRjEOfs';
AV.init({ appId, appKey });

const Product = AV.Object.extend('Products');

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let product = new Product();
    		product.set('name', values.productName);
    		product.set('amount', Number(values.amount));
    		product.set('price', Number(values.price));
    		product.save().then(function (product) {
    		  console.log('New object created with objectId: ' + product.id);
    		}, function (error) {
    		  console.error('Failed to create new object, with error message: ' + error.message);
    		});
      }
    });
    
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const productNameError = isFieldTouched('productName') && getFieldError('productName');
    const amountError = isFieldTouched('amount') && getFieldError('amount');
		const priceError = isFieldTouched('price') && getFieldError('price');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={productNameError ? 'error' : ''}
          help={productNameError || ''}
        >
          {getFieldDecorator('productName', {
            rules: [{ required: true, message: '请输入商品名' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="商品名" />
          )}
        </FormItem>
        <FormItem
          validateStatus={amountError ? 'error' : ''}
          help={amountError || ''}
        >
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: '请输入商品数量' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="number" placeholder="商品数量" />
          )}
        </FormItem>
        <FormItem
        	validateStatus={priceError ? 'error' : ''}
          help={priceError || ''}
        >
					{getFieldDecorator('price', {
            rules: [{ required: true, message: '请输入商品价格' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="商品单价" />
          )}        
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            入库
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);

export default WrappedHorizontalLoginForm;
