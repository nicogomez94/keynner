// This service handles payment processing for delivered keys
import { KeyTransaction } from '../models/interfaces';

// Define the payment processor interface
export interface PaymentProcessor {
  processPayment(transaction: KeyTransaction): Promise<PaymentResult>;
}

// Define the payment result
export interface PaymentResult {
  success: boolean;
  message: string;
  transactionId?: string;
  amount?: number;
}

// Dummy payment processor implementation
// In a real app, this would integrate with a payment gateway like Stripe or PayPal
class DummyPaymentProcessor implements PaymentProcessor {
  async processPayment(transaction: KeyTransaction): Promise<PaymentResult> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate fee based on transaction duration or flat fee
    const fee = this.calculateFee(transaction);
    
    // Success rate of 95% for simulation
    const isSuccessful = Math.random() > 0.05;
    
    if (isSuccessful) {
      return {
        success: true,
        message: 'Pago procesado correctamente',
        transactionId: `pay_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        amount: fee
      };
    } else {
      return {
        success: false,
        message: 'Error al procesar el pago. Intente nuevamente.'
      };
    }
  }

  private calculateFee(transaction: KeyTransaction): number {
    // Example fee calculation
    // Could be based on time between drop-off and pick-up
    // or a flat fee per transaction
    
    // Default flat fee
    let fee = 5.00;
    
    // If we have both timestamps, calculate based on duration
    if (transaction.receivedAt && transaction.deliveredAt) {
      const start = new Date(transaction.receivedAt).getTime();
      const end = new Date(transaction.deliveredAt).getTime();
      const durationHours = (end - start) / (1000 * 60 * 60);
      
      // $2 base fee + $1.5 per hour
      fee = 2 + (durationHours * 1.5);
      
      // Round to 2 decimal places
      fee = Math.round(fee * 100) / 100;
    }
    
    return fee;
  }
}

// Export a singleton instance of the payment processor
export const paymentProcessor: PaymentProcessor = new DummyPaymentProcessor();
