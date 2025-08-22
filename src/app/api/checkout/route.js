import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCES_TOKEN,
  });

  const body = await req.json();

  const items = body.map((product) => ({
    id: product.id,
    title: product.name,
    quantity: product.quantity,
    unit_price: Number(product.price),
    currency_id: "UYU", // o "USD", depende de tu país
  }));

  const preference = {
    items: items,
    back_urls: {
      success: "https://youtube.com",
      failure: "https://youtube.com",
      pending: "https://youtube.com",
    },
    auto_return: "approved",
  };
  try {
    const preferencia = new Preference(client);
    const result = await preferencia.create({ body: preference });
    return NextResponse.json({ preferenceId: result.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear preferencia" },
      { status: 500 }
    );
  }
}
