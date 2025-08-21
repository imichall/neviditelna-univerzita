export interface User {
  id: number
  username: string
  password: string
  name: string
  email: string
  role: string
}

export interface DomainData {
  fqdn: string
  nsset: {
    handle: string
    registrar: string
    dns: Array<{
      name: string
      ip_address: string
    }>
  }
  keyset: {
    handle: string
    registrar: string
    dns_keys: string[]
  }
  owner: {
    handle: string
    organization: string
    name: string
    publish: {
      organization: boolean
      name: boolean
    }
  }
  sponsoring_registrar: string
  administrative_contacts: Array<{
    handle: string
    organization: string
    name: string
    publish: {
      organization: boolean
      name: boolean
    }
  }>
  expires_at: string
  events: {
    registered: {
      timestamp: string
      registrar_handle: string
    }
    transferred: {
      timestamp: string
      registrar_handle: string
    }
    updated: {
      timestamp: string
      registrar_handle: string
    }
    unregistered: null
  }
  state_flags: {
    flags: Array<{
      name: string
      active: boolean
      description: string
    }>
    groups: string[][]
  }
}
