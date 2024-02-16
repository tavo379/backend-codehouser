export default function ProductDTO(product) {
  const {
    nombre: title,
    descripcion: description,
    codigo: code,
    precio: price,
    estado: status,
    stock = 0, 
    categoria: category,
    thumbnails = [] 
  } = product;

  return {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  };
}
