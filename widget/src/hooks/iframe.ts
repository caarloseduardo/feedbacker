import { setApiKey, setCurrentPage, setFingerprint } from '@/store'

interface IframeControl {
  updateCoreValuesOnStore: () => void;
  notifyOpen: () => void;
  notifyClose: () => void;
}

export default function useIframeControl (): IframeControl {
  function updateCoreValuesOnStore () {
    if (process.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search)
      const apiKey = query.get('api') ?? ''
      const page = query.get('page') ?? ''
      const fingerprint = query.get('fingerprint') ?? ''

      setCurrentPage(page)
      setApiKey(apiKey)
      setFingerprint(fingerprint)

      return
    }

    setCurrentPage('http://playground-url.com')
    setApiKey('api_key_de_teste')
    setFingerprint('123123123')
  }

  function notifyOpen () {
    window.parent.postMessage({
      isWidget: true,
      isOpen: true
    }, '*')
  }

  function notifyClose () {
    window.parent.postMessage({
      isWidget: true,
      isOpen: false
    }, '*')
  }

  return {
    updateCoreValuesOnStore,
    notifyOpen,
    notifyClose
  }
}
