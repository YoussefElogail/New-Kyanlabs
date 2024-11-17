import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function NotFound() {
  const t = useTranslations('Error')

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-red-600">404</h2>
      <p className="text-gray-600">{t('somethingWentWrong')}</p>
      <Link
        href="/"
        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        {t('backToHome')}
      </Link>
    </div>
  )
} 