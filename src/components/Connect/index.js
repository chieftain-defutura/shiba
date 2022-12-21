import React from 'react'
import { useConnect } from 'wagmi'

import Button from '../Button'
import './Connect.css'

export function Connector() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <div className="connector">
      {connectors.map((connector) => (
        <Button
          variant="primary"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </Button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  )
}
