// Componente para mostrar estadísticas de transacciones
import type { KeyTransaction } from '../features/keyExchange/hooks/useKeyExchange';

interface TransactionStats {
  total: number;
  pending: number;
  received: number;
  delivered: number;
}

interface TransactionStatsProps {
  transactions: KeyTransaction[];
  title?: string;
  showChart?: boolean;
}

export const TransactionStats = ({ transactions, title = 'Estadísticas', showChart = true }: TransactionStatsProps) => {
  // Calcular estadísticas
  const stats: TransactionStats = {
    total: transactions.length,
    pending: transactions.filter(t => t.status === 'pending').length,
    received: transactions.filter(t => t.status === 'received').length,
    delivered: transactions.filter(t => t.status === 'delivered').length,
  };

  // Calcular porcentajes para el gráfico
  const calculatePercentage = (value: number): number => {
    if (stats.total === 0) return 0;
    return Math.round((value / stats.total) * 100);
  };

  const pendingPercentage = calculatePercentage(stats.pending);
  const receivedPercentage = calculatePercentage(stats.received);
  const deliveredPercentage = calculatePercentage(stats.delivered);

  return (
    <div style={{ 
      padding: '15px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      marginBottom: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ marginTop: '0', marginBottom: '15px' }}>{title}</h3>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</div>
          <div>Total</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>{stats.pending}</div>
          <div>Pendientes</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>{stats.received}</div>
          <div>Recibidas</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>{stats.delivered}</div>
          <div>Entregadas</div>
        </div>
      </div>
      
      {showChart && stats.total > 0 && (
        <div style={{ height: '24px', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
          {stats.pending > 0 && (
            <div 
              style={{ 
                width: `${pendingPercentage}%`, 
                backgroundColor: '#ffc107',
                color: pendingPercentage > 10 ? 'black' : 'transparent',
                textAlign: 'center',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {pendingPercentage > 10 ? `${pendingPercentage}%` : ''}
            </div>
          )}
          {stats.received > 0 && (
            <div 
              style={{ 
                width: `${receivedPercentage}%`, 
                backgroundColor: '#007bff',
                color: receivedPercentage > 10 ? 'white' : 'transparent',
                textAlign: 'center',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {receivedPercentage > 10 ? `${receivedPercentage}%` : ''}
            </div>
          )}
          {stats.delivered > 0 && (
            <div 
              style={{ 
                width: `${deliveredPercentage}%`, 
                backgroundColor: '#28a745',
                color: deliveredPercentage > 10 ? 'white' : 'transparent',
                textAlign: 'center',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {deliveredPercentage > 10 ? `${deliveredPercentage}%` : ''}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
