import React from 'react'
import { ApprovedOrdersTransfer, NewOrdersTransfer, RejectedOrdersTransfer } from '../orders/Orders'

function OrderTransfer() {
  return (
    <div>
      <NewOrdersTransfer />
      <ApprovedOrdersTransfer />
      <RejectedOrdersTransfer />
    </div>
  )
}

export default OrderTransfer
