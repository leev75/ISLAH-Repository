import { Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import styles from "@/public/css/all.css/style.css";

function Home() {
  return (
    <>
      <section
        id="hero"
        className="bg-white text-dark text-center text-sm-end p-5"
      >
        <div className="d-sm-flex flex-row-reverse align-items-center justify-content-center ">
          <div>
            <h1>
              مع <span className="text-success">إصلاح</span>{" "}
            </h1>
            <h1 className="py-3 ">
              نسعى إلى تكوين مجتمع حيوي يتميز بمشاركة مدنية فاعلة على نطاق واسع.{" "}
            </h1>
            <p className="p-2 lead">
              يمكنكم الان رفع تقاريركم حول مشاكل تخص الأماكن العمومية ، و متابعة
              حلها مع الجهات المعنية
            </p>
            <button className="btn btn-success">انضم إلينا الأن </button>
          </div>
          <div>
            <Image
              src="/imgs/homepagepic2.svg"
              alt=""
              width={400} // add width and height attributes
              height={300}
            />
          </div>
        </div>
      </section>
      {/*Services*/}
      <div className="cards  ">
        <div className=" text-center">
          <h1 className="py-3">خدماتنا</h1>
          <p className="p-2">كيف تساهم منصة إصلاح في حل مشاكل المجتمع</p>
        </div>
      </div>
      <section className="py-5 text-center ">
        <div className="container  ">
          <div className="row text-center gy-3">
            <div className="col-sm-4 d-flex justify-content-center align-items-center">
              <div className="card h-100 w-100">
                <Image
                  src="/imgs/people.svg"
                  className="card-img-top"
                  alt="..."
                  width={100} // add width and height attributes
                  height={100}
                />
                <div className="card-body">
                  <p className="card-text">المشاركة المجتمعية</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 d-flex justify-content-center align-items-center">
              <div className="card h-100 w-100">
                <Image
                  src="/imgs/solve2.svg"
                  className="card-img-top"
                  alt="..."
                  width={100} // add width and height attributes
                  height={100}
                />
                <div className="card-body">
                  <p className="card-text">متابعة حل المشاكل</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 d-flex justify-content-center align-items-center">
              <div className="card h-100 w-100">
                <Image
                  src="/imgs/report2.svg"
                  className="card-img-top"
                  alt="..."
                  width={100} // add width and height attributes
                  height={100}
                />

                <div className="card-body">
                  <p className="card-text">الإبلاغ عن المشاكل</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="p-5"></div>
      <div className="p-5"></div>
      {/*sponsors*/}
      <div className="">
        <h1
          className="p text-success text-center"
          style={{
            fontSize: 30,
            fontFamily: '"IBM Plex Sans Arabic"',
            fontWeight: 500,
          }}
        >
          {" "}
          هذا العمل بمساعدة
        </h1>
      </div>
      <div className="p-5 row justify-content-center ">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide p-5"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={3}
              aria-label="Slide 0"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval={10000}>
              <Image
                src="/imgs/sponsors/sonalgaz.svg"
                className="d-block mx-auto carousel-img"
                alt="Sonalgaz"
                width={100} // add width and height attributes
                height={100}
              />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            <div className="carousel-item" data-bs-interval={2000}>
              <Image
                src="public/imgs/sponsors/ade.svg"
                className="d-block mx-auto carousel-img "
                alt="ADE"
                width={100} // add width and height attributes
                height={100}
              />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            <div className="carousel-item" data-bs-interval={2000}>
              <Image
                src="public/imgs/ona.svg"
                className="d-block mx-auto carousel-img "
                alt="ONA-dz"
                width={150} // add width and height attributes
                height={150}
              />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            <div className="carousel-item">
              <Image
                src="public/imgs/sponsors/algerie-tele.svg"
                className="d-block mx-auto carousel-img "
                alt="ALGERIE TELECOM"
                width={180} // add width and height attributes
                height={180}
              />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
