import { appendFile } from 'fs';
import { join } from 'path';

const logDetails = (req, res, next) => {
  const { method, url } = req;
  const requestBody = JSON.stringify(req.body);
  const start = new Date();

  // Espera hasta que la respuesta haya terminado para obtener la información final
  res.on('finish', () => {
    const { statusCode } = res;
    const end = new Date();
    const logEntry = `${start.toISOString()} - ${method} ${url} - Request Body: ${requestBody} - Status: ${statusCode} - Response Time: ${end - start}ms\n`;

    // Escribir el log en el archivo
    appendFile(join(__dirname, 'log.txt'), logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  });

  next();
};
