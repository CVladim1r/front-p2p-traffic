import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateSchema } from "./providers/store";
import { ApiError, AuthService, UsersService } from "../shared/api";
import { USER_ACCESS_TOKEN_KEY, userActions } from "../entities/User";
import Layout from "./Layout";
import "./App.css"


function App() {
  const dispatch = useDispatch();

  const {authorization, _initialized} = useSelector(
    (state: StateSchema) => state.user
  );

  const authUser = async () => {
    if (authorization) {
      try {
        const response = await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)
        dispatch(userActions.initAuthorization());
        dispatch(userActions.setUserData(response));
        console.log("old auth + data done")
        return        
      } catch (error) {
        if ((error as ApiError).status === 422) { // if auth invalid => remove and create new by going further
          localStorage.removeItem(USER_ACCESS_TOKEN_KEY)
          dispatch(userActions.setAuthorization(""));
        }
        else {
          console.error("Request failed:", error);
          dispatch(userActions.setUserError((error as ApiError).message))
        }
      }
    }
    
    try {
      if (!window.Telegram.WebApp.initDataUnsafe.user || !window.Telegram.WebApp.initDataUnsafe.user.username)
        throw new Error("No user data");
        
      const response = await AuthService.postAuthApiV1P2PAuthPost({
        init_data_raw: {
          auth_date: new Date().toISOString(),
          hash: window.Telegram.WebApp.initDataUnsafe.hash,
          query_id: window.Telegram.WebApp.initDataUnsafe.query_id,
          user: {
            first_name: window.Telegram.WebApp.initDataUnsafe.user.first_name,
            id: window.Telegram.WebApp.initDataUnsafe.user.id,
            is_premium: window.Telegram.WebApp.initDataUnsafe.user.is_premium ?? false,
            username: window.Telegram.WebApp.initDataUnsafe.user.username,
          },
        },
        init_ton: {
          address: "address_string",
          signature: "full",
        },
        auth_type: "telegram",
      });
      
      const token = `Bearer ${response.access_token}`;
      localStorage.setItem(USER_ACCESS_TOKEN_KEY, token);
      dispatch(userActions.initAuthorization());
      console.log("new auth done")
      
      try {
        const response = await UsersService.getUserMainDataApiV1P2PUserMainDataGet(token)
        dispatch(userActions.setUserData(response));
        console.log("data done");
      } catch (error) {
        console.error("Main data retrieving failed:", error);
        dispatch(userActions.setUserError((error as ApiError).message))
      }

    } catch (error) {
      console.error("Authentication failed:", error);
      dispatch(userActions.setUserError((error as ApiError).message))
    }
  };

  useEffect(() => { // *Runs twice on dev on start with <StrictMode>
    console.log("start auth");
    authUser();
  }, [])

  return _initialized ? <Layout /> : <div>Loading...</div>;
}

export default App;
