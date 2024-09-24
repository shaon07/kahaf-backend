import { products } from '../temp/products';
import expressAsyncHandler from "express-async-handler";
import ApiResponse from '../utils/ApiResponse';

export const getProducts = expressAsyncHandler(async (req, res) => {
    const productList = products;
    res.status(200).send(new ApiResponse({
        statusCode: 200,
        data: productList,
        message: 'Products fetched successfully'
    }));
});

export const getProduct = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = products.find(product => product.id === Number(id));

    if(!product){
        throw new Error('Product not found');
    }

    res.status(200).send(new ApiResponse({
        data: product,
        message: 'Product fetched successfully',
    }));
})