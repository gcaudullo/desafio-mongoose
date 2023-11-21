import CartModel from './models/carts.model.js';

export default class CartsManager {
    static async addCart() {
        try {
            const newCart = await CartModel.create({
                products: []
            });
            console.log(`Cart created with id: ${newCart._id} 😎`);
            return newCart._id; // Devuelve el ID del carrito creado
        } catch (error) {
            console.error('Error creating Cart:', error);
            throw error;
        }
    }

    static async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                return -1; // Devuelve -1 si el carrito no se encuentra
            } else {
                return cart.products;
            }
        } catch (error) {
            console.error('Error getting cart by ID:', error);
            throw error;
        }
    }

    static async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                console.error(`Cart id ${cartId} not found 😨`);
                return;
            }

            const existingProduct = cart.products.find(product => {
                return product.product.toString() === productId});

            if (existingProduct) {
                // Si el producto ya existe, incrementa la cantidad
                existingProduct.quantity += quantity;
            } else {
                // Si el producto no existe en el carrito, lo agrega
                cart.products.push({ product: productId, quantity: quantity });
            }

            await cart.save(); // Guarda el carrito actualizado en la base de datos
            console.log(`Cart id ${cartId} updated! 😎`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
    }
}