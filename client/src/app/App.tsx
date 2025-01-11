import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StateSchema } from "./providers/store";
import { AuthService } from "../shared/api";
import { USER_ACCESS_TOKEN_KEY, userActions } from "../entities/User";
import Layout from "./Layout";


function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { authorization, _initialized } = useSelector(
    (state: StateSchema) => state.user
  );

  const authUser = async () => {
    try {
      const response = await AuthService.postAuthApiV1P2PAuthPost({
        init_data_raw: {
          auth_date: new Date().toISOString(),
          hash: "hash_string",
          query_id: "query_id_string",
          user: {
            first_name: "John",
            id: "user_id",
            is_premium: false,
            username: "john_doe",
          },
        },
        init_ton: {
          address: "address_string",
          signature: "signature_string",
        },
        auth_type: "telegram",
      });

      const token = `Bearer ${response.access_token}`;
      localStorage.setItem(USER_ACCESS_TOKEN_KEY, token);
      dispatch(userActions.setAuthorization(token));
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  useEffect(() => {
    if (!authorization) {
      authUser();
    }
  }, [authorization]);

  useEffect(() => {
    // Log out user if token is removed or invalid
    return () => {
      localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
      dispatch(userActions.setAuthorization(""));
    };
  }, []);

  return _initialized ? <Layout /> : <div>Loading...</div>;
}

export default App;
