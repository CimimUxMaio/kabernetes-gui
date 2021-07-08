import { Form, Button } from "react-bootstrap";
import config from "../config.json";
import Axios from "axios";
import { useState } from "react";


const StartClientForm = ({ setLoading }) => {
    const [form, setForm] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const reqConfig = {
            method: "POST",
            data: {...form, constants: { kp: form.kp, kd: form.kd, ki: form.ki }},
            url: `http://${config.backend.host}:${config.backend.port}/client`
        }
        
        setLoading(true);
        Axios.request(reqConfig).then(response => {
          const responseData = response.data;
          console.log("Response: " + responseData);
        }).catch(error => {
          alert(error);
        }).finally(() => { setLoading(false); });

    };

    return (
        <div style={{margin: "5%", marginTop: "1%"}}>
        <h4>No hay un cliente corriendo. Por favor instancie uno.</h4>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label style={{fontWeight: "bold"}}>Imagen a utilizar</Form.Label>
                <Form.Control type="text" onChange={(event) => setForm({...form, image: event.target.value})}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label style={{fontWeight: "bold"}}>Uso de CPU deseado</Form.Label>
                <Form.Control type="text" onChange={(event) => setForm({...form, cpu_target: event.target.value})}/>
                <Form.Text className="text-muted">
                    En %
                </Form.Text>
            </Form.Group> 

            <Form.Group>
                <Form.Label style={{fontWeight: "bold"}}>Constantes</Form.Label>
                <Form.Text>Kp</Form.Text>
                <Form.Control type="text" onChange={(event) => setForm({...form, kp: event.target.value})}/>
                <Form.Text>Kd</Form.Text>
                <Form.Control type="text" onChange={(event) => setForm({...form, kd: event.target.value})}/>
                <Form.Text>Ki</Form.Text>
                <Form.Control type="text" onChange={(event) => setForm({...form, ki: event.target.value})}/>
            </Form.Group>

            <Form.Group style={{textAlign: "center"}}>
                <Button style={{margin: "2%"}} type="submit" variant="primary">
                    Instanciar cliente
                </Button>
            </Form.Group>
        </Form>
    </div>
    );
}
 
export default StartClientForm;