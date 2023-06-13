const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path
    }
    #newId = 1;

    async addProduct(title, description, price, thumbnail, codigo, stock) {

        try {
            await this.getProducts();

            if (!(!!title && !!description && !!price && !!thumbnail && !!codigo && !!stock)) {
                console.log("Se requieren todos los campos");
                return;
            }

            let codigoExistente = this.products.some((element) => {
                return element.code === codigo;
            });

            if (codigoExistente) {
                console.log("Error: el codigo ya existe");
                return;
            }

            if ((!!title && !!description && !!price && !!thumbnail && !!codigo && !!stock) && !codigoExistente) {
                const product = {
                    id: this.#newId,
                    title,
                    description,
                    price,
                    thumbnail,
                    code: codigo,
                    stock
                }
                this.products.push(product);
                this.#newId++;
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            }
                
        }catch(error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                this.products.splice(0, this.products.length);
                this.products.push(...JSON.parse(productsJSON));
                return this.products;
            } else {
                return this.products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(NumeroId) {
        try {
            let products = await this.getProducts();
            let foundProduct = products.find((element) => {
                return element.id === NumeroId;
            });
            console.log(foundProduct);
            return foundProduct;
        } catch (error) {
            console.log(error);
        }
}
    async updateProduct(NumeroId, actualizar) {
        try {
            await this.getProducts();
            let i = this.products.findIndex((element) => {
                return element.id === NumeroId;
            });
            if(actualizar.code){
                let isCodeExist = false;
                isCodeExist = this.products.some((item) => item.code === actualizar.code);
                if (!isCodeExist) {
                    let modifiedProducts = {
                        ...this.products[i],
                        ...actualizar
                    }
                    this.products[i] = modifiedProducts;
                    this.saveProducts(this.products);
            
                } else {
                    console.log("Error: el codigo ya existe");
                    return;
                }
            } else {
                let modProducts = {
                    ...this.products[i],
                    ...actualizar
                }
                this.products[i] = modProducts;
                this.saveProducts(this.products);
                
            }
        } catch (error) {
            console.log(error);
        }
    }     
    async deleteProduct(NumeroId) {
        try {
            await this.getProducts();

            if(this.products.some(element => element.id === NumeroId)){
                let i = this.products.findIndex((element) => {
                    return element.id === NumeroId;
                });
            
                this.products.splice(i, 1);
                await this.saveProducts(this.products)
                return;
            }else{
                console.log("Error: No existente");
            }
        } catch (error) {
            console.log(error);
        }
    }
    async saveProducts(elements){
        try {
            const productsJS = JSON.stringify(elements);
            await fs.promises.writeFile(this.path, productsJS);
        } catch (error) {
            console.log(error);
        }
    }
}

/*Prueba*/

const productManager = new ProductManager('./products.json');
const test = async()=>{
    await productManager.addProduct('Celular', 'Motorola', 40000, 'sin imagen', '123', 7);
    await productManager.addProduct('Computadora', 'Lenovo', 100000, 'sin imagen', '456', 14);
    await productManager.addProduct('Parlante', 'Sony', 3000, 'sin imagen', '789', 3);
    await productManager.updateProduct(1, {description: 'Apple', code:'246'});
    await productManager.updateProduct(3, {description: 'Phillips', code:'802'});
    await productManager.deleteProduct(2);
}
test();