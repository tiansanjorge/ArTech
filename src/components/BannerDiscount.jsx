const BannerDiscount = () => {

    return <div className="col-11 shadow-sm d-flex flex-column justify-content-around my-3 mx-auto py-3 rounded bg-yellow ">
                <h4 className="d-none d-md-block"><b> Llevando 3 productos iguales : 25% de descuento en una unidad</b></h4>
                <h5 className="d-none d-md-block m-0">* No acumulable en un mismo producto</h5>
                <h5 className="d-block d-md-none"><b> Llevando 3 productos iguales : 25% de descuento en una unidad</b></h5>
                <p className="d-block d-md-none m-0">* No acumulable en un mismo producto</p>
            </div>
}

export default BannerDiscount;