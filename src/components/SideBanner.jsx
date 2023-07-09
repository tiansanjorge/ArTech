// export const SideBanner = () => {
    
//     return  <div>
//                 <div className="d-none d-lg-flex flex-column justify-content-around h-100">
//                     <a className="my-5 mx-auto" href="https://www.youtube.com/watch?v=UE8D0yxY72w&ab_channel=sacde">
//                         <img className="img-fluid my-1" src="../img/publicidadV2.gif" alt="SACDE" />
//                     </a>
//                     <a className="my-5 mx-auto" href="https://www.pami.org.ar/">
//                         <img className="img-fluid"  src="../img/publicidadV1.jpeg"  alt="PAMI" />
//                     </a>
//                 </div>
//                 <div className="d-flex d-lg-none justify-content-around h-100">
//                     <a  href="https://www.pami.org.ar/">
//                         <img className="img-fluid my-1" src="../img/publicidadH1.gif" alt="PAMI" />
//                     </a>
//                 </div>
//             </div>
// }

export const SideBanner = () => {
    return (
        <div>
            <div className="d-none d-lg-flex flex-column justify-content-around h-100">
                <a className="my-5 mx-auto" href="https://www.youtube.com/watch?v=UE8D0yxY72w&ab_channel=sacde" target="_blank">
                    <img className="img-fluid my-1" src="../img/publicidadV2.gif" alt="SACDE" />
                </a>
                <a className="my-5 mx-auto" href="https://www.pami.org.ar/" target="_blank">
                    <img className="img-fluid"  src="../img/publicidadV1.jpeg"  alt="PAMI" />
                </a>
            </div>
            <div className="d-flex d-lg-none justify-content-around h-100">
                <a href="https://www.pami.org.ar/" target="_blank">
                    <img className="img-fluid my-1" src="../img/publicidadH1.gif" alt="PAMI" />
                </a>
            </div>
        </div>
    );
}