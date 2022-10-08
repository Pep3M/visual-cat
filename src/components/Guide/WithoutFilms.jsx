import React from 'react';
import Typography from '@mui/material/Typography'

const WithoutFilms = ({manager=false, timeout=false}) => {
  return (
    <div style={{padding:20}}>
      <Typography variant="h2" color="primary" style={{
        textAlign: 'center',
        marginTop: 10
      }}>
        No hay filmes que mostrar
      </Typography>

      {timeout ? (
      <Typography variant="h6" color="error" style={{
        textAlign: 'center',
        marginTop: 30
      }}>
        Sin conexion con el servidor
      </Typography>

      ):(
        <></>
      )}

      {manager ? (
      <Typography variant="h6" color="secondary" style={{
        textAlign: 'center',
        marginTop: 30
      }}>
        Agregue categorias y filmes en el <strong>Manager</strong> para mostrarselo aqui a sus clientes.
      </Typography>

      ):(
        <></>
      )}
    </div>
  );
}

export default WithoutFilms;
