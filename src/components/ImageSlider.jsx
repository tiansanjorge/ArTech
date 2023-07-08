import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ImageSlider = ({ slides, loading }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getImageUrlBySize = (slide) => {
        if (windowSize >= 768) {
            return slide.url;
        } else {
            return slide.smUrl;
        }
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const slideBackgroundStyle = {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${getImageUrlBySize(slides[currentIndex])})`
    };

    return (

        <div>
            {loading ? "" :
                <div className="slider position-relative mt-3 mb-4 mx-2">

                    <div>
                        <div className="sliderLeftArrow position-absolute top-50 size45 pointer hover3" onClick={goToPrevious} >
                            ❰
                        </div>
                        <div className="sliderRightArrow position-absolute top-50 size45 pointer hover3" onClick={goToNext}>
                            ❱
                        </div>
                    </div>

                    <Link to={slides[currentIndex].href}><div className="w-100 h-100 rounded" style={slideBackgroundStyle}></div></Link>
                    <div className="d-flex justify-content-center">
                        {slides.map((slide, slideIndex) => (
                            <div className={`mx-2 size20 pointer hover6 ${slideIndex === currentIndex ? "text-blue" : ""}`}
                                key={slideIndex}
                                onClick={() => goToSlide(slideIndex)}
                            >
                                ●
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>

    );
};

export default ImageSlider;