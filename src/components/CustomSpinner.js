import { Spinner } from "react-bootstrap";

const CustomSpinner = () => {
    return (
        <div                
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: '30%'
        }}>
            <Spinner variant="primary" animation="border"/>)
        </div>);
}

export default CustomSpinner;