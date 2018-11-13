import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router'
import gql from 'graphql-tag'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
const CREATE_ITEM_MUTATION = gql`
  mutation ALL_ITEMS_QUERY(
      $title: String!
      $description: String!
      $price: Int!
      $image: String
      $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    )
  }
`
class CreateItem extends Component {
  state = {
    title: 'cool shoes',
    description: 'This is description',
    image: 'cat.png',
    largeImage: 'dog.jpeg',
    price: 0,
  }
  handleChange = (evt) => {
    const {name, type, value} = evt.target
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({[name]: val})
  }
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
      <Form onSubmit={ async (e) => {
        e.preventDefault();
        const res = await createItem()
        Router.push({
          pathname: '/item',
          query: {id: res.data.createItem.id},
        }
      )
      }}>
        <Error error={error}/>
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" required value={this.state.title} onChange={this.handleChange} />
          </label>
          <label htmlFor="price">
            Price
            <input type="number" id="price" name="price" placeholder="price" required value={this.state.price} onChange={this.handleChange} />
          </label>
          <label htmlFor="description">
            Description
            <textarea id="description" name="description" placeholder="description" required value={this.state.description} onChange={this.handleChange} />
          </label>
        <button type="submit"> Submit </button>
        </fieldset>
      </Form>
    )}
  </Mutation>
    );
  }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION}
