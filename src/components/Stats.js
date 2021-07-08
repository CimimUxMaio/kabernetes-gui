import Plot from "react-plotly.js";

const Stats = ({ xs, clientHistory }) => {
    const current = clientHistory[clientHistory.length -1];
    const statusColor = (current.status === "READY") ? "green" : (current.status === "DEAD") ? "red" : "blue";
    return (
        <div>
            <span style={{ margin: '5%', display: "flex", justifyContent: "center", alignItems: "center"}}>
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
                    title: "<b>Error</b>",
                    width: "80%"
                }}
            />
        </div>
    );
}
 
export default Stats;