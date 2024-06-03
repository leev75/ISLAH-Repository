import { Image } from "react-bootstrap";

function comType({ managerCategory }) {
  return (
    <div>
      {managerCategory === "Electricity / Gaz" ? (
        <Image
          src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717359115/Logo_Sonelgaz_m1jgev.png"
          width={80}
          height={60}
        />
      ) : managerCategory === "Telecominication" ? (
        <Image
          src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717359115/TC_njflg0.png"
          width={80}
          height={60}
        />
      ) : managerCategory === "ONA" ? (
        <Image
          src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717359115/ONA_yn0zso.jpg"
          width={80}
          height={60}
        />
      ) : managerCategory === "Water" ? (
        <Image
          src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717359115/water_ctgcks.jpg"
          width={80}
          height={60}
        />
      ) : (
        <Image />
      )}
    </div>
  );
}
export default comType;
