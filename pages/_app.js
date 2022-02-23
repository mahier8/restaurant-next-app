import Layout from "../component/Layout";
import "../styles/globals.css";
// we import the provider
import store from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    // we wrap the provider around the entire layout (app)
    // then pass the store in as a prop
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
