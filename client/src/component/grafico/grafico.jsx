import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Grafico({ esercizio }) {
  const [numRel, setNumRel] = useState(10);
  const reps = esercizio.getRepSpec(numRel) || [];
  const carico = esercizio.getCaricoSpec(numRel) || [];
  const recupero = esercizio.getTempoRecSpec(numRel) || [];

  // creo dataset unico
  const data = reps.map((_, i) => ({
    serie: i + 1,
    rep: reps[i],
    carico: carico[i],
    recupero: recupero[i],
  }));

  const [metrica, setMetrica] = useState("rep");

  const metricheLabel = {
    rep: "Ripetizioni",
    carico: "Carico",
    recupero: "Tempo di Recupero (s)",
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4 text-white">Andamento esercizio</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",      // permette ai select di andare a capo se lo spazio è poco
          gap: "10px",           // distanza uniforme tra i select
          justifyContent: "center", // o "center" per centrarli
          alignItems: "center",  // allinea verticalmente
        }}
      >
        <select
          value={metrica}
          onChange={(e) => setMetrica(e.target.value)}
          className="select-viola"
          style={{ flex: "1 1 150px", textAlign: "center" }} // occupa almeno 150px e cresce
        >
          <option value="rep">Ripetizioni</option>
          <option value="carico">Carico</option>
          <option value="recupero">Tempo di Recupero</option>
        </select>

        <select
          value={numRel}
          onChange={(e) => setNumRel(e.target.value)}
          className="select-viola"
          style={{ flex: "1 1 150px", textAlign: "center" }} // occupa almeno 150px e cresce
        >
          <option value="10">last 10</option>
          <option value="30">last 30</option>
          <option value="100">last 100</option>
        </select>
      </div>

      {/* Grafico full width, trasparente */}
      <div className="w-full" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, left: -45 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis dataKey="serie" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "none",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey={metrica}
              stroke="#9b30ff" // verde acceso, puoi cambiare
              name={metricheLabel[metrica]}
              strokeWidth={3}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}