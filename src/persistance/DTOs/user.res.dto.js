export default function currentUserResDTO(users) {
    const { first_name: nombre, last_name: apellido, email: correo_electronico, role: rol } = users;
    return { nombre, apellido, correo_electronico, rol };
}
