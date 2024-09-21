"use client";
import React, { SyntheticEvent } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    price: "",
    brand: "",
  });
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProduct = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/products", {
      title: formData.title,
      price: Number(formData.price),
      brandId: Number(formData.brand),
    });
    setFormData({
      ...formData,
      title: "",
      price: "",
      brand: "",
    });
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSaveProduct}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                onChange={handleChangeInput}
                name="title"
                value={formData.title}
                className="input input-bordered"
                placeholder="Product name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                onChange={handleChangeInput}
                name="price"
                value={formData.price}
                className="input input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                className="select select-bordered"
                onChange={handleChangeInput}
                name="brand"
                value={formData.brand}
              >
                <option value="" disabled>
                  Select a Brand
                </option>
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
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
  );
};

export default AddProduct;
