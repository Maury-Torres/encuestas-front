import { Form, Button } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alertcustom } from "../../../utils/alertCustom";
import { FormCard } from "../../ui/formcard/FormCard";
import { CategoriasModal } from "../modal/CategoriasModal";
import { CiImageOn } from "react-icons/ci";
import "./CategoriasForm.css";

export const CategoriasForm = () => {
  //! Refactorizar

  const { nombre, descripcion, imagen, handleOnChange, setFormData } = useForm({
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (id) {
        const response = await fetch(
          `http://localhost:3000/api/categorias/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, descripcion, imagen }),
          }
        );

        const data = await response.json();

        if (data?.errors) {
          setErrors(data.errors);
          throw new Error("Error en la petición");
        }

        alertcustom(
          "Categoría editada correctamente",
          "Categoría",
          "info",
          () => {
            setErrors(null);
            setFormData({ nombre: "", descripcion: "", imagen: "" });
            navigate("/categorias");
          }
        );
      }

      const response = await fetch("http://localhost:3000/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, descripcion, imagen }),
      });

      const data = await response.json();

      console.log(data.errors);

      if (data?.errors) {
        setErrors(data.errors);
        throw new Error("Error en la petición");
      }

      alertcustom(
        "Categoría creada correctamente",
        "Categoría",
        "success",
        () => {
          setFormData({ nombre: "", descripcion: "", imagen: "" });
          setErrors(null);
          navigate("/categorias");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const hasError = (path) =>
    errors && !!errors.find((err) => err.path === path);

  const getCategoriaById = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categorias/${id}`
      );
      const categoriaData = await response.json();
      setFormData({
        nombre: categoriaData.nombre,
        descripcion: categoriaData.descripcion,
        imagen: categoriaData.imagen,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getCategoriaById();
    }
  }, []);

  return (
    <FormCard>
      <h2 className="text-center">
        {id ? "Editar Categoria" : "Nueva Categoria"}
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre"
            name="nombre"
            value={nombre}
            onChange={handleOnChange}
            isInvalid={hasError("nombre")}
            className={hasError("nombre") ? "error-input" : ""}
          />
          {hasError("nombre") && (
            <Form.Control.Feedback type="invalid">
              {errors.find((error) => error.path === "nombre").msg}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción"
            value={descripcion}
            name="descripcion"
            onChange={handleOnChange}
            isInvalid={hasError("descripcion")}
            className={hasError("descripcion") ? "error-input" : ""}
          />
          {hasError("descripcion") && (
            <Form.Control.Feedback type="invalid">
              {errors.find((error) => error.path === "descripcion").msg}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="me-3">Imagen</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Ingrese la URL de la imagen"
              value={imagen}
              name="imagen"
              onChange={handleOnChange}
              isInvalid={hasError("imagen")}
              className={`me-3 ${hasError("imagen") ? "error-input" : ""}`}
            />
            <Button variant="info" onClick={handleShow}>
              <CiImageOn />
            </Button>
          </div>
          {hasError("imagen") && (
            <div className="invalid-feedback d-block">
              {errors.find((error) => error.path === "imagen").msg}
            </div>
          )}
        </Form.Group>
        <CategoriasModal
          show={show}
          handleClose={handleClose}
          imagen={imagen}
        />
        <Button variant="primary" type="submit">
          {id ? "Editar categoria" : "Crear categoria"}
        </Button>
      </Form>
    </FormCard>
  );
};
