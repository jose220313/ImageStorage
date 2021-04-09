import React, { useState } from "react";
import firebase from "firebase";
import "./FileUpload.styles.css";
import { Uploader, Button, Progress, Icon } from "rsuite";

const FileUpload = ({ email }) => {
  const [imagesCharged, setImagesCharged] = useState([]);
  const [uploadValue, setUploadValue] = useState(0);
  const [imagesUpload, setImagesUpload] = useState(0);
  const { Line } = Progress;

  const handleChange = (value) => {
    value.map((e) => {
      return (e.percentage = 0);
    });
    setImagesCharged(value);
  };

  const handleUpload = (images) => {
    let count = 0;
    for (let i = 0; i < images.length; i++) {
      const element = images[i].blobFile;

      const storageRef = firebase
        .storage()
        .ref(`${email}/pictures/${element.name}`);

      const task = storageRef.put(element);
      task.on(
        "state_changed",
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadValue(percentage);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          count = count + 1;
          setUploadValue(100);
          setImagesUpload(count);
        }
      );
    }
  };

  return (
    <div className="box-items">
      {imagesCharged.length === 0 ? (
        ""
      ) : (
        <div>
          <center>
            {imagesUpload !== imagesCharged.length ? (
              <div style={{ margin: "15px" }}>
                {imagesUpload > 0 ? 'Cargando...' : ''}<br />
                <progress value={uploadValue} max="100"></progress> <br />
                <Icon icon="file-upload" /> Se subiran {imagesCharged.length}{" "}
                imagenes{" "}
              </div>
            ) : (
              <div style={{ margin: "15px" }}>
                <Icon
                  style={{ color: "green", fontSize: "25px" }}
                  icon="check-circle"
                />
                <p>Listo</p>
                <p>Subir mas imagenes</p>
              </div>
            )}
          </center>
        </div>
      )}

      <Uploader
        className="uploader-box"
        multiple
        listType="picture-text"
        autoUpload={false}
        draggable
        onChange={handleChange}
        removable={imagesUpload > 0 ? false : true}
      >
        <div style={{ lineHeight: "100px" }}>
          Presiona o arrastra tus imagenes
        </div>
      </Uploader>

      <br />
      {imagesCharged.length === 0 ? (
        ""
      ) : (
        <div>
          {imagesUpload === imagesCharged.length ? (
            ""
          ) : (
            <Button
              color="cyan"
              appearance="ghost"
              onClick={() => handleUpload(imagesCharged)}
              disabled={imagesUpload > 0 ? true : false}
            >
              Guardar
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
