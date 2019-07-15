import React from 'react';

const load = require.context('./', true, /form\..*js$/);

export default function FormLoader({
  version = '1',
  theme,
}) {
  const Form = load('./form.' + version + '.js').default;

  return (
    <div
      style={{
        textAlign: 'center',
        boxShadow: '8px 8px 0px 0px #000000',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form />
    </div>
  );
}
