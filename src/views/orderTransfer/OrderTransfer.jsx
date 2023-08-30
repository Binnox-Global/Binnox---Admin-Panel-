import React from 'react'
import {
  ApprovedOrdersGroupTransfer,
  ApprovedOrdersTransfer,
  NewOrdersGroupTransfer,
  NewOrdersTransfer,
  RejectedOrdersGroupTransfer,
  RejectedOrdersTransfer,
} from '../orders/Orders'

function OrderTransfer() {
  return (
    <div>
      <NewOrdersTransfer />
      <NewOrdersGroupTransfer />
      <ApprovedOrdersGroupTransfer />
      <RejectedOrdersGroupTransfer />
    </div>
  )
}

export default OrderTransfer
