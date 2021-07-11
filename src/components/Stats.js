import Plot from "react-plotly.js";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import appConfig from "../config.json";
import Axios from "axios";

const Stats = ({ xs, clientHistory }) => {
    const [containerAmount, setContainerAmount] = useState(0);
    const [method, setMethod] = useState("POST");
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const onSubmit = (event) => {
        event.preventDefault();

        const reqConfig = {
            method: method,
            data: { amount: containerAmount },
            url: `http://${appConfig.backend.host}:${appConfig.backend.port}/client/containers`
        }
        alert("Se envió la señal");
        Axios.request(reqConfig).then(response => {
          const responseData = response.data;
          console.log("Response: " + responseData);
        }).catch(error => {
          console.log(error.response.data);
          alert(error.response.data);
        });
    };

    const centerStyle = {margin: "1%", display: "flex", justifyContent: "center", alignItems: "center"};

    const current = clientHistory[clientHistory.length -1];
    const statusColor = (current.status === "READY") ? "green" : (current.status === "DEAD") ? "red" : "blue";
    return (
        <div>
            <Form style={centerStyle} onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Numero de contenedores</Form.Label>
                    <Form.Control type="number" style={{width: "80%"}} onChange={ (event) => setContainerAmount(event.target.value) }/>
                </Form.Group>
                <Form.Group>
                    <Button type="submit" style={{marginRight: "1%"}} variant="success" onClick={() => setMethod("POST")}>Levantar</Button>
                    <Button type="submit" variant="danger" onClick={() => setMethod("DELETE")}>Bajar</Button>
                </Form.Group>
            </Form>
            <span style={centerStyle}>
                <b>Estado del cliente:&ensp;</b>
                <span style={{color: statusColor}}>{current.status}</span>
                &emsp;
                <b>Uso promedio de CPU [%]:&ensp;</b>
                {current.avg_cpu_usage.toFixed(2)}
                &emsp;
                <b>Contenedores activos:&ensp;</b>
                {current.containers}
            </span>
            <Plot
                data={[
                    {
                        x: xs,
                        y: clientHistory.map(data => data.error),
                        type: 'line',
                        mode: 'lines',
                        marker: {color: 'red'},
                        name: "Error",
                        line: { shape: "spline" }
                    }
                ]}
                layout={{
                    title: {
                        text: "<b>Error</b>",
                    },
                    yaxis: {
                        title: "e(t)",
                        range: [-(current.cpu_target * 1.5), current.cpu_target * 1.5]
                    },
                    xaxis: {
                        title: "t"
                    },
                    width: screenWidth * 0.95,
                    height: screenHeight * 0.7
                }}
            />
        </div>
    );
}
 
export default Stats;