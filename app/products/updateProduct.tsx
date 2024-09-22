"use client"

import React, { SyntheticEvent } from 'react';
import type { Brand } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AlertError from '../components/alertError';
import AlertSuccess from '../components/alertSuccess';
import LoadingSpinner from '../components/loadingSpinner';

type Product = {
  id: number,
  title: string,
  price: number,
  brandId: number
}

const updateProduct = ({brands, product}: {brands:Brand[]; product: Product }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalSuccess, setModalSuccess] = React.useState(false);
  const [modalError, setModalError] = React.useState(false);
  const [message, setMessage] = React.useState("" || [])
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    title: product.title,
    price: product.price,
    brand: product.brandId
  });

  const handleModal = () => {
    setIsOpen(!isOpen);
  }

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleUpdateProduct = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.put(`/api/products/${product.id}`, {
        title: formData.title,
        price: Number(formData.price),
        brandId: Number(formData.brand)
      })
      setModalSuccess(true);
      setMessage(res.data.message);
      setTimeout(() => {
        router.refresh();
        setIsOpen(false);
        setModalSuccess(false);
        setMessage("" || [])
      }, 2000)
    } catch (error: any) {
      setModalError(true);
      setMessage(error.response.data.errorDetail);
      setTimeout(() => {
        setModalError(false);
        setMessage("" || [])
      }, 3000)
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
    {isLoading ? <LoadingSpinner /> : null}
    <div className="absolute z-50 -right-6 -top-20">
      {modalSuccess ? <AlertSuccess message={message} isOpen={modalSuccess} /> : null}
      {modalError ? <AlertError message={message} isOpen={modalError} /> : null}
      </div>
    <div>
      <button className='btn btn-primary btn-sm' onClick={handleModal}>
        Update
      </button>
      <div className={isOpen ? "modal modal-open z-20" : "modal"}>
        <div className='modal-box'>
          <h3 className="font-bold text-lg">Update Product</h3>
          <form onSubmit={handleUpdateProduct}>
            <div className="form-control w-full">
              <label htmlFor="title" className="label font-bold">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChangeInput}
                value={formData.title}
                className="input input-bordered"
                placeholder="Product name"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="price" className="label font-bold">Price</label>
             <input
                type="text"
                name="price"
                id="price"
                onChange={handleChangeInput}
                value={formData.price}
                className="input input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="brand" className="label font-bold">Brand</label>
              <select 
                name="brand" 
                id="brand" 
                className="select select-bordered"
                value={formData.brand}
                onChange={handleChangeInput}
                >
                <option value="">Select a brand</option>
                {brands.map(brand => (
                  <option value={brand.id} key={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" type='button' onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default updateProduct