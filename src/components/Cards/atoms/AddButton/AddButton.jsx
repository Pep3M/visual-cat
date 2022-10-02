import "./addButon.css";
import { connect } from "react-redux";
import { setPeliSelection, deletePeliSelection } from "../../../../store/actions";

const AddButton = (props) => {
  const { nombre, img, data, pelis, setPeliSelection, deletePeliSelection} = props;

  const isActive = pelis.some(peli => peli.Nombre === nombre)
  
  const handleClicked = (e) => {
    if (isActive) {
      deletePeliSelection({
        Nombre: nombre, 
        Imagen: img
      });
    } else {
      setPeliSelection({
        Nombre: nombre,
        Size: data.Size
      })
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: "5px",
        cursor: "pointer",
        borderRadius: "50%",
        outlineWidth: 0,
      }}
    >
      <button type="submit" className={isActive ? "sf-btn added" : "sf-btn add"} onClick={handleClicked}>
        <div className="icn-sf">
          <span className="line line-1"></span>
          <span className="line line-2"></span>
        </div>
        <div className="loader"></div>
      </button>
    </div>
  );
};

const mapStoreToProps = (state) => ({
  pelis: state.pelis,
});

const mapDispatchToProps = {
  setPeliSelection,
  deletePeliSelection,
}

export default connect(mapStoreToProps, mapDispatchToProps)(AddButton);
