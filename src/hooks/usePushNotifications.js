import axios from "axios";
import { useEffect, useState } from "react";
import { url_base_local } from "../api/env";

const usePushNotifications = () => {
  const PUBLIC_VAPID_KEY =
    "BMGolCxM9VzfOrUpXm0WQSBlM-Tprx028A0R4mabf1mSwC09JDcCFrBF3pAb-OXntGq_pCwLOMd6xf4CnvBFoM0";

  const [subscriptionState, setSubscriptionState] = useState(null);

  /**
   * Suscribirse al webpush del server.
   */
  const subscriptions = async () => {
    //registramos nuestro serviceWorker (sw.js)
    const register = await navigator.serviceWorker.register(
      process.env.PUBLIC_URL + "/sw.js",
      {
        scope: "/",
      }
    );

    //creamos nuestra peticion de suscripcion
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PUBLIC_VAPID_KEY,
    })

    //mandamos a nuestro endpoint nuestro peticion de subscription
    const options = {
      method: "POST",
      url: url_base_local + "subscription",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(subscription),
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          setSubscriptionState(response.data);
        }
      })
      .catch((err) => {
        console.error("Error al pedir suscripcion:", err);
      });
  };

  useEffect(() => {
    subscriptions();
  }, []);

  return {
    subscriptionState,
  };
};

export default usePushNotifications;
