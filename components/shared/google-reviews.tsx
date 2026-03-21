import { ArrowRightIcon, CheckCircleIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { company, testimonials } from "@/lib/site-data";

export function GoogleReviews() {
  return (
    <section className="relative overflow-hidden bg-[#F0F7F0] py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/google.png"
                alt="Google"
                width={80}
                height={28}
                className="h-7 w-auto"
              />
              <span className="text-sm font-semibold text-foreground/70">Avis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">Excellent</span>
              <span className="text-2xl font-bold text-primary">5.0</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} size={22} weight="fill" className="text-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Basé sur {company.reviewCount} avis vérifiés
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, idx) => {
            const colors = [
              "bg-primary",
              "bg-secondary",
              "bg-primary-light",
            ];
            const bgColor = colors[idx % colors.length];
            return (
              <Reveal key={testimonial.author} delay={idx * 100}>
                <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${bgColor}`}>
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold">{testimonial.author}</span>
                        <CheckCircleIcon size={16} weight="fill" className="text-blue-500" />
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <StarIcon key={i} size={14} weight="fill" className="text-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-foreground/80">
                    {testimonial.content.length > 180
                      ? `${testimonial.content.slice(0, 180)}...`
                      : testimonial.content}
                  </blockquote>
                  {testimonial.content.length > 180 && (
                    <Link
                      href={company.googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-sm font-semibold text-primary hover:underline"
                    >
                      Lire la suite
                    </Link>
                  )}
                </figure>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 text-center">
            <Link
              href={company.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Voir tous les avis sur Google
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
