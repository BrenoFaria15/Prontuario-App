import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

export default function MostrarSelect() {
  const INITIAL_DATA = {
    value: 0,
    label: 'Selecione o paciente',
  };

  const [selectData, setselectData] = useState(INITIAL_DATA);
  const mapResponseToValuesAndLabels = (data) => ({
    value: data.id_paciente,
    label: data.nome,
  });

  async function callApi(value) {
    const data = await fetch(`http://localhost:8080/api/pacientes/all`)
      .then((response) => response.json())
      .then((response) => response.map(mapResponseToValuesAndLabels))
      .then((final) =>
        final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );

    return data;
  }

  function handleSubmit() {
    console.log(selectData);
    setselectData(INITIAL_DATA);
  }

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={callApi}
        onChange={(data) => {
          setselectData(data);
        }}
        value={selectData}
        defaultOptions
      />

    </div>
  );
}