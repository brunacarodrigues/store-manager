const app = require('./app');
// Iniciando Projeto Store Manager
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});
