/**
 * Payment method badges rendered as small white cards with recognizable brand
 * marks. Used in the footer to signal accepted checkout options.
 */

function Badge({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="inline-flex h-7 w-11 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5"
    >
      {children}
    </span>
  );
}

export default function PaymentMethods() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Visa */}
      <Badge label="Visa">
        <svg viewBox="0 0 48 16" className="h-3.5 w-auto" aria-hidden="true">
          <text
            x="0"
            y="13"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="15"
            fontStyle="italic"
            fontWeight="700"
            fill="#1A1F71"
            letterSpacing="0.5"
          >
            VISA
          </text>
        </svg>
      </Badge>

      {/* Mastercard */}
      <Badge label="Mastercard">
        <svg viewBox="0 0 36 22" className="h-4 w-auto" aria-hidden="true">
          <circle cx="14" cy="11" r="9" fill="#EB001B" />
          <circle cx="22" cy="11" r="9" fill="#F79E1B" />
          <path
            d="M18 4.2a9 9 0 0 1 0 13.6 9 9 0 0 1 0-13.6Z"
            fill="#FF5F00"
          />
        </svg>
      </Badge>

      {/* American Express */}
      <Badge label="American Express">
        <svg viewBox="0 0 44 16" className="h-3.5 w-auto" aria-hidden="true">
          <rect width="44" height="16" rx="2" fill="#1F72CD" />
          <text
            x="22"
            y="11.5"
            textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="7.5"
            fontWeight="700"
            fill="#FFFFFF"
            letterSpacing="0.3"
          >
            AMEX
          </text>
        </svg>
      </Badge>

      {/* PayPal */}
      <Badge label="PayPal">
        <svg viewBox="0 0 52 16" className="h-3.5 w-auto" aria-hidden="true">
          <text
            x="0"
            y="13"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="14"
            fontStyle="italic"
            fontWeight="700"
            fill="#003087"
          >
            Pay
          </text>
          <text
            x="25"
            y="13"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="14"
            fontStyle="italic"
            fontWeight="700"
            fill="#009CDE"
          >
            Pal
          </text>
        </svg>
      </Badge>

      {/* Apple Pay */}
      <Badge label="Apple Pay">
        <svg viewBox="0 0 44 18" className="h-4 w-auto" aria-hidden="true">
          <path
            d="M8.04 4.6c-.5.6-1.3 1.05-2.1.98-.1-.8.3-1.66.76-2.2.5-.6 1.36-1.04 2.06-1.06.08.84-.25 1.66-.72 2.28Zm.71 1.13c-1.16-.07-2.15.66-2.7.66-.56 0-1.4-.62-2.32-.6-1.2.01-2.3.69-2.9 1.76-1.24 2.15-.32 5.33.89 7.08.59.86 1.3 1.82 2.22 1.79.88-.04 1.22-.57 2.29-.57 1.06 0 1.37.57 2.3.55.96-.02 1.56-.87 2.15-1.74.68-1 .95-1.96.97-2.01-.02-.01-1.86-.72-1.88-2.84-.02-1.78 1.45-2.63 1.52-2.67-.83-1.23-2.12-1.37-2.58-1.4Z"
            fill="#000000"
          />
          <text
            x="15"
            y="13.5"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="600"
            fill="#000000"
          >
            Pay
          </text>
        </svg>
      </Badge>

      {/* Google Pay */}
      <Badge label="Google Pay">
        <svg viewBox="0 0 52 18" className="h-4 w-auto" aria-hidden="true">
          <text
            x="0"
            y="13.5"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="600"
          >
            <tspan fill="#4285F4">G</tspan>
            <tspan fill="#EA4335">o</tspan>
            <tspan fill="#FBBC04">o</tspan>
            <tspan fill="#4285F4">g</tspan>
            <tspan fill="#34A853">l</tspan>
            <tspan fill="#EA4335">e</tspan>
          </text>
          <text
            x="33"
            y="13.5"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="11"
            fontWeight="600"
            fill="#5F6368"
          >
            Pay
          </text>
        </svg>
      </Badge>
    </div>
  );
}
