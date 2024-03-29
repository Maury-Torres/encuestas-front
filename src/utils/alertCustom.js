import Swal from "sweetalert2";


export const alertcustom = (text, title, icon, action) => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonColor: "#3085d6",
    }).then((result) => {
        if (result.isConfirmed) {
            if (typeof action === 'function') {
                action();
            }
        }
    });
}