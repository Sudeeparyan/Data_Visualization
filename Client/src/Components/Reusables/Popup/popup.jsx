import React, { useState } from "react";
import { Button, Modal } from "antd";
const Popup = () => {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      ></Modal>
    </>
  );
};
export default Popup;
