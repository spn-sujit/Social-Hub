import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-indigo-50 via-purple-100 to-blue-100'>

      <div className='flex flex-col items-center gap-4'>

        <div className='relative w-12 h-12'>
          <div className='absolute inset-0 rounded-full border-[3px] border-indigo-200/40' />
          <div
            className='absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 animate-spin'
            style={{ animationDuration: '0.8s' }}
          />
        </div>

        <div className='flex items-center gap-1'>
          {'Please wait'.split('').map((char, i) => (
            <span
              key={i}
              className='text-indigo-700 text-xs tracking-widest uppercase font-medium'
              style={{
                animation: 'wave 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50%       { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>

    </div>
  )
}

export default Loading