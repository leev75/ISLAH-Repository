import { useAuth } from "@/app/hook/useAuth";
import Link from "next/link";

function ReportElement() {
  const { isLoggedIn } = useAuth(); // Corrected hook usage

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 p-5">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        {isLoggedIn() ? ( // Corrected conditional rendering
          <>
            <div
              className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column right-box"
              style={{ background: "#fff" }}
            >
              <div className="featured-image mb-3">
                <img
                  src="public/imgs/reportpage.svg"
                  className="img-fluid"
                  style={{ width: "250px" }}
                  alt="Report Page Visual"
                />
              </div>
              <p
                className="text-success fs-2"
                style={{
                  fontFamily: '"IBM Plex Sans Arabic", Courier, monospace',
                  fontWeight: 600,
                }}
              >
                إبلاغ
              </p>
            </div>
            <div className="col-md-6 left-box py-2">
              <div
                className="row align-items-center"
                style={{ direction: "rtl" }}
              >
                <div className="header-text mb-4">
                  <h2>بلغ و شارك في إيجاد الحلول</h2>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="form-control form-control-lg bg-light fs-6"
                    id="problemType"
                    name="problemType"
                    required
                  >
                    <option value="">الجهات المعنية</option>
                    <option value="option1">سونالغاز</option>
                    <option value="option2">الجزائرية للمياه</option>
                    <option value="option3">الديوان الوطني للتطهير</option>
                    <option value="option4">إتصالات الجزائر</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="url"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="الموقع"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="أضف صورة"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <textarea
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="الوصف"
                    rows={3}
                  />
                </div>
                <div className="input-group mb-3">
                  <button className="btn btn-lg btn-success w-100 fs-6">
                    تأكيد
                  </button>
                </div>
                <div className="row">
                  <small>
                    ليس لديك حساب؟{" "}
                    <Link href="/signup">
                      <a className="link-success">سجل</a>
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <h1>You need to be logged in first.</h1>
            <Link href="/login-user">
              <a>here</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportElement;
