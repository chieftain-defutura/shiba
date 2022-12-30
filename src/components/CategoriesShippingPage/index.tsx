import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiMinus } from 'react-icons/bi'
import './CategoriesShippingPage.css'

const CategoriesShippingPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1)

  const handlePlus = () => {
    setQuantity(quantity + 1)
  }

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleSubmit = (values: any) => {
    console.log(values, quantity)
  }
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="categories-shipping-container">
              <div className="categories-shipping-container-right">
                <h2 className="title">shoesboutique.shib</h2>
                <div className="content-box">
                  <div className="content-box-left">
                    <div className="shipping-form-container">
                      <h2 className="title">Shipping form</h2>
                      <div className="form-container">
                        <div className="left">
                          <p>Name:</p>
                          <p>Phone:</p>
                          <p>Address:</p>
                          <p>City:</p>
                          <p>State:</p>
                          <p>Postal zip code:</p>
                          <p>Country:</p>
                        </div>
                        <div className="right">
                          <Field
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                          />
                          <Field
                            name="phone"
                            type="number"
                            placeholder="Enter your number"
                          />
                          <Field
                            name="address"
                            type="text"
                            placeholder="Enter your address"
                          />
                          <Field name="city" type="text" placeholder="City" />
                          <Field name="state" type="text" placeholder="State" />
                          <Field
                            name="zipCode"
                            type="text"
                            placeholder="Zip code"
                          />
                          <Field
                            name="country"
                            type="text"
                            placeholder="country"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="description-cont">
                      <h3>Product Description:</h3>
                      <p>Product Details:</p>
                    </div>
                  </div>
                  <div className="content-box-right">
                    <div className="product-details">
                      <p>Item Name: Shoes1</p>
                      <p>Available Sizes: 34, 39, 40</p>
                      <p>Available Colours: Red, Black</p>
                      <p>Fabric Type: 100% Cotton</p>
                      <p>Item Condition: New</p>
                      <p>Manufacturer: Canada</p>
                      <p>Brand: SuperBrand</p>
                      <br />
                      <p>Refund Possible: Yes</p>
                      <p>Department: Women</p>
                      <p>Shipment Area: Worldwide</p>
                      <p>Shipment Fee: 2000 SHI</p>
                      <p>Delivered In: 15-20 Working Days</p>
                    </div>
                    <br />
                    <div className="quantity-container">
                      <p>Quantity:</p>
                      <div className="quantity-box">
                        <button type="button" onClick={handleMinus}>
                          <BiMinus />
                        </button>
                        <p>{quantity}</p>
                        <button type="button" onClick={handlePlus}>
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>
                    <div className="buy-container">
                      <div className="top">
                        <p>Price: 10000 SHI</p>
                        <p>Total: 12000 SHI</p>
                      </div>
                      <button>Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CategoriesShippingPage
