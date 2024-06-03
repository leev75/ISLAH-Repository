import Toast from "react-bootstrap/Toast";

function ContextualExample() {
  return (
    <>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Algerian GOV</strong>
          <small>1 scond ago</small>
        </Toast.Header>
        <Toast.Body>
          لقد حدثت العديد من القضايا في جميع أنحاء الجزائر بالضبط في الجانب
          الأوسط
        </Toast.Body>
      </Toast>
    </>
  );
}

export default ContextualExample;
