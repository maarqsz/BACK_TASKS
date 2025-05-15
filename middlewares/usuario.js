import jwt from 'jsonwebtoken'
const secret = process.env.SECRET_KEY

const auth = (req, res, next) => {
    try {
      console.log('autenticando...');
  
      const authHeader = req.headers.authorization; // pega o header Authorization
      
      if (!authHeader) {
        console.log('Header Authorization não encontrado');
        return res.status(401).send({ mensagem: 'Acesso negado D:' });
      }
  
      // Espera o formato "Bearer <token>"
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.log('Formato do token inválido');
        return res.status(401).send({ mensagem: 'Token inválido' });
      }
  
      const token = parts[1];
  
      // Verifica e decodifica o token
      const contentToken = jwt.verify(token, secret);
      req.id = contentToken.id;
      console.log('token:', contentToken);
      
      next();
  
    } catch (erro) {
      console.log('Erro na autenticação:', erro.message);
      return res.status(401).send({ mensagem: 'Acesso negado' });
    }
  };
export { auth }