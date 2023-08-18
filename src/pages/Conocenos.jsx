import "bootstrap/dist/css/bootstrap.min.css";

export const Conocenos = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide carousel-light">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://res.cloudinary.com/erlandruiz/image/upload/v1692396814/u2ggr2ad5ac6afqwrana.jpg"
            className="d-block w-100 imgConocenos"
            alt="..."
          />
          <div className="carousel-caption">
          <h5 className="tituloParrafo">Clientes de la industria Minera</h5>
            <p className="parrafoConocenos">
              La minería, como actividad económica, ha jugado un papel
              preponderante desde los orígenes de la humanidad, a partir de que
              el hombre comenzó a desarrollarla para elaborar herramientas que
              mejoraran su calidad de vida y permitieran su subsistencia..
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://res.cloudinary.com/erlandruiz/image/upload/v1692396834/cdkopspd5rcgjnnvpevl.jpg"
            className="d-block w-100 imgConocenos"
            alt="..."
          />
          {/* d-none d-md-block */}
          <div className="carousel-caption  ">
            <h5 className="tituloParrafo">Clientes de la industria Petrolera</h5>
            <p className="parrafoConocenos">Cuando hablamos de industria petrolera nos referimos a aquella encargada de la exploración, extracción, refinación, transporte y comercialización del petróleo.  Es importante mencionar que utiliza técnicas modernas para extraer los minerales de los yacimientos naturales.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://res.cloudinary.com/erlandruiz/image/upload/v1692396825/j4du6ru5cvyw8tgrym5t.jpg"
            className="d-block w-100 imgConocenos"
            alt="..."
          />
          <div className="carousel-caption ">
          <h5 className="tituloParrafo">Clientes de la industria Naviera</h5>
            <p className="parrafoConocenos">La industria naviera y portuaria juega un papel fundamental en la construcción de un modelo de negocio limpio y responsable. Es imprescindible trabajar de manera conjunta y colaborativa para implantar un transporte con cero emisiones en un futuro próximo.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};
