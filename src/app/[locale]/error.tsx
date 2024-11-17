'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const t = useTranslations('Error')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[calc(100vh-(94px+327.5px))] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-red-600">
        {t('somethingWentWrong')}
      </h2>
      <p className="text-gray-600">
        {t('somethingWentWrong')}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {t('tryAgain')}
        </button>
        <Link
          href="/"
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  )
}