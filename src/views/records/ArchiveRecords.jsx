import React from 'react'
import {
  ApprovedOrdersTransfer,
  OrdersDelivered,
  OrdersPickedUp,
  RejectedOrdersTransfer,
} from '../orders/Orders'

function ArchiveRecords() {
  return (
    <div>
      <ApprovedOrdersTransfer />
      <RejectedOrdersTransfer />
      <OrdersDelivered />
    </div>
  )
}

export default ArchiveRecords
