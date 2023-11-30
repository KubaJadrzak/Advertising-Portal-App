import React from "react"
import {Box, Card, Typography, Button} from '@mui/material'
import { createCartProduct } from "../api/cartProductApi"
import { deleteProduct } from "../api/productApi"

import "./ProductsListElement.css"

function ProductsListElement({product, navigate, onAddToCart, onDeleteProduct}) {


    if (!product || product.length === 0) return (
        <div></div>
    )

    const handleAddToCart = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        const carted_product_id = product.id
        const data = { carted_product_id }
        try {
            await createCartProduct(data)
            onAddToCart(product.id)
        } catch (e) {
            console.error("Failed to create a post: ", e)
        }
    }

    const handleDeleteProduct = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        try {
            deleteProduct(product.id)
            onDeleteProduct(product.id)
        } catch (e) {
            console.error("Failed to delete the product:", e)
        }
    }

    return (
        <Card className='product-list-element-container' onClick={() => {navigate(`/product/${product.id}`)}}>
            <Box className='product-list-element-header'>
                <Typography variant='h6'>{product.title}</Typography>
                <Typography>${product.price}</Typography>
            </Box>
                <Box className="product-list-element-image-container">
                    {product.image ?
                        <Box
                            className="product-list-element-image"
                            component='img'
                            alt="img"
                            src={"http://localhost:3000" + product.image}
                        /> :
                        <Box
                        >
                            <Typography variant='overline'>no image available</Typography>
                        </Box>

                    }
                </Box>
            <Typography className='product-list-element-description'>{product.description}</Typography>
            {product.seller ?
            <Box className='product-list-element-footer'>
                <Button variant='contained' onClick={handleAddToCart}>Add to cart</Button>
                <Box>
                    <Typography>{product.seller.name}</Typography>
                </Box>
            </Box> :
            <Box className='product-list-element-footer'>
                <Button
                    variant='contained'
                    className='product-list-element-button'
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/product/${product.id}/edit`)
                    }}>
                    Edit
                </Button>
                <Button variant='contained' className='product-list-element-button' onClick={handleDeleteProduct}>
                    Delete
                </Button>
            </Box>
            }
        </Card>
    )
}

export default ProductsListElement