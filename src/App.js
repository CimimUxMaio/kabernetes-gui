import Configuration from "./components/Configuration.js";
import Stats from "./components/Stats.js";
import Axios from "axios";
import config from "./config.json";
import { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import StartClientForm from "./components/StartClientForm.js";
import CustomSpinner from "./components/CustomSpinner.js";


const MAX_LENGTH = 30;

const cloneAndConcat = (array, value) => {
  if (array.length === MAX_LENGTH)
    return array.slice(1).concat(value);

  return [...array, value];
};

const App = () => {
  const [clientHistory, setClientHistory] = useState([]);
  const [timer, setTimer] = useState(0);
  const [xs, setXS] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var isMounted = true;

    const getData = () => {
      const reqConfig = {
        method: "GET",
        url: `http://${config.backend.host}:${config.backend.port}/client`
      }

      Axios.request(reqConfig).then(response => {
        const responseData = response.data;
        setClientHistory(clientHistory => cloneAndConcat(clientHistory, responseData));
      }).catch(error => {
        if (clientHistory !== []) setClientHistory([]);
      });
    };

    const dataRate = 1; // Cada 3s
    const interval = setInterval(() => {
      if (isMounted) {
        getData();
        setTimer(timer => timer + dataRate);
        setXS(xs => [...xs, timer])
      }
    }, dataRate * 1000);

    return () => { clearInterval(interval); isMounted = false; }
  }, [clientHistory, timer]);

  if (loading) return <CustomSpinner/>;
  if (clientHistory.length === 0) return <StartClientForm setLoading={setLoading}/>;

  return (
    <div>
      <Tabs defaultActiveKey="configuracion" transition={false}>
        <Tab eventKey="configuracion" title="Configuracion">
          <Configuration setLoading={setLoading} client={clientHistory[clientHistory.length -1]}/>
        </Tab>
        <Tab eventKey="metricas" title="Metricas">
          <Stats setLoading={setLoading} time={xs} clientHistory={clientHistory}/>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
