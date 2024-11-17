'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('Error')
  const router = useRouter()

  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  // استخراج رسالة الخطأ بشكل آمن
  const errorMessage = error?.message || t('somethingWentWrong')

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-red-600">
        {t('somethingWentWrong')}
      </h2>
      
      {/* عرض رسالة الخطأ بشكل آمن */}
      <p className="text-gray-600">
        {typeof errorMessage === 'string' ? errorMessage : t('somethingWentWrong')}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {t('tryAgain')}
        </button>
        <button
          onClick={() => router.push('/')}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          {t('backToHome')}
        </button>
      </div>
    </div>
  )
}