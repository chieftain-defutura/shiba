import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConnect, useAccount } from 'wagmi'
import Button from '../Button'
import './Connect.css'
export function Connector() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { isConnected } = useAccount()

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
