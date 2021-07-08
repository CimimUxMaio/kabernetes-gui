import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import appConfig from "../config.json";
import { useState } from "react";
import StartClientForm from "./StartClientForm";

 
const Configuration = ({ client, setLoading }) => {
    const [newConstants, setNewConstants] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const reqConfig = {
            method: "PATCH",
            data: newConstants,
            url: `http://${appConfig.backend.host}:${appConfig.backend.port}/client`
        }
    
        setLoading(true)
        Axios.request(reqConfig).then(response => {
          const responseData = response.data;
          console.log("Response: " + responseData);
        }).catch(error => {
          alert(error);
        }).finally(() => { setLoading(false) });
    };

    const deleteClient = () => {
        const reqConfig = {
            method: "DELETE",
            url: `http://${appConfig.backend.host}:${appConfig.backend.port}/client`
        }
          
        setLoading(true);
        Axios.request(reqConfig).catch(error => {
          alert(error);
        }).finally(() => { setLoading(false) });
    }

    if (client.status === "DEAD") return <StartClientForm setLoading={setLoading}/>;

    return (
        <div style={{margin: "5%", marginTop: "1%"}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label style={{fontWeight: "bold"}}>Imagen a utilizar</Form.Label>
                    <Form.Control type="text" placeholder={client.image} readOnly/>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label style={{fontWeight: "bold"}}>Uso de CPU deseado</Form.Label>
                    <Form.Control type="text" placeholder={client.cpu_target} readOnly/>
                    <Form.Text className="text-muted">
                        En %
                    </Form.Text>
                </Form.Group> 

                <Form.Group>
                    <Form.Label style={{fontWeight: "bold"}}>Constantes</Form.Label>
                    <Form.Text>Kp</Form.Text>
                    <Form.Control type="text" placeholder={client.constants.kp} onChange={(event) => setNewConstants(old => {return {...old, kp: event.target.value}})}/>
                    <Form.Text>Kd</Form.Text>
                    <Form.Control type="text" placeholder={client.constants.kd} onChange={(event) => setNewConstants(old => {return {...old, kd: event.target.value}})}/>
                    <Form.Text>Ki</Form.Text>
                    <Form.Control type="text" placeholder={client.constants.ki} onChange={(event) => setNewConstants(old => {return {...old, ki: event.target.value}})}/>
                </Form.Group>

                <Form.Group style={{textAlign: "center"}}>
                    <Button style={{margin: "2%"}} type="submit" variant="primary">
                        Actualizar constantes
                    </Button>
                    <Button style={{margin: "2%"}} variant="danger" onClick={deleteClient}>
                        Cerrar cliente
                    </Button>
                </Form.Group>

            </Form>
        </div>
    );
}

export default Configuration;