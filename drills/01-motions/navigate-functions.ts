// OBJECTIVE: Navigate to each function using motions (not scrolling or arrow keys)
// Use: w, b, e, f, F, /, ?, gg, G, {, }, [[, ]], and Flash (s)
//
// Tasks:
//   1. Jump to `processPayment` using /proc
//   2. From there jump to `validateCard` using ?vali (backward)
//   3. Jump to the closing brace of `processPayment` using ]m or %
//   4. Jump to `sendReceipt` using Flash: s + "se"
//   5. Jump to line 50 using 50G
//   6. Jump to the word "expired" on line 38 using /expired
//   7. Return to where you started using '' or <C-o>
//
// TIMING: Expert 20s | Proficient 40s | Learning 90s

interface PaymentMethod {
  type: "credit" | "debit" | "crypto"
  last4: string
  expiry: string
  token: string
}

interface Transaction {
  id: string
  amount: number
  currency: string
  method: PaymentMethod
  status: "pending" | "completed" | "failed" | "refunded"
  createdAt: Date
}

function validateCard(method: PaymentMethod): boolean {
  const now = new Date()
  const [month, year] = method.expiry.split("/").map(Number)
  const expiryDate = new Date(2000 + year, month - 1)

  if (expiryDate < now) {
    throw new Error("Card expired")
  }

  if (method.last4.length !== 4) {
    throw new Error("Invalid card number")
  }

  return true
}

function processPayment(tx: Transaction): Transaction {
  if (tx.amount <= 0) {
    throw new Error("Amount must be positive")
  }

  if (tx.amount > 10000) {
    throw new Error("Amount exceeds limit")
  }

  validateCard(tx.method)

  return {
    ...tx,
    status: "completed",
    createdAt: new Date(),
  }
}

function refundPayment(tx: Transaction): Transaction {
  if (tx.status !== "completed") {
    throw new Error("Can only refund completed transactions")
  }

  return {
    ...tx,
    status: "refunded",
    amount: -tx.amount,
  }
}

function sendReceipt(tx: Transaction, email: string): void {
  if (tx.status !== "completed" && tx.status !== "refunded") {
    throw new Error("Cannot send receipt for pending transactions")
  }

  const subject = tx.status === "refunded" ? "Refund confirmation" : "Payment receipt"
  const body = `Transaction ${tx.id}: ${tx.currency} ${Math.abs(tx.amount)}`

  console.log(`Sending "${subject}" to ${email}: ${body}`)
}

function generateReport(transactions: Transaction[]): string {
  const completed = transactions.filter((t) => t.status === "completed")
  const total = completed.reduce((sum, t) => sum + t.amount, 0)
  const refunded = transactions.filter((t) => t.status === "refunded")
  const refundTotal = refunded.reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return [
    `Total transactions: ${transactions.length}`,
    `Completed: ${completed.length} (${total})`,
    `Refunded: ${refunded.length} (${refundTotal})`,
    `Net revenue: ${total - refundTotal}`,
  ].join("\n")
}
