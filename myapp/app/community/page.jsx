"use client";
import { useAuth } from "../hook/useAuth";
import CustomLayout from "./component/CustomLayout";
import PlaceContainer from "./component/Placeholder";
import { Link } from "react-router-dom"; // add this line

function Page() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <CustomLayout />
  ) : (
    // Login prompt if not logged in
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10 col-md-10 ">
          <div className="border rounded-5 p-3 p-lg-5 bg-white text-center shadow">
            <h2>يجب تسجيل الدخول للإبلاغ عن المشكل</h2>
            <div className="featured-image mb-3">
              <img // change 'image' to 'img'
                src={url}
                className="img-fluid"
                alt="Description"
                style={{ maxWidth: "200px" }}
                width={200}
                height={200}
              />
            </div>
            <div>
              <small>
                ليس لديك حساب,{" "}
                <Link className="link-success" to="/login-user">
                  {" "}
                  // change 'href' to 'to' سجل من هنا
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
