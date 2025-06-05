// Este archivo contendrá en el futuro las funciones para llamadas a API
// Por ahora, solo tiene funciones mock para simular la integración

/**
 * Mock de función de API para confirmar recepción de llave
 * @param code Código de la transacción
 * @returns Promise con la respuesta simulada
 */
export const confirmKeyDropOff = async (code: string): Promise<{ success: boolean, message: string }> => {
  // Aquí iría una llamada real a una API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Recepción de llave con código ${code} registrada exitosamente`
      });
    }, 1000);
  });
};

/**
 * Mock de función de API para confirmar entrega de llave
 * @param code Código de la transacción
 * @returns Promise con la respuesta simulada
 */
export const confirmKeyPickUp = async (code: string): Promise<{ success: boolean, message: string }> => {
  // Aquí iría una llamada real a una API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Entrega de llave con código ${code} registrada exitosamente`
      });
    }, 1000);
  });
};
