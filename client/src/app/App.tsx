import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateSchema } from "./providers/store";
import { AdditionalService, ApiError, AuthService, UsersService } from "../shared/api";
import { USER_ACCESS_TOKEN_KEY, userActions } from "../entities/User";
import { appActions } from "../entities/App/slice/appSlice";
import Layout from "./Layout";
import "./App.css"
// import { logActions } from "../entities/Log/slice/logSlice";
import { user } from "../telegram";
import { additionalActions } from "../entities/Additional/slice/additionalSlice";


function App() {
  const dispatch = useDispatch();

  const {authorization} = useSelector(
    (state: StateSchema) => state.user
  );

  const updateUserPhoto = async () => {
    if (!user.photo_url)
      return

    try {
      await UsersService.updateUserPhotoApiV1P2PUserUpdateUserPhotoPost(
        authorization,
        { photo_url: user.photo_url }
      )
      console.log("user photo updated");
    } catch (error) {
      console.error("Update user photo failed:", error);
    }
  }

  const authUser = async () => {
    try {
      const response = await AdditionalService.getTransactionCurrencyTypesApiV1P2POtherTransactionCurrencyTypesGet()
      dispatch(additionalActions.setCurrencyTypes(response))
      console.log("Got currency types");
    } catch (error) {
      console.error("Get currency types failed:", error);
    }
    try {
      const response = await AdditionalService.getCategoriesApiV1P2POtherCategoriesGet()
      dispatch(additionalActions.setCategories(response))
      console.log("Got categories");
    } catch (error) {
      console.error("Get categories failed:", error);
    }
    
    
    if (authorization) {
      try {
        const response = await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)
        dispatch(userActions.initAuthorization());
        dispatch(userActions.setUserData(response));
        dispatch(appActions.setIsLoading(false));
        await updateUserPhoto()
        console.log("old auth + data done")
        return        
      } catch (error) {
        if ((error as ApiError).status === 422) { // if auth invalid => remove and create new by going further
          localStorage.removeItem(USER_ACCESS_TOKEN_KEY)
          dispatch(userActions.setAuthorization(""));
        }
        else {
          console.error("Main data retrieving failed:", error);
          dispatch(appActions.setError((error as ApiError).message))
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
        dispatch(appActions.setIsLoading(false));
        await updateUserPhoto()
        console.log("data done");
      } catch (error) {
        console.error("Main data retrieving failed:", error);
        dispatch(appActions.setError((error as ApiError).message))
      }

    } catch (error) { 
      console.error("Authentication failed:", error);
      dispatch(appActions.setError((error as ApiError).message))
    }
  };

  
  const initStarted = useRef(false)
  useEffect(() => { // *Runs twice on dev on start with <StrictMode>
    if (!initStarted.current) {
      initStarted.current = true
      console.log("start auth");
      authUser();

      //override console.log
      // const oldLog = console.log
      // console.log = (message) => {
      //   dispatch(logActions.addLog(message ?? ""))
      //   oldLog(message)
      // }
    }
  }, [])

  return <Layout /> ;
}

export default App;
