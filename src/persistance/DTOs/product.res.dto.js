export default function ProductResDTO(product) {
    const { title: nombre, price: precio, stock: disponibilidad } = product;
    return { nombre, precio, disponibilidad };
}
