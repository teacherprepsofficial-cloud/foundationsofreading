import Link from 'next/link'

interface CtaBannerProps {
  heading?: string
  subtext?: string
  buttonText?: string
  buttonHref?: string
}

export function CtaBanner({
  heading = 'Ready to Start Studying?',
  subtext = 'Join thousands of teachers who passed the FORT with our study materials. Get the study guide and practice test in one bundle and save.',
  buttonText = 'Get the Complete Prep Bundle',
  buttonHref = '/bundle',
}: CtaBannerProps) {
  return (
    <section className="bg-maroon-900 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ivory-200">
          {subtext}
        </p>
        <div className="mt-8">
          <Link
            href={buttonHref}
            className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-maroon-900 shadow-sm transition-colors hover:bg-ivory-100"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
