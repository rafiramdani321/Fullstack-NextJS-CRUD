"use client"

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "../components/loadingSpinner";
import AlertSuccess from "../components/alertSuccess";

type Product = {
  id: number,
  title: string,
  price: number,
  brandId: number
}

const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [messageSuccess, setMessageSuccess] = React.useState("" || []);
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (productId: Number) => {
    setIsloading(true);
    try {
      const res = await axios.delete(`/api/products/${productId}`)
      setMessageSuccess(res.data.message)
      setAlertSuccess(true)
      setTimeout(() => {
        setIsOpen(false);
        setAlertSuccess(false)
        setMessageSuccess("" || [])
        router.refresh();
      }, 2000)
    } catch (error) {
      return;
    }finally{
      setIsloading(false);
    }
  };

  return (
    <>
    {isLoading ? <LoadingSpinner />:null}
    <div>
      <button disabled={isLoading} className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>
       <div className="absolute z-50 -right-8 -top-16">
          <AlertSuccess message={messageSuccess} isOpen={alertSuccess} />
        </div>
      <div className={isOpen ? "modal modal-open z-20" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete {product.title}?</h3>
            <div className="modal-action">
              <button disabled={isLoading} type="button" className="btn" onClick={handleModal}>
                No
              </button>
              <button disabled={isLoading} type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">
                Yes
              </button>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DeleteProduct;
