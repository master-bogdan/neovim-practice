// OBJECTIVE: Practice refactoring operations using refactoring.nvim and LSP
// Use: <leader>cr (rename), extract function, extract variable, inline variable
//
// Tasks:
//   1. Extract the validation logic (lines 35-42) into a function `validateOrder`
//      Select the lines → <leader>re (extract function)
//   2. Extract the discount calculation (line 52) into a variable `discountMultiplier`
//      Select the expression → <leader>rv (extract variable)
//   3. Inline the `TAX_RATE` constant back into where it's used
//      Cursor on TAX_RATE → <leader>ri (inline variable)
//   4. Rename `processOrder` to `fulfillOrder` using <leader>cr
//   5. Extract the shipping cost logic (lines 60-66) into `calculateShipping`
//   6. Rename the parameter `o` to `order` using <leader>cr
//
// TIMING: Expert 60s | Proficient 120s | Learning 240s

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  items: OrderItem[]
  customerEmail: string
  shippingAddress: string
  couponCode?: string
}

const TAX_RATE = 0.21

function processOrder(o: Order): { total: number; tax: number; shipping: number } {
  // validation logic — extract this into validateOrder
  if (o.items.length === 0) {
    throw new Error("Order must have at least one item")
  }
  if (!o.customerEmail.includes("@")) {
    throw new Error("Invalid email")
  }
  if (!o.shippingAddress || o.shippingAddress.length < 10) {
    throw new Error("Shipping address too short")
  }

  const subtotal = o.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // discount calculation — extract the multiplier expression into a variable
  const discountedTotal = o.couponCode === "HALF" ? subtotal * 0.5 : subtotal * (1 - 0.1)

  const tax = discountedTotal * TAX_RATE

  // shipping logic — extract this block into calculateShipping
  let shipping = 0
  if (discountedTotal < 50) {
    shipping = 9.99
  } else if (discountedTotal < 100) {
    shipping = 4.99
  } else {
    shipping = 0
  }

  const total = discountedTotal + tax + shipping

  return { total, tax, shipping }
}

function formatReceipt(o: Order): string {
  const result = processOrder(o)
  return [
    `Order: ${o.id}`,
    `Items: ${o.items.length}`,
    `Subtotal: €${result.total.toFixed(2)}`,
    `Tax: €${result.tax.toFixed(2)}`,
    `Shipping: €${result.shipping.toFixed(2)}`,
    `Total: €${(result.total + result.tax + result.shipping).toFixed(2)}`,
  ].join("\n")
}
