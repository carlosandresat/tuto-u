import { getUserNameByEmail } from "@/actions/profile";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Profile Page";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { user: string } }) {
  // Font
  const interSemiBold = fetch(
    new URL("./ChakraPetch-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const userName = params.user;
  const email = userName.replace("-", ".").concat("@yachaytech.edu.ec");
  const name = await fetch(
    new URL(`../profile/${email}`, import.meta.url)
  ).then((res) => res.json());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 72,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            maxWidth: "45%",
            textAlign: "center",
          }}
        >
          {name}
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
