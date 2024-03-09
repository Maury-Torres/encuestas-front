import propTypes from "prop-types";
import { Select } from "../../ui/select/Select";
import { SelectCategorias } from "../categorias/SelectCategorias";

export const ABMFiltros = ({
  orderByDate,
  handleOrderByDate,
  orderByCategory,
  handleOrderByCategory,
}) => {
  return (
    <>
      <div className="d-flex align-items-center gap-3">
        {/* <input
          type="search"
          name="abmBuscador"
          id="abmBuscador"
          placeholder="Buscar..."
          className="form-control mt-3 mb-3 text-center bg-white bg-opacity-75 border-secondary text-black"
        /> */}
        <div>
          <p className="text-center">Ordenar por:</p>
          <Select
            name="order"
            id="order"
            value={orderByDate}
            className="mb-3 bg-white bg-opacity-75 border-secondary text-black mt"
            onChange={(e) => handleOrderByDate(e.target.value)}
          >
            <option disabled value="">
              Fecha de creación
            </option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </Select>
        </div>
        <div>
          {" "}
          <p className="text-center">Filtrar por:</p>
          <SelectCategorias
            orderByCategory={orderByCategory}
            handleOrderByCategory={handleOrderByCategory}
          />
        </div>
      </div>
    </>
  );
};

ABMFiltros.propTypes = {
  orderByDate: propTypes.string.isRequired,
  handleOrderByDate: propTypes.func.isRequired,
  orderByCategory: propTypes.string.isRequired,
  handleOrderByCategory: propTypes.func.isRequired,
};
