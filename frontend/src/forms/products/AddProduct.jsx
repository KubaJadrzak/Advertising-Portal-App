import React, { useState, useEffect }  from "react"
import { fetchAllCategories } from "../../api/categoryApi"
import { createProduct } from "../../api/productApi"
import ProductForm from "./ProductForm"
import { Box } from '@mui/material'
import { useNavigate } from "react-router-dom"
import './ProductForm.css'

function AddProduct() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
            } catch (e) {
                console.error("Failed to load: ", e)
            }
          };
          loadData();
        }, []);

    const handleSubmit = async ({title, price, category_id, description, image}) => {
        const data = {
            title,
            price,
            category_id,
            description,
            image: image[0]
        }
        try {
            const response = await createProduct(data)
            navigate(`/product/${response.id}`)
        } catch (e) {
            console.error("Failed to create a product: ", e)
        }
    }

    if (!categories || categories.length === 0) return (
        <div></div>
    )

    const data = {
        title: '',
        price: '',
        category_id: '',
        description: '',
        image: '',
        categories
    }

    return (
        <Box>
            <ProductForm uploadMessage={"Upload Image"} buttonMessage={"Create New Product"} data={data} handleSubmit={handleSubmit}/>
        </Box>
    )
}

export default AddProduct