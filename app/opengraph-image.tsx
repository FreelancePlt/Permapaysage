import { ImageResponse } from "next/og";

import { company } from "@/lib/site-data";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #214037 0%, #2f5b4f 52%, #f0d39f 100%)",
          color: "#fffaf2",
          fontFamily: "sans-serif",
          padding: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            border: "1px solid rgba(255, 250, 242, 0.18)",
            borderRadius: "28px",
            padding: "40px 44px",
            background: "rgba(255, 250, 242, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "68px",
                  height: "68px",
                  borderRadius: "999px",
                  background: "rgba(255, 250, 242, 0.14)",
                  fontSize: "30px",
                }}
              >
                PP
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.24em",
                    color: "rgba(255, 250, 242, 0.74)",
                  }}
                >
                  Eco-paysagiste
                </div>
                <div style={{ fontSize: "28px", fontWeight: 700 }}>
                  {company.name}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                maxWidth: "760px",
              }}
            >
              <div
                style={{
                  fontSize: "68px",
                  lineHeight: 1.02,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                Jardins durables, sobres et vivants.
              </div>
              <div
                style={{
                  fontSize: "28px",
                  lineHeight: 1.4,
                  color: "rgba(255, 250, 242, 0.84)",
                }}
              >
                Conception, amenagement et entretien de jardins ecologiques a
                Vallet et dans le Vignoble Nantais.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                fontSize: "24px",
                color: "rgba(255, 250, 242, 0.84)",
              }}
            >
              <div>{company.city}</div>
              <div>{company.radius}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
