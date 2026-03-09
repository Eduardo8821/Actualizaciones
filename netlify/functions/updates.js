// netlify/functions/updates.js
exports.handler = async function(event, context) {
  // Configurar CORS para permitir que cualquier cliente acceda
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      console.error('❌ GITHUB_TOKEN no configurado');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Servidor mal configurado' })
      };
    }

    console.log('🔄 Solicitando updates.json desde GitHub...');
    
    const response = await fetch('https://raw.githubusercontent.com/Eduardo8821/Vector-V12/main/updates.json', {
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Vector-V12-Updater'
      }
    });

    if (!response.ok) {
      console.error(`❌ GitHub respondió con ${response.status}`);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Error al obtener actualizaciones' })
      };
    }

    const data = await response.json();
    console.log('✅ updates.json obtenido correctamente');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('❌ Error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};