import React, { useEffect, useState } from "react";
import firebase from "firebase";
import FileUpload from "../FileUpload/FileUpload";
import { Button, Icon } from "rsuite";
import Navmenu from "../../components/Navmenu/Navmenu";

const Login = () => {
  const [user, setUser] = useState(null);

  const handleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  };

  const renderLoginButton = () => {
    if (user) {
      return (
        <div>
          <Navmenu user={user.displayName} photo={user.photoURL} logout={handleLogout} />
          <FileUpload email={user.email} />
        </div>
      );
    } else {
      return (
        <Button color="red" onClick={() => handleAuth()}>
          <Icon icon="google-plus-circle" />
          Login With Google
        </Button>
      );
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return (
    <div>{renderLoginButton()}</div>
  );
};

export default Login;
