import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ChevronDown, Zap, ShoppingBag, Truck, CreditCard, RotateCcw } from 'lucide-react'
import { processUserMessage, getInitialMessage } from '../services/chatbotService'

const quickActions = [
  { icon: ShoppingBag, label: 'Productos', text: '¿Qué productos tienen?' },
  { icon: Truck, label: 'Envíos', text: '¿Cómo son los envíos?' },
  { icon: CreditCard, label: 'Pagos', text: '¿Qué métodos de pago aceptan?' },
  { icon: RotateCcw, label: 'Devoluciones', text: '¿Cómo hago una devolución?' },
]

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ content: getInitialMessage(), isUser: false, isTyping: true }])
      setTimeout(() => {
        setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, isTyping: false } : m))
      }, 800)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return

    const userMsg = text.trim()
    setInput('')
    setMessages(prev => [...prev, { content: userMsg, isUser: true }])
    setLoading(true)

    const typingMsg = { content: '...', isUser: false, isTyping: true }
    setMessages(prev => [...prev, typingMsg])

    try {
      const response = await processUserMessage(userMsg)
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1 ? { content: response, isUser: false, isTyping: false } : m
      ))
    } catch {
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1
          ? { content: 'Lo siento, tuve un error. Intenta de nuevo.', isUser: false, isTyping: false }
          : m
      ))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 transition-all z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <div className={`fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
        <div className="bg-primary text-white px-5 py-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">TechZone Assistant</h3>
              <p className="text-xs text-white/70">Online • Respondo al instante</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} ${msg.isTyping ? 'opacity-60' : ''}`}>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.isUser
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-white text-gray-800 shadow-sm border rounded-bl-md'
              }`}>
                {msg.isTyping && msg.content === '...' ? (
                  <div className="flex gap-1.5 py-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : msg.isTyping ? (
                  <span className="opacity-70">{msg.content}</span>
                ) : (
                  msg.content.split(/(\*[^*]+\*)/g).map((part, i) =>
                    part.startsWith('*') && part.endsWith('*')
                      ? <strong key={i} className="font-semibold">{part.slice(1, -1)}</strong>
                      : part
                  )
                )}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full text-xs hover:bg-gray-50 hover:border-primary hover:text-primary transition-colors"
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t px-4 py-3 bg-white rounded-b-2xl flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              disabled={loading}
              className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="text-primary disabled:text-gray-300 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-1.5">
            Powered by TechZone AI
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .animate-bounce { animation: bounce 0.6s infinite; }
      `}</style>
    </>
  )
}

export default ChatBot