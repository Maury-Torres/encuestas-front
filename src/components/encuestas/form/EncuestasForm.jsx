import { useEffect, useState } from "react";
import { FormCard } from "../../ui/formcard/FormCard";
import { useEncuestas } from "../../../context/EncuestaContext";
import { Form, Button, Card } from "react-bootstrap";
import { alertcustom } from "../../../utils/alertCustom.js";
import { useNavigate } from "react-router-dom";

export const EncuestasForm = () => {
  const { createEncuesta, errors, setErrors } = useEncuestas();
  const navigate = useNavigate();

  const [formData, setFormData] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categorias, setCategorias] = useState("");
  const [categoriasData, setCategoriasData] = useState([]);

  // TODO Agregar validaciones para las preguntas y respuestas
  // TODO Agregar para editar la encuesta
  //! Refactorizar el código

  const handleOnClickNewFormData = () => {
    setFormData((prevState) => [
      ...prevState,
      {
        id: Math.random(),
        pregunta: "",
        respuestas: [],
      },
    ]);
  };

  const handleOnClickRespuestas = (id) => {
    setFormData((prevState) => {
      const newData = prevState.map((data) => {
        if (data.id == id) {
          return {
            ...data,
            respuestas: [
              ...data.respuestas,
              {
                id: Math.random(),
                respuesta: "",
              },
            ],
          };
        }
        return data;
      });
      return newData;
    });
  };

  const handleOnChangePreguntas = (e) => {
    const { value, id } = e.target;
    setFormData((prevState) => {
      const newData = prevState.map((data) => {
        if (data.id == id) {
          return {
            ...data,
            pregunta: value,
          };
        }
        return data;
      });
      return newData;
    });
  };

  const handleOnChangeRespuesta = (e) => {
    const { value, id } = e.target;
    setFormData((prevState) => {
      const newData = prevState.map((data) => {
        if (data.respuestas.some((respuesta) => respuesta.id == id)) {
          return {
            ...data,
            respuestas: data.respuestas.map((respuesta) => {
              if (respuesta.id == id) {
                return {
                  ...respuesta,
                  respuesta: value,
                };
              }
              return respuesta;
            }),
          };
        }
        return data;
      });
      return newData;
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createEncuesta({
        nombre,
        descripcion,
        preguntas: formData,
        categoria: categorias,
        available: true,
      });

      if (response) {
        alertcustom("", "Encuesta creada correctamente", "success", () => {
          setErrors(null);
          setNombre("");
          setDescripcion("");
          setFormData([]);
          navigate(`/encuestas/categoria/${categorias}`);
          setCategorias("");
        });
      }
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categorias", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        setCategoriasData(data.categorias);
      } catch (error) {
        console.log(error);
      }
    };
    getCategorias();
  }, []);

  const hasError = (path) =>
    errors && !!errors.find((err) => err.path === path);

  return (
    <FormCard>
      <h1>Nueva encuesta</h1>
      <Card.Body className="d-flex flex-column align-items-center gap-5">
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
            <Form.Control
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
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
            <Form.Select
              value={categorias}
              onChange={(e) => setCategorias(e.target.value)}
              isInvalid={hasError("categoria")}
              className={hasError("categoria") ? "error-input" : ""}
            >
              <option>Selecciona una categoría</option>
              {categoriasData.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
            {hasError("categoria") && (
              <Form.Control.Feedback type="invalid">
                {errors.find((error) => error.path === "categoria").msg}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button
            variant="warning w-100 mb-2"
            onClick={handleOnClickNewFormData}
          >
            Agregar pregunta
          </Button>

          {formData.map((data) => (
            <div key={data.id}>
              <Form.Group className="d-flex mb-3">
                <Form.Control
                  type="text"
                  placeholder="Ingresa la pregunta"
                  id={data.id}
                  name={data.pregunta}
                  onChange={handleOnChangePreguntas}
                />

                <Button
                  variant="info"
                  className="fs-3 mx-2"
                  onClick={() => handleOnClickRespuestas(data.id)}
                >
                  +
                </Button>
              </Form.Group>

              {data.respuestas.map((respuesta) => (
                <Form.Group className="mb-3" key={respuesta.id}>
                  <Form.Control
                    type="text"
                    key={respuesta.id}
                    id={respuesta.id}
                    value={respuesta.respuesta}
                    onChange={handleOnChangeRespuesta}
                    placeholder="Ingresa tu respuesta"
                  />
                </Form.Group>
              ))}
            </div>
          ))}

          <Button variant="primary" type="submit">
            Crear encuesta
          </Button>
        </Form>
      </Card.Body>
    </FormCard>
  );
};
