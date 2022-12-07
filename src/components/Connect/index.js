import React from 'react'
import { useConnect } from 'wagmi'
import './Connect.css'
export function Connector() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <div className="connector">
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  )
}
