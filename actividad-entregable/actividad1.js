//Actividad: Desafio entregable 1 

class ProductManager {
    constructor() {
        this.products = [];
        this.ProductId = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        // Valida todos los campos

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        // Valida que el campo "code" no se repita

        const existingProduct = this.products.find((product) => product.code === code);
        if (existingProduct) {
            console.error(`El código "${code}" ya existe`);
            return;
        }

        // Incrementa el id del producto

        this.ProductId++;

        // Creacion del nuevo producto

        const newProduct = {
            id: this.ProductId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        // Agrega el producto al arreglo

        this.products.push(newProduct);
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            console.log(product);
        } else {
            console.error("Not found");
        }
    }
}

// Ejemplo

const productManager = new ProductManager();

// Agregar productos
productManager.addProduct("Computadora", "Lenovo", 150.000, "Sin Imagen", "abc123", 15);
productManager.addProduct("Auriculares", "ASTRO Gaming A50", 30.000, "Sin Imagen", "def456", 3);
productManager.addProduct("Celular", "Motorola", 90.000, "Sin Imagen", "ghi789", 11);

// Obtener todos los productos
productManager.getProducts();

// Obtener un producto por su id
productManager.getProductById(3);

// Obtener un producto inexistente
productManager.getProductById(14);
