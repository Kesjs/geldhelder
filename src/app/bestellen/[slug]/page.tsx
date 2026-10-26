import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function BestellenPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/reserveren?pakket=${encodeURIComponent(slug)}`);
}
