import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AdditionalService, ApiError, AuthService, UsersService } from "../shared/api";
import { selectAuthorization, userActions } from "../entities/User";
import { appActions } from "../entities/App/slice/appSlice";
import Layout from "./Layout";
import "./App.css"
// import { logActions } from "../entities/Log/slice/logSlice";
import { user } from "../index";
import { additionalActions } from "../entities/Additional/slice/additionalSlice";
import { useAppSelector } from "./providers/store";


function App() {
  const dispatch = useDispatch();

  const authorization = useAppSelector(selectAuthorization);

  const updateUserPhoto = async () => {
    if (!user?.photo_url)
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

  const loadAdditionalData = async () => {
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

    try {
      const response = await AdditionalService.getCategoriesApiV1P2POtherUserAcquisitionTypeGet() //TODO после generate api обновить
      dispatch(additionalActions.setUserAcquisitionType(response))
      console.log("Got user acquisition types");
    } catch (error) {
      console.error("Get user acquisition types failed:", error);
    }
  }

  const authUser = async () => {
    // if (import.meta.env.DEV && authorization) {
    //   try {
    //     const response = await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)
    //     dispatch(userActions.setUserData(response));
    //     console.log("old auth + data done")
    //     return true
    //   } catch (error) {
    //       dispatch(appActions.setErrorMessage("Не удалось загрузить данные пользователя"))
    //       return false
    //   }
    // }
    
    if (!window.Telegram.WebApp.initDataUnsafe.user || !window.Telegram.WebApp.initDataUnsafe.user.username) {
      dispatch(appActions.setNoTgData(true))
      return false
    }

    if (authorization) {
      try {
        const response = await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)
        dispatch(userActions.setUserData(response));
        console.log("old auth + data done")
        return true
      } catch (error) {
        if ((error as ApiError).status === 422) { // if auth invalid => remove and create new by going further
          dispatch(userActions.setAuthorization(""));
        }
        else {
          console.error("Main data retrieving failed:", error);
          dispatch(appActions.setErrorMessage("Не удалось загрузить данные пользователя"))
          return false
        }
      }
    }
    
    try {
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
      dispatch(userActions.setAuthorization(token));
      console.log("new auth done")
      try {
        const response = await UsersService.getUserMainDataApiV1P2PUserMainDataGet(token)
        dispatch(userActions.setUserData(response));
        console.log("data done");
      } catch (error) {
        console.error("Main data retrieving failed:", error);
        dispatch(appActions.setErrorMessage("Не удалось загрузить данные пользователя"))
        return false
      }

    } catch (error) { 
      console.error("Authentication failed:", error);
      dispatch(appActions.setErrorMessage("Не удалось аутентифицироваться"))
      return false
    }

    return true
  }

  const initApp = async () => {
    if (!await authUser())
      return
    await updateUserPhoto()
    await loadAdditionalData()
    dispatch(appActions.setIsLoading(false));
  };

  
  const initStarted = useRef(false)
  useEffect(() => { // *Runs twice on dev on start with <StrictMode>
    if (!initStarted.current) {
      initStarted.current = true
      console.log("start auth");
      initApp();
    }
  }, [])

  return <Layout /> ;
}

export default App;
