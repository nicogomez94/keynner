// API para conectar con el backend de KeyNest

// URL base para las peticiones a la API
const API_BASE_URL = 'http://localhost:3000/api';

// Interfaces para los tipos de respuesta
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Función para autenticar un local verificado
 * @param localId ID del local a autenticar
 * @returns Promise con la respuesta de autenticación
 */
export const loginLocal = async (localId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ localId }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error al autenticar local:', error);
    return {
      success: false,
      message: 'Error de conexión con el servidor'
    };
  }
};

/**
 * Función para confirmar recepción de llave
 * @param code Código de la transacción
 * @param localId ID del local que confirma la recepción
 * @returns Promise con la respuesta de la operación
 */
export const confirmKeyDropOff = async (code: string, localId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/keys/drop-off`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, localId }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error al confirmar recepción de llave:', error);
    return {
      success: false,
      message: 'Error de conexión con el servidor'
    };
  }
};

/**
 * Función para confirmar entrega de llave
 * @param code Código de la transacción
 * @param localId ID del local que confirma la entrega
 * @returns Promise con la respuesta de la operación
 */
export const confirmKeyPickUp = async (code: string, localId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/keys/pick-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, localId }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error al confirmar entrega de llave:', error);
    return {
      success: false,
      message: 'Error de conexión con el servidor'
    };
  }
};

/**
 * Función para obtener todas las transacciones de un local
 * @param localId ID del local
 * @returns Promise con la respuesta que contiene las transacciones
 */
export const getLocalTransactions = async (localId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/keys/local/${localId}`);
    return await response.json();
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    return {
      success: false,
      message: 'Error de conexión con el servidor'
    };
  }
};

/**
 * Función para autenticar un propietario
 * @param ownerId ID del propietario a autenticar
 * @returns Promise con la respuesta de autenticación
 */
export const loginOwner = async (ownerId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/owner/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ownerId }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error al autenticar propietario:', error);
    return {
      success: false,
      message: 'Error de conexión con el servidor'
    };
  }
};

/**
 * Función para generar un código de transacción
 * @param ownerId ID del propietario
 * @param localId ID del local donde se depositará la llave
 * @returns Promise con la respuesta que contiene el código generado
 */
export const generateTransactionCode = async (ownerId: string, localId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/owner/generate-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ownerId, localId }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error al generar código de transacción:', error);
    return {
      success: false,
      message: 'Error de conexión con el servidor'
    };
  }
};

/**
 * Función para obtener todas las transacciones de un propietario
 * @param ownerId ID del propietario
 * @returns Promise con la respuesta que contiene las transacciones
 */
export const getOwnerTransactions = async (ownerId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/owner/${ownerId}/transactions`);
    return await response.json();
  } catch (error) {
    console.error('Error al obtener transacciones del propietario:', error);
    return {
      success: false,
      message: 'Error de conexión con el servidor'
    };
  }
};
