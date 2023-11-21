import CartsManager from '../dao/cart.manager.js';
import express from 'express';

const router = express.Router();

router.post('/carts', async (req, res) => {
    try {
        const cartId = await CartsManager.addCart();
        res.status(201).json({ message: 'Cart created successfully' , cartId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating cart.' });
    }
});

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;

    try {
        const products = await CartsManager.getCartById(cartId);
        if (products === -1) {
            res.status(404).json({ error: 'There is no cart with that ID.' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining products.' });
    }
});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        await CartsManager.addProductToCart(cartId, productId, quantity);
        res.status(201).json({ message: `Product id ${productId} added to Cart id ${cartId}!😎` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding product to cart' });
    }
});

export default router;


// import express from 'express';

// const router = express.Router();




// const cartManager = new CartManager('./carts.json');


// router.post('/carts', (req, res) => {
//     cartManager.addCart()
//         .then(() => {
//             res.status(201).json({ message: 'Cart created successfully' });
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ error: 'Error creating cart.' });
//         })
// });

// // Ruta GET para listar los productos en un carrito específico (por ID de carrito)
// router.get('/carts/:cid', (req, res) => {
//     const cartId = req.params.cid;
//     cartManager.getCartById(parseInt(cartId))
//         .then(products => {
//             if (products === -1) {
//                 res.status(404).json({ error: 'There is no cart with that ID.' });
//             } else {
//                 res.status(200).json(products);
//             }
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ error: 'Error obtaining product.' });
//         });
// });


// // Ruta POST para agregar un producto a un carrito
// router.post('/carts/:cid/product/:pid', (req, res) => {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;
//     const quantity = req.body.quantity || 1; // La cantidad predeterminada es 1
//     cartManager.addProductToCart(parseInt(cartId), parseInt(productId), parseInt(quantity))
//         .then(() => {
//             res.status(201).json({ message: `Product id ${productId} added to Cart id ${cartId}!😎` });
//         })
//         .catch(error => {
//             res.status(500).json({ error: 'Error adding product to cart' });
//         });
// });

// export default router;