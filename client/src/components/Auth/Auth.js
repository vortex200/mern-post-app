import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Container from "react-bootstrap/Container";

function Auth() {
  const { state } = useContext(AuthContext);

  return state.isLoading ? (
    <div></div>
  ) : (
    <Container>
      <p>Auth page</p>
      <div>
        <p>States:</p>
        {state.isAuth ? (
          <div>
            <p>Logged in</p>
            <ul>
              <li>{state.user._id}</li>
              <li>{state.user.email}</li>
              <li>{state.user.password}</li>
              <li>{state.user.token}</li>
            </ul>
          </div>
        ) : (
          "Not logged in"
        )}
      </div>
    </Container>
  );
}

export default Auth;
