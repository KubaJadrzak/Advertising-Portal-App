import React from "react"
import {Box, Card, Typography, Button, ImageList, ImageListItem, Avatar} from '@mui/material'
import { createCartProduct } from "../api/cartProductApi"
import { deleteProduct } from "../api/productApi"
import { useLocation } from "react-router-dom"

import "./ProductsElement.css"

function ProductsElement({product, navigate, onAddToCart, onDeleteProduct}) {
    const location = useLocation()

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

    const isFromAccount = location.pathname.includes('/account');

    return (
        <Card className='products-element-container' onClick={() => {navigate(`/product/${product.id}`)}}>
            <Box className='products-element-header'>
                <Typography variant='h6'>{product.title}</Typography>
                <Typography>${product.price}</Typography>
            </Box>
                <Box className="products-element-image-container">
                    {product.images ?
                        <ImageList cols={2} className="products-element-image-list">
                            {product.images.map((image, index) => (
                                <ImageListItem key={index} >
                                    <img
                                    src={"http://localhost:3000" + image}
                                    loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>:
                        <Box>
                            <Typography variant='overline'>no image available</Typography>
                        </Box>

                    }
                </Box>
            <Typography className='products-element-description'>{product.description}</Typography>
            {!isFromAccount ?
            <Box className='products-element-footer'>
                <Button variant='contained' onClick={handleAddToCart}>Add to cart</Button>
                <Box className='products-element-seller'>
                    <Avatar className='products-element-seller-avatar' src={"http://localhost:3000" + product.seller.image}/>
                    <Typography>{product.seller.name}</Typography>
                </Box>
            </Box> :
            <Box className='products-element-footer'>
                <Button
                    variant='contained'
                    className='products-element-button'
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/product/${product.id}/edit`)
                    }}>
                    Edit
                </Button>
                <Button variant='contained' className='products-element-button' onClick={handleDeleteProduct}>
                    Delete
                </Button>
            </Box>
            }
        </Card>
    )
}

export default ProductsElement