import { redirect } from "next/navigation";

export default function PaymentErrorRedirect() {
  redirect("/reserveren");
}
