const express = require('express');
const bodyParser = require('body-parser');

// Inicia a aplicação Express
const app = express();

// Configura o middleware para processar o corpo das requisições JSON
app.use(bodyParser.json());

// --- Funções de Validação de Cartão ---

/**
 * Valida o formato do número do cartão (dígitos e comprimento).
 * Retorna true se o formato for válido, false caso contrário.
 */
function validateCardFormat(cardNumber) {
  // A regex verifica se a string contém apenas 13 a 19 dígitos
  const regex = /^\d{13,19}$/;
  return regex.test(cardNumber);
}

/**
 * Implementa o algoritmo de Luhn para validar o número do cartão.
 * Retorna true se o número for válido, false caso contrário.
 */
function validateLuhn(cardNumber) {
  let sum = 0;
  let isOdd = false;

  // Itera o número do cartão de trás para frente
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (isOdd) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isOdd = !isOdd;
  }

  return (sum % 10) === 0;
}

// --- Middleware de Validação ---

function validatePaymentData(req, res, next) {
  const { cardNumber, expiryMonth, expiryYear, amount } = req.body;

  // Verifica se todos os campos essenciais foram enviados
  if (!cardNumber || !expiryMonth || !expiryYear || !amount) {
    return res.status(400).json({ status: 'error', message: 'Dados de pagamento incompletos. Verifique se todos os campos estão presentes.' });
  }

  // **Novas validações do número do cartão**
  if (!validateCardFormat(cardNumber)) {
    return res.status(400).json({ status: 'error', message: 'Formato do número do cartão inválido. O número deve ter entre 13 e 19 dígitos.' });
  }
  
  if (!validateLuhn(cardNumber)) {
    return res.status(400).json({ status: 'error', message: 'Número do cartão inválido (Falha no algoritmo de Luhn).' });
  }

  // Valida o ano e mês de expiração
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // getMonth() retorna de 0 a 11

  if (expiryYear < currentYear) {
    return res.status(400).json({ status: 'error', message: 'O ano de expiração não pode ser menor que o ano atual.' });
  }

  if (expiryYear === currentYear && expiryMonth < currentMonth) {
    return res.status(400).json({ status: 'error', message: 'Cartão de crédito expirado.' });
  }
  
  // Se tudo estiver OK, passa para o próximo passo (o handler da rota)
  next();
}

// --- Endpoint da API ---

app.post('/payment', validatePaymentData, (req, res) => {
  const { cardNumber, expiryMonth, expiryYear, amount } = req.body;
  
  console.log('Dados de pagamento recebidos e validados:');
  console.log(`Número do Cartão: **** **** **** ${cardNumber.slice(-4)}`);
  console.log(`Expira em: ${expiryMonth}/${expiryYear}`);
  console.log(`Valor: R$ ${amount}`);

  // Resposta da API
  res.status(200).json({
    status: 'success',
    message: 'Pagamento recebido e processado com sucesso.',
    transactionId: 'TRX' + Date.now()
  });
});

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Aguardando requisições POST para /payment...');
});